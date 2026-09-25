#!/usr/bin/env node
/**
 * Exporter + readability audit for the rank-new-site-saturated-market hero.
 *
 *   node export.mjs            # audit all sizes, then write the four PNGs
 *   node export.mjs --verify   # audit only, write nothing
 *
 * Reuses the kit's Chrome discovery (../../kit/export/lib/browser.mjs, read only).
 * Every PNG lands in this folder. The audit fails the run (exit 1) before anything
 * is written if any size has: text under 14 px normalised to 1080 wide, two text
 * runs (or a text run and an icon) overlapping, text leaving its container, clipped
 * content, anything outside the stage, or text contrast under 4.5:1.
 */
import { statSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const KIT = resolve(HERE, '../../kit');
const { launch, openViz, vizUrl } = await import(join(KIT, 'export/lib/browser.mjs'));
const VERIFY_ONLY = process.argv.includes('--verify');
const TEMPLATE = join(HERE, 'index.html');
const BASE = 'surf-school-surface-coverage-gap';

const JOBS = [
  { size: '1200x630',  w: 1200, h: 630,  dsf: 1, file: `${BASE}.png` },
  { size: '1080x1350', w: 1080, h: 1350, dsf: 1, file: `${BASE}-1080x1350.png` },
  { size: '1080x1080', w: 1080, h: 1080, dsf: 1, file: `${BASE}-1080x1080.png` },
  { size: '1080x1350', w: 1080, h: 1350, dsf: 2, file: `${BASE}-2160x2700.png` },
];

/* ------------------------------------------------------------------ audit (runs in the page) */
const AUDIT = () => {
  const stage = document.getElementById('stage');
  const W = stage.offsetWidth;
  const sr = stage.getBoundingClientRect();
  const scale = sr.width / W;
  const norm = 1080 / W;
  const out = { runs: 0, under: [], overlaps: [], outside: [], escaped: [], clipped: [], lowContrast: [], minPx: Infinity, minEl: '' };

  const label = el => {
    const cell = el.closest('.cell');
    const num = cell ? cell.querySelector('.num')?.textContent : '';
    const cls = typeof el.className === 'string' ? el.className.split(' ')[0] : el.tagName.toLowerCase();
    return `${num ? 'cell ' + num + ' ' : ''}.${cls || el.tagName.toLowerCase()}`;
  };
  const CONTAINERS = '.chip, .num, .cell, .rail, .colhead, .strip b, .strip, .sources, .key, .titlebar, .legend';
  const inner = el => {
    const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
    return { l: r.left + parseFloat(cs.borderLeftWidth), t: r.top + parseFloat(cs.borderTopWidth),
             r: r.right - parseFloat(cs.borderRightWidth), b: r.bottom - parseFloat(cs.borderBottomWidth) };
  };

  // colour helpers
  const parse = c => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(',').map(Number); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
  const lum = ({ r, g, b }) => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const bgOf = el => { for (let e = el; e; e = e.parentElement) { const c = parse(getComputedStyle(e).backgroundColor); if (c && c.a > 0.99) return c; } return { r: 255, g: 243, b: 222 }; };

  // collect text runs (one per line box) and icon boxes
  const runs = [];
  const walker = document.createTreeWalker(stage, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (!node.textContent.trim()) continue;
    const el = node.parentElement;
    const cs = getComputedStyle(el);
    const px = parseFloat(cs.fontSize) * scale * norm;
    if (px < out.minPx) { out.minPx = px; out.minEl = label(el); }
    if (px < 14 - 1e-6) out.under.push({ el: label(el), px: +px.toFixed(2), text: node.textContent.trim().slice(0, 40) });
    const fg = parse(cs.color); const bg = bgOf(el);
    if (fg) {
      const L1 = lum(fg), L2 = lum(bg); const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
      if (ratio < 4.5) out.lowContrast.push({ el: label(el), ratio: +ratio.toFixed(2), text: node.textContent.trim().slice(0, 30) });
    }
    const range = document.createRange(); range.selectNodeContents(node);
    for (const r of range.getClientRects()) {
      if (r.width < 0.5 || r.height < 0.5) continue;
      runs.push({ kind: 'text', node, el, r, n: label(el), text: node.textContent.trim().slice(0, 32) });
    }
  }
  document.querySelectorAll('#stage svg').forEach(s => { const r = s.getBoundingClientRect(); if (r.width > 0 && r.height > 0) runs.push({ kind: 'icon', node: s, el: s, r, n: label(s.parentElement) + ' icon' }); });
  out.runs = runs.filter(x => x.kind === 'text').length;

  // overlaps: text vs text (different nodes) and text vs icon
  for (let i = 0; i < runs.length; i++) for (let j = i + 1; j < runs.length; j++) {
    const a = runs[i], b = runs[j];
    if (a.node === b.node || (a.kind === 'icon' && b.kind === 'icon')) continue;
    const ox = Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left);
    const oy = Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top);
    if (ox > 1 && oy > 1) out.overlaps.push({ a: `${a.n} "${a.text || ''}"`, b: `${b.n} "${b.text || ''}"`, ox: +ox.toFixed(1), oy: +oy.toFixed(1) });
  }
  // containment: each text run and icon inside its nearest container's inner box; everything inside the stage
  for (const x of runs) {
    const box = x.el.closest(CONTAINERS);
    if (box) {
      const b = inner(box);
      const d = Math.max(b.l - x.r.left, b.t - x.r.top, x.r.right - b.r, x.r.bottom - b.b);
      if (d > 0.5) out.escaped.push({ el: x.n, box: label(box), by: +d.toFixed(1), text: x.text || '' });
    }
    if (x.r.left < sr.left - 0.5 || x.r.top < sr.top - 0.5 || x.r.right > sr.right + 0.5 || x.r.bottom > sr.bottom + 0.5)
      out.outside.push({ el: x.n, text: x.text || '' });
  }
  // clipping: any element whose content overflows its own box
  stage.querySelectorAll('*').forEach(el => {
    if (el instanceof SVGElement) return;
    const dy = el.scrollHeight - el.clientHeight, dx = el.scrollWidth - el.clientWidth;
    if ((dy > 1 || dx > 1) && el.clientHeight > 0) out.clipped.push({ el: label(el), dx, dy, text: el.textContent.trim().slice(0, 40) });
  });
  document.querySelectorAll('.cell, .rail, .colhead, .strip, .sources, .titlebar, .legend').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.left < sr.left - 0.5 || r.top < sr.top - 0.5 || r.right > sr.right + 0.5 || r.bottom > sr.bottom + 0.5)
      out.outside.push({ el: label(el), text: '(container)' });
  });
  out.minPx = +out.minPx.toFixed(2);
  return out;
};

