#!/usr/bin/env node
/**
 * Direction 03 — The Reference Poster: exporter.
 *
 *   node export.mjs                 # both PNGs + the GIF + frame checks
 *   node export.mjs --only poster
 *   node export.mjs --only gif --fps 11 --clip 4.0 --colors 96
 *
 * Reuses the kit's Chrome discovery (content-studio/viz/kit/export/lib/browser.mjs)
 * and requires gifenc / pngjs out of the kit's own node_modules. Nothing in the
 * kit is written to or modified; every output lands in this folder.
 */
import { writeFileSync, statSync, readdirSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const HERE = dirname(fileURLToPath(import.meta.url));
const KIT = resolve(HERE, '../../kit');

const { launch, openViz, vizUrl, now, ms } = await import(
  join(KIT, 'export/lib/browser.mjs')
);
const kitRequire = createRequire(join(KIT, 'package.json'));
const { PNG } = kitRequire('pngjs');
const gifenc = kitRequire('gifenc');
const { GIFEncoder, quantize, applyPalette } = gifenc;

const argv = process.argv.slice(2);
const arg = (k, d) => { const i = argv.indexOf(`--${k}`); return i >= 0 ? argv[i + 1] : d; };
const only = arg('only', 'all');

const TEMPLATE = join(HERE, 'index.html');

/* ------------------------------------------------------------ frame checks
   Runs in the page. Catches the two failure modes that actually happen with a
   dense grid: a box whose content is taller/wider than the box (clipped text),
   and two text boxes whose rectangles intersect (overlap). Also reports the
   smallest rendered text so phone legibility is a number, not a vibe. */
const CHECK = () => {
  const stage = document.getElementById('stage');
  const scale = stage.getBoundingClientRect().width / stage.offsetWidth;
  const out = { clipped: [], overlapping: [], outside: [], minText: null, scale };

  const label = el => {
    const cls = el.className && el.className.baseVal === undefined ? el.className : '';
    const cell = el.closest('.cell');
    const n = cell ? cell.querySelector('.num')?.textContent : '';
    return `${n ? 'cell ' + n + ' ' : ''}.${String(cls).split(' ')[0] || el.tagName.toLowerCase()}`;
  };

  // 1. content taller / wider than its own box
  document.querySelectorAll('.cell, .cbig, .ctitle, .clines, .csrc, .rail, .rail span, .gapstrip, .sources, .headline, .counter, .subline, .legend, .chip')
    .forEach(el => {
      const dy = el.scrollHeight - el.clientHeight;
      const dx = el.scrollWidth - el.clientWidth;
      if (dy > 1 || dx > 1) out.clipped.push({ el: label(el), overflowY: dy, overflowX: dx, text: el.textContent.trim().slice(0, 56) });
    });

  // 1b. a cell's children crossing the line overflow:hidden actually clips at
  //     (the inner edge of the border, not the padding box)
  document.querySelectorAll('.cell').forEach(cell => {
    const box = cell.getBoundingClientRect();
    const cs = getComputedStyle(cell);
    const edgeB = box.bottom - parseFloat(cs.borderBottomWidth);
    const edgeR = box.right - parseFloat(cs.borderRightWidth);
    [...cell.children].forEach(ch => {
      const r = ch.getBoundingClientRect();
      if (r.bottom > edgeB + 0.5 || r.right > edgeR + 0.5) {
        out.clipped.push({ el: label(ch), spill: +Math.max(r.bottom - edgeB, r.right - edgeR).toFixed(1), text: ch.textContent.trim().slice(0, 56) });
      }
    });
  });

  // 2. overlapping text rectangles inside the grid
  const boxes = [...document.querySelectorAll('.cbig, .ctitle, .clines, .csrc, .num, .rail span, .chip, .counter, .headline')]
    .map(el => ({ el, r: el.getBoundingClientRect(), n: label(el) }))
    .filter(b => b.r.width > 0 && b.r.height > 0);
  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i].r, b = boxes[j].r;
      const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left);
      const oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
      if (ox > 2 && oy > 2) out.overlapping.push({ a: boxes[i].n, b: boxes[j].n, ox: +ox.toFixed(1), oy: +oy.toFixed(1) });
    }
  }

  // 3. anything escaping the stage
  const sr = stage.getBoundingClientRect();
  document.querySelectorAll('.cell, .rail, .gapstrip, .sources, .titlebar').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.left < sr.left - 1 || r.top < sr.top - 1 || r.right > sr.right + 1 || r.bottom > sr.bottom + 1) {
      out.outside.push({ el: label(el), r: [r.left - sr.left, r.top - sr.top, r.right - sr.right, r.bottom - sr.bottom].map(v => +v.toFixed(1)) });
    }
  });

  // 4. smallest rendered text, in exported pixels
  let min = Infinity, minEl = '';
  document.querySelectorAll('.cbig, .ctitle, .clines, .csrc, .num, .chip, .sources, .gapstrip, .gapstrip b, .subline, .eyebrow, .rail span, .legend .lab')
    .forEach(el => {
      if (!el.textContent.trim()) return;
      const px = parseFloat(getComputedStyle(el).fontSize) * scale;
      if (px < min) { min = px; minEl = label(el); }
    });
  out.minText = { px: +min.toFixed(2), el: minEl };
  return out;
};

