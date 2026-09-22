#!/usr/bin/env node
/**
 * The whole publishing pipeline for one living artifact.
 *
 *   node export/run-all.mjs
 *   node export/run-all.mjs --template ../<slug>/index.html
 *   node export/run-all.mjs --template ../<slug>/index.html --vertical b2b --intent commercial
 *
 * --out defaults to <artifact folder>/exports and --name to the artifact's
 * folder name when the file is index.html, so exports are never index-*.png
 * and never overwrite the kit's own exports/.
 *
 * Order matters: contrast → verify → poster → gif. If contrast or verify fails
 * the run stops, because there is no point exporting an artifact that fails its
 * own accessibility checks; poster and gif additionally abort on a still whose
 * sources or honesty note fall outside the frame. Writes exports/manifest.json
 * with real timings, the measured --fit per still, and every still assertion.
 */
import { spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync, readdirSync, readFileSync, statSync, existsSync, rmSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { defaultOutDir, artifactName } from './lib/browser.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const arg = (k, d) => { const i = argv.indexOf(`--${k}`); return i >= 0 ? argv[i + 1] : d; };
const template = resolve(process.cwd(), arg('template', 'template.html'));
// Exports land beside the artifact, named after it. Without this every artifact
// stored as <slug>/index.html would export index-poster-1200x1500.png.
const outDir = arg('out') ? resolve(process.cwd(), arg('out')) : defaultOutDir(template);
const name = arg('name', artifactName(template));
const pass = [
  '--template', template, '--name', name,
  ...['vertical', 'intent', 'palette', 'seed'].flatMap(k => (arg(k) ? [`--${k}`, arg(k)] : [])),
];

mkdirSync(outDir, { recursive: true });
const steps = [];

const run = (label, script, extra = [], { fatal = true } = {}) => {
  const started = Date.now();
  console.log(`\n── ${label} ──────────────────────────────────`);
  const r = spawnSync(process.execPath, [join(here, script), ...pass, ...extra], { stdio: 'inherit' });
  const took = Date.now() - started;
  steps.push({ label, script, args: [...pass, ...extra], ms: took, status: r.status });
  console.log(`   ${label}: ${(took / 1000).toFixed(1)}s (exit ${r.status})`);
  if (fatal && r.status !== 0) { writeManifest(); process.exit(r.status || 1); }
  return r.status;
};

function writeManifest() {
  // Fold the per-still frame-integrity assertions (written by poster.mjs / gif.mjs)
  // into one record, so the manifest shows the measured --fit and every assertion.
  const sidecar = join(outDir, 'stills.json');
  let stills = {};
  if (existsSync(sidecar)) {
    try { stills = JSON.parse(readFileSync(sidecar, 'utf8')); } catch { stills = {}; }
    rmSync(sidecar, { force: true });
  }
  const files = readdirSync(outDir, { withFileTypes: true })
    .filter(d => d.isFile() && d.name !== 'manifest.json')
    .map(d => ({ file: d.name, bytes: statSync(join(outDir, d.name)).size }))
    .sort((a, b) => a.file.localeCompare(b.file));
  const stillFailures = Object.entries(stills)
    .flatMap(([label, s]) => (s.failures || []).map(f => ({ still: label, ...f })));
  writeFileSync(join(outDir, 'manifest.json'),
    `${JSON.stringify({
      generated: new Date().toISOString(), node: process.version, template, name,
      steps, stills, stillFailures, files,
    }, null, 2)}\n`);
}

run('contrast', 'contrast.mjs');
run('verify', 'verify.mjs', ['--out', join(outDir, 'verify')]);
run('poster', 'poster.mjs', ['--out', outDir]);
run('gif', 'gif.mjs', ['--out', outDir]);

writeManifest();
console.log(`\nAll steps passed. Manifest: ${join(outDir, 'manifest.json')}`);