function report(tag, a) {
  const bad = a.under.length + a.overlaps.length + a.outside.length + a.escaped.length + a.clipped.length + a.lowContrast.length;
  console.log(`verify ${tag}: ${a.runs} text runs, ${a.under.length} under 14px (smallest ${a.minPx}px normalised, ${a.minEl}), ` +
    `${a.overlaps.length} overlaps, ${a.escaped.length} outside their box, ${a.outside.length} outside the stage, ` +
    `${a.clipped.length} clipped, ${a.lowContrast.length} under 4.5:1`);
  for (const x of a.under) console.log('   UNDER    ', JSON.stringify(x));
  for (const x of a.overlaps) console.log('   OVERLAP  ', JSON.stringify(x));
  for (const x of a.escaped) console.log('   ESCAPED  ', JSON.stringify(x));
  for (const x of a.outside) console.log('   OUTSIDE  ', JSON.stringify(x));
  for (const x of a.clipped) console.log('   CLIPPED  ', JSON.stringify(x));
  for (const x of a.lowContrast) console.log('   CONTRAST ', JSON.stringify(x));
  return bad;
}

const pngSize = f => { const b = readFileSync(f); return [b.readUInt32BE(16), b.readUInt32BE(20)]; };

const browser = await launch();
let failures = 0;
try {
  // pass 1: audit every size before writing anything
  for (const size of ['1200x630', '1080x1350', '1080x1080']) {
    const [w, h] = size.split('x').map(Number);
    const { page, errors, external } = await openViz(browser, vizUrl(TEMPLATE, { size }), { width: w, height: h, deviceScaleFactor: 1 });
    if (errors.length) throw new Error(`page errors at ${size}: ${errors.join(' | ')}`);
    if (external.length) throw new Error(`artifact reached the network at ${size}: ${external.slice(0, 3).join(', ')}`);
    failures += report(size, await page.evaluate(AUDIT));
    await page.close();
  }
  if (failures) { console.error(`\n${failures} readability problem(s); nothing written.`); process.exitCode = 1; }
  else if (!VERIFY_ONLY) {
    for (const j of JOBS) {
      const { page } = await openViz(browser, vizUrl(TEMPLATE, { size: j.size }), { width: j.w, height: j.h, deviceScaleFactor: j.dsf });
      const file = join(HERE, j.file);
      await page.screenshot({ path: file, clip: { x: 0, y: 0, width: j.w, height: j.h }, captureBeyondViewport: false });
      await page.close();
      const [pw, ph] = pngSize(file);
      console.log(`wrote ${j.file}  ${pw}x${ph}  ${(statSync(file).size / 1024).toFixed(0)} KB`);
    }
  }
} finally {
  await browser.close();
}