function reportCheck(tag, c, { fatal = true } = {}) {
  const bad = c.clipped.length + c.overlapping.length + c.outside.length;
  console.log(`  check ${tag}: ${bad ? '' : 'clean · '}smallest text ${c.minText.px}px (${c.minText.el})`);
  for (const x of c.clipped) console.log(`    CLIPPED   ${x.el}  ${JSON.stringify(x)}`);
  for (const x of c.overlapping) console.log(`    OVERLAP   ${x.a} × ${x.b}  ${x.ox}×${x.oy}px`);
  for (const x of c.outside) console.log(`    OUTSIDE   ${x.el}  ${JSON.stringify(x.r)}`);
  if (bad && fatal) throw new Error(`${tag}: ${bad} frame problem(s) — fix the layout before writing exports`);
  return bad;
}

/* -------------------------------------------------------------- the stills */
async function posters(browser) {
  const SIZES = [
    { w: 1080, h: 1350, key: '1080x1350' },
    { w: 1080, h: 1080, key: '1080x1080' },
  ];
  for (const { w, h, key } of SIZES) {
    const t = now();
    const { page, errors, external } = await openViz(
      browser, vizUrl(TEMPLATE, { size: key, static: 1 }), { width: w, height: h, deviceScaleFactor: 1 },
    );
    if (errors.length) throw new Error(`page errors at ${key}: ${errors.join(' | ')}`);
    if (external.length) throw new Error(`artifact reached the network at ${key}: ${external.slice(0, 3).join(', ')}`);
    reportCheck(`poster ${key}`, await page.evaluate(CHECK));
    const file = join(HERE, `poster-${key}.png`);
    await page.screenshot({ path: file, clip: { x: 0, y: 0, width: w, height: h }, captureBeyondViewport: false });
    await page.close();
    console.log(`  ${(statSync(file).size / 1024).toFixed(0)} KB  ${file}  (${ms(t)})`);
  }
}

/* ----------------------------------------------------------------- the gif */
async function gif(browser) {
  const w = Number(arg('gw', 640));
  const h = Number(arg('gh', 800));
  const fps = Number(arg('fps', 11));
  const clip = Number(arg('clip', 4.0));
  const hold = Number(arg('hold', 700));
  const colors = Number(arg('colors', 112));
  const frames = Math.max(2, Math.round(clip * fps));
  const delay = Math.round(1000 / fps);

  const t0 = now();
  const shots = [];
  const { page, errors, external } = await openViz(
    browser, vizUrl(TEMPLATE, { size: '1080x1350', static: 1, gif: 1 }), { width: w, height: h, deviceScaleFactor: 1 },
  );
  if (errors.length) throw new Error(`page errors in gif mode: ${errors.join(' | ')}`);
  if (external.length) throw new Error(`artifact reached the network in gif mode: ${external.slice(0, 3).join(', ')}`);
  await page.evaluate(() => window.VIZ.seek(window.VIZ.duration));
  reportCheck(`gif ${w}x${h} settled`, await page.evaluate(CHECK), { fatal: false });

  for (let i = 0; i < frames; i++) {
    // the clip runs past the last cell, so the loop lands on the settled poster
    const t = (i / (frames - 1)) * clip;
    await page.evaluate(s => window.VIZ.seek(s), t);
    shots.push(await page.screenshot({ clip: { x: 0, y: 0, width: w, height: h }, captureBeyondViewport: false }));
  }
  await page.close();
  console.log(`  captured ${frames} frames at ${w}×${h} in ${ms(t0)}`);

  const tE = now();
  const rgba = shots.map(b => new Uint8Array(PNG.sync.read(b).data));
  const px = w * h;
  const sampleIdx = [0, Math.floor(frames * 0.4), Math.floor(frames * 0.7), frames - 1];
  const sample = new Uint8Array(sampleIdx.length * px * 4);
  sampleIdx.forEach((f, i) => sample.set(rgba[f], i * px * 4));
  const palette = quantize(sample, Math.min(255, colors), { format: 'rgb565' });
  const transparentIndex = palette.length;
  const tablePalette = [...palette, [0, 0, 0]];
  const indexed = rgba.map(f => applyPalette(f, palette, 'rgb565'));

  const enc = GIFEncoder();
  for (let i = 0; i < indexed.length; i++) {
    const cur = indexed[i];
    const isLast = i === indexed.length - 1;
    const opts = { delay: isLast ? delay + hold : delay, repeat: 0 };
    if (i === 0) { enc.writeFrame(cur, w, h, { ...opts, palette: tablePalette }); continue; }
    const prev = indexed[i - 1];
    const out = new Uint8Array(px);
    for (let p = 0; p < px; p++) out[p] = cur[p] === prev[p] ? transparentIndex : cur[p];
    enc.writeFrame(out, w, h, { ...opts, transparent: true, transparentIndex, dispose: 1 });
  }
  enc.finish();

  const file = join(HERE, `anim-${w}x${h}.gif`);
  writeFileSync(file, enc.bytes());
  const kb = statSync(file).size / 1024;
  console.log(`  encoded in ${ms(tE)}`);
  console.log(`  ${kb.toFixed(0)} KB  ${file}  · ${frames} frames · ${fps} fps · ${clip}s + ${hold}ms hold · ${palette.length} colours`);
  if (kb > 3072) console.warn('  WARNING: over 3 MB — lower --colors, --fps or --clip.');
}

/* -------------------------------------------------------------------- main */
const t0 = now();
const browser = await launch();
try {
  if (only === 'all' || only === 'poster') await posters(browser);
  if (only === 'all' || only === 'gif') await gif(browser);
} finally {
  await browser.close();
}
console.log(`done in ${ms(t0)}`);
console.log('  ' + readdirSync(HERE).filter(f => /\.(png|gif)$/.test(f)).sort().join('\n  '));
