#!/usr/bin/env node
/**
 * WCAG 2.1 contrast checker for the kit's palettes.
 *
 *   node export/contrast.mjs                  # check every palette declared in template.html
 *   node export/contrast.mjs '#EAF2FA' '#0A1A30'   # check one pair
 *
 * Reads the palettes straight out of template.html's inline JSON so the spec,
 * the template and this report can never drift apart.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const flag = (k, d) => { const i = argv.indexOf(`--${k}`); return i >= 0 ? argv[i + 1] : d; };
// --template lets run-all.mjs check the palettes in the author's copy, not the kit's original.
const templatePath = flag('template')
  ? resolve(process.cwd(), flag('template'))
  : resolve(here, '..', 'template.html');

const srgb = hex => {
  const h = hex.replace('#', '');
  const n = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  return [0, 2, 4].map(i => parseInt(n.slice(i, i + 2), 16) / 255);
};
const lum = hex => {
  const [r, g, b] = srgb(hex).map(c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
export const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};
const grade = r => (r >= 7 ? 'AAA text' : r >= 4.5 ? 'AA text' : r >= 3 ? 'AA large / UI only' : 'FAIL');

const pair = argv.filter(a => a.startsWith('#'));
if (pair.length === 2) {
  const r = ratio(pair[0], pair[1]);
  console.log(`${pair[0]} on ${pair[1]} → ${r.toFixed(2)}:1 (${grade(r)})`);
  process.exit(r >= 4.5 ? 0 : 1);
}

const html = readFileSync(templatePath, 'utf8');
const block = html.match(/<script type="application\/json" id="viz-palettes">([\s\S]*?)<\/script>/);
if (!block) { console.error(`No #viz-palettes JSON block found in ${templatePath}`); process.exit(2); }
const palettes = JSON.parse(block[1]);

let failures = 0;
const rows = [];
for (const p of palettes) {
  const checks = [
    ['text on ground', p.text, p.ground, 4.5],
    ['text on panel', p.text, p.panel, 4.5],
    ['muted on ground', p.muted, p.ground, 4.5],
    ['muted on panel', p.muted, p.panel, 4.5],
    ['panel edge on ground', p.line, p.ground, 1.2, 'ui'],
    ...p.accents.map((a, i) => [`accent ${i + 1} ${a} on panel`, a, p.panel, 4.5]),
    ...p.accents.map((a, i) => [`accent ${i + 1} ${a} on ground`, a, p.ground, 4.5]),
    ['ground vs site navy #0f2440 (separation from the page shell)', p.ground, '#0f2440', 1, 'info'],
    ['ground vs site paper #ffffff (artifact reads as an object on the page)', p.ground, '#ffffff', 4.5, 'info'],
  ];
  console.log(`\n${p.id} — ${p.name}`);
  for (const [label, fg, bg, min, kind = 'text'] of checks) {
    const r = ratio(fg, bg);
    const ok = r >= min;
    if (!ok) failures++;
    rows.push({ palette: p.id, check: label, kind, ratio: Number(r.toFixed(2)), min, pass: ok });
    const note = kind === 'text' ? ` — ${grade(r)}` : kind === 'ui' ? ' — non-text UI boundary' : ' — informational';
    console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${String(r.toFixed(2)).padStart(6)}:1  (min ${min})  ${label}${note}`);
  }
}
console.log(`\n${rows.length - failures}/${rows.length} contrast checks passed`);
if (argv.includes('--json')) console.log(JSON.stringify(rows, null, 2));
process.exitCode = failures ? 1 : 0;
