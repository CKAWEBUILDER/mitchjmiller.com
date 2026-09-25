#!/usr/bin/env node
/**
 * Exports for direction 05 — THE JOURNEY MAP.
 *
 *   node export.mjs              # posters + gif + text-fit report
 *   node export.mjs --posters    # posters only
 *   node export.mjs --gif        # gif only
 *   node export.mjs --gif --fps 10 --clip 4.25 --colors 128
 *
 * Reuses the kit's Chrome discovery / page harness (viz/kit/export/lib/browser.mjs)
 * and the kit's local gifenc + pngjs. Nothing in the kit is written to; all output
 * lands in ./exports beside this file.
 */
import { mkdirSync, writeFileSync, statSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const HERE = dirname(fileURLToPath(import.meta.url));
const KIT = resolve(HERE, '../../kit');
const { launch, openViz, vizUrl, now, ms } = await import(pathToFileURL(join(KIT, 'export/lib/browser.mjs')).href);

/* gifenc + pngjs live only in the kit's node_modules — resolve from there. */
const kitRequire = createRequire(pathToFileURL(join(KIT, 'package.json')).href);
const { PNG } = kitRequire('pngjs');
const { GIFEncoder, quantize, applyPalette } = kitRequire('gifenc');

const argv = process.argv.slice(2);
const arg = (k, d) => { const i = argv.indexOf(`--${k}`); return i >= 0 ? argv[i + 1] : d; };
const only = argv.includes('--posters') ? 'posters' : argv.includes('--gif') ? 'gif' : 'all';

const TEMPLATE = join(HERE, 'index.html');
const OUT = join(HERE, 'exports');
mkdirSync(OUT, { recursive: true });

const POSTERS = [
  { w: 1080, h: 1350, file: 'poster-1080x1350.png' },
  { w: 1080, h: 1080, file: 'poster-1080x1080.png' },
  { w: 2160, h: 2700, file: 'poster-2160x2700.png' },
];

/* ------------------------------------------------------------- fit checking
   Every laid-out text line carries data-box="x,y,w,h" — the rect it is allowed
   to occupy. We compare the rendered ink box (cap height to descender, which is
   what a reader sees) against that rect, against the poster frame, and against
   every other line's ink box. */
const FIT_FN = `(() => {
  const W = document.querySelector('svg').viewBox.baseVal.width;
  const H = document.querySelector('svg').viewBox.baseVal.height;
  const nodes = [...document.querySelectorAll('text[data-box]')];
  const items = nodes.map(t => {
    const b = t.getBBox();
    const fs = parseFloat(getComputedStyle(t).fontSize);
    const yb = parseFloat(t.getAttribute('y'));
    const box = t.getAttribute('data-box').split(',').map(Number);
    return {
      text: t.textContent.slice(0, 54),
      fs: +fs.toFixed(1),
      ink: { x: b.x, y: yb - fs * 0.78, w: b.width, h: fs },
      box: { x: box[0], y: box[1], w: box[2], h: box[3] },
    };
  });
  const TOL = 1.5;
  const fail = [];
  for (const it of items) {
    const { ink, box } = it;
    if (ink.x < box.x - TOL || ink.x + ink.w > box.x + box.w + TOL) {
      fail.push({ kind: 'overflows its box horizontally', text: it.text, by: +(Math.max(box.x - ink.x, ink.x + ink.w - (box.x + box.w))).toFixed(1) });
    }
    if (ink.y < box.y - TOL || ink.y + ink.h > box.y + box.h + TOL) {
      fail.push({ kind: 'overflows its box vertically', text: it.text, by: +(Math.max(box.y - ink.y, ink.y + ink.h - (box.y + box.h))).toFixed(1) });
    }
    if (ink.x < 4 || ink.y < 2 || ink.x + ink.w > W - 4 || ink.y + ink.h > H - 2) {
      fail.push({ kind: 'clipped by the frame', text: it.text });
    }
    if (it.fs < 11) fail.push({ kind: 'below the 11px legibility floor', text: it.text, by: it.fs });
  }
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const a = items[i].ink, b = items[j].ink;
      const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
      const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
      if (ox > 1 && oy > 1) {
        fail.push({ kind: 'overlaps another line', text: items[i].text + '  ><  ' + items[j].text, by: +Math.min(ox, oy).toFixed(1) });
      }
    }
  }
  return { count: items.length, fail, smallest: Math.min(...items.map(i => i.fs)) };
})()`;

async function check(page, label) {
  const r = await page.evaluate(FIT_FN);
  if (r.fail.length) {
    console.error(`  ✗ ${label}: ${r.fail.length} text problem(s) across ${r.count} lines`);
    for (const f of r.fail.slice(0, 20)) console.error(`      ${f.kind}${f.by !== undefined ? ` (${f.by})` : ''}: “${f.text}”`);
  } else {
    console.log(`  ✓ ${label}: ${r.count} text lines fit, smallest ${r.smallest}px`);
  }
  return r.fail.length;
}

/* -------------------------------------------------------------------- run */
const t0 = now();
const browser = await launch();
let problems = 0;
const written = [];

try {
  /* ------------------------------------------------------------- posters */
  if (only !== 'gif') {
    for (const { w, h, file } of POSTERS) {
      const t = now();
      const { page, errors, external } = await openViz(browser, vizUrl(TEMPLATE, { size: `${w}x${h}`, poster: 1 }), { width: w, height: h });
      if (errors.length) throw new Error(`page errors at ${w}x${h}: ${errors.join(' | ')}`);
      if (external.length) throw new Error(`artifact reached the network: ${external.slice(0, 3).join(', ')}`);
      problems += await check(page, file);
      const path = join(OUT, file);
      await page.screenshot({ path, clip: { x: 0, y: 0, width: w, height: h }, captureBeyondViewport: false });
      await page.close();
      written.push([path, ms(t)]);
    }
  }

  /* ----------------------------------------------------------------- gif
     index.html's own render() already spends a beat paused on each
     territory (see PAUSE/SEGS there), so a plain uniform time-sample over
     [0, duration] captures the pacing for free. Three complete renderings
     are then written back to back — reusing the same captured/quantised
     frames, no extra screenshots — each ending on a short settled hold,
     except the third, which holds on the final frame for 50s before the
     GIF's own NETSCAPE loop (repeat: 0) starts it over. */
  if (only !== 'posters') {
    const size = Number(arg('size', 640));
    const height = Number(arg('height', 800));
    const fps = Number(arg('fps', 11));
    const colors = Number(arg('colors', 144));
    const cycleHold = Number(arg('cycle-hold', 1500));   // short settled hold after renderings 1 & 2
    const finalHold = Number(arg('final-hold', 50000));  // long hold after rendering 3, before the loop
    const reps = Number(arg('reps', 3));
    const t = now();

    const { page, errors, external } = await openViz(browser, vizUrl(TEMPLATE, { size: `${size}x${height}`, gif: 1 }), { width: size, height });
    if (errors.length) throw new Error(`page errors in gif mode: ${errors.join(' | ')}`);
    if (external.length) throw new Error(`artifact reached the network: ${external.slice(0, 3).join(', ')}`);
    const duration = await page.evaluate(() => window.VIZ.duration);
    const clip = Number(arg('clip', duration.toFixed(2)));
    const frames = Math.max(2, Math.round(clip * fps));
    const delay = Math.round(1000 / fps);

    const shots = [];
    for (let i = 0; i < frames; i++) {
      await page.evaluate(s => window.VIZ.seek(s), (i / (frames - 1)) * clip);
      shots.push(await page.screenshot({ clip: { x: 0, y: 0, width: size, height }, captureBeyondViewport: false }));
    }
    await page.close();
    console.log(`  captured ${frames} frames at ${size}×${height}, ${fps} fps, ${clip}s (x${reps} renderings) in ${ms(t)}`);

    const tEnc = now();
    const rgba = shots.map(b => new Uint8Array(PNG.sync.read(b).data));
    const px = size * height;
    const idx = [0, Math.floor(frames * 0.4), Math.floor(frames * 0.75), frames - 1];
    const sample = new Uint8Array(idx.length * px * 4);
    idx.forEach((f, i) => sample.set(rgba[f], i * px * 4));
    const palette = quantize(sample, Math.min(255, colors), { format: 'rgb565' });
    const transparentIndex = palette.length;
    const tablePalette = [...palette, [0, 0, 0]];
    const indexed = rgba.map(f => applyPalette(f, palette, 'rgb565'));

    const gif = GIFEncoder();
    let prevFrame = null;
    for (let c = 0; c < reps; c++) {
      for (let i = 0; i < indexed.length; i++) {
        const cur = indexed[i];
        const isRepEnd = i === indexed.length - 1;
        const extra = isRepEnd ? (c < reps - 1 ? cycleHold : finalHold) : 0;
        const opts = { delay: delay + extra, repeat: 0 };
        if (prevFrame === null) { gif.writeFrame(cur, size, height, { ...opts, palette: tablePalette }); prevFrame = cur; continue; }
        const out = new Uint8Array(px);
        for (let p = 0; p < px; p++) out[p] = cur[p] === prevFrame[p] ? transparentIndex : cur[p];
        gif.writeFrame(out, size, height, { ...opts, transparent: true, transparentIndex, dispose: 1 });
        prevFrame = cur;
      }
    }
    gif.finish();
    const path = join(OUT, `anim-${size}x${height}.gif`);
    writeFileSync(path, gif.bytes());
    console.log(`  encoded ${palette.length} colours, ${reps * indexed.length} total frames in ${ms(tEnc)}`);
    written.push([path, ms(t)]);
    const mb = statSync(path).size / 1048576;
    if (mb > 3) { console.error(`  ✗ gif is ${mb.toFixed(2)} MB — over the 3 MB ceiling`); problems++; }
  }
} finally {
  await browser.close();
}

for (const [path, took] of written) {
  const kb = statSync(path).size / 1024;
  console.log(`  ${(kb > 1024 ? (kb / 1024).toFixed(2) + ' MB' : kb.toFixed(0) + ' KB').padStart(9)}  ${took.padStart(8)}  ${path}`);
}
console.log(`done in ${ms(t0)}${problems ? ` — ${problems} problem(s)` : ''}`);
if (problems) process.exitCode = 1;
