#!/usr/bin/env node
/**
 * Static exports for LinkedIn and print: PNG posters + a PDF.
 *
 *   node export/poster.mjs
 *   node export/poster.mjs --template ../<slug>/index.html --vertical b2b --palette aurora
 *
 * --out defaults to <artifact folder>/exports and --name to the artifact's
 * folder when the file is index.html, so nothing is ever called index-*.png.
 *
 * Produces (into --out):
 *   <name>-poster-1200x1500.png   LinkedIn portrait (4:5), the highest-reach still
 *   <name>-poster-1080x1080.png   LinkedIn square (1:1)
 *   <name>-poster.pdf             1200×1500 pt single page, for LinkedIn document posts
 *   stills.json                   the frame-integrity assertions for each still
 *
 * Every still is checked before it is written: nothing may sit outside the frame,
 * every source row must be fully visible, and no two source labels may overlap.
 * A failing still aborts the run and names the offending element.
 *
 * The page is loaded with ?poster=1, which freezes the clock at the settled
 * state, hides the controls, and lays the artifact out to fill the viewport
 * exactly — so the PNG is pixel-exact at the requested size with no cropping.
 */
import { mkdirSync, writeFileSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { launch, openViz, vizUrl, now, ms, defaultOutDir, artifactName } from './lib/browser.mjs';
import { inspectStill, reportStill, recordStills } from './lib/still-check.mjs';

const argv = process.argv.slice(2);
const arg = (k, d) => { const i = argv.indexOf(`--${k}`); return i >= 0 ? argv[i + 1] : d; };

const template = resolve(process.cwd(), arg('template', 'template.html'));
const outDir = arg('out') ? resolve(process.cwd(), arg('out')) : defaultOutDir(template);
const name = arg('name', artifactName(template));
const scale = Number(arg('scale', 1));
// Default: abort before writing a broken still. --report-only writes every still and
// exits non-zero, so an author sees the full list of what does not fit in one run.
const reportOnly = argv.includes('--report-only');
const params = {
  poster: 1, static: 1,
  vertical: arg('vertical'), intent: arg('intent'),
  palette: arg('palette'), seed: arg('seed'),
};

const SIZES = [
  { w: 1200, h: 1500, tag: '1200x1500' },
  { w: 1080, h: 1080, tag: '1080x1080' },
];

mkdirSync(outDir, { recursive: true });
const t0 = now();
const browser = await launch();
const written = [];
const stills = [];

try {
  for (const { w, h, tag } of SIZES) {
    const t = now();
    const { page, errors, external } = await openViz(browser, vizUrl(template, params), {
      width: w, height: h, deviceScaleFactor: scale,
    });
    if (errors.length) throw new Error(`Page errors at ${tag}: ${errors.join(' | ')}`);
    if (external.length) throw new Error(`Artifact reached the network at ${tag}: ${external.slice(0, 3).join(', ')}`);
    // Frame integrity: the still is clipped by overflow:hidden, so nothing else catches
    // a poster that dropped half its sources. Fails the run before a PNG is written.
    stills.push(reportStill(await inspectStill(page, { label: `poster ${tag}`, width: w, height: h }), { throwOnFail: !reportOnly }));
    const file = join(outDir, `${name}-poster-${tag}.png`);
    await page.screenshot({ path: file, clip: { x: 0, y: 0, width: w, height: h }, captureBeyondViewport: false });
    await page.close();
    written.push([file, ms(t)]);
  }

  // PDF — screen media so the poster layout (not the print stylesheet) is used.
  {
    const t = now();
    const { page, errors } = await openViz(browser, vizUrl(template, params), { width: 1200, height: 1500 });
    if (errors.length) throw new Error(`Page errors for PDF: ${errors.join(' | ')}`);
    stills.push(reportStill(await inspectStill(page, { label: 'pdf 1200x1500', width: 1200, height: 1500 }), { throwOnFail: !reportOnly }));
    await page.emulateMediaType('screen');
    const pdf = await page.pdf({
      width: '1200px', height: '1500px', printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 }, pageRanges: '1',
    });
    const file = join(outDir, `${name}-poster.pdf`);
    writeFileSync(file, pdf);
    await page.close();
    written.push([file, ms(t)]);
  }
} finally {
  await browser.close();
  if (stills.length) recordStills(outDir, stills);
}

for (const [file, took] of written) {
  console.log(`  ${(statSync(file).size / 1024).toFixed(0).padStart(6)} KB  ${took.padStart(8)}  ${file}`);
}
const bad = stills.filter(s => s.failures.length);
for (const s of bad) console.error(`  FAILED still "${s.label}" (${s.width}×${s.height}, --fit ${s.fit}): ${s.failures.map(f => f.check).join('; ')}`);
console.log(`poster: ${written.length} files, ${stills.length - bad.length}/${stills.length} stills fit their frame, in ${ms(t0)}`);
if (bad.length) process.exitCode = 1;
