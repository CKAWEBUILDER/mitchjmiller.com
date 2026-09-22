#!/usr/bin/env node
/**
 * Animated GIF of the reveal — the "rudimentary version" LinkedIn accepts.
 *
 *   node export/gif.mjs
 *   node export/gif.mjs --size 640 --fps 12 --clip 3.2 --hold 1400 --colors 128
 *
 * How it works
 *   1. Loads template.html?gif=1 at a square viewport. GIF mode hides the
 *      controls, shows the honesty strip, and turns the mandala exactly 1/K of
 *      a revolution over `--clip` seconds, so the backdrop loops seamlessly.
 *   2. Steps the deterministic clock with window.VIZ.seek(t) and screenshots
 *      each frame — no timing races, the same frames every run.
 *   3. Decodes the PNGs with pngjs, quantizes once to a global palette, then
 *      writes frames with 1-bit transparency for unchanged pixels (dispose 1),
 *      which is what keeps the file small on a mostly-static background.
 *
 * No ffmpeg / gifski / ImageMagick required — none of them are installed on
 * this Mac. gifenc + pngjs live in this folder's package.json, not the site's.
 */
import { mkdirSync, writeFileSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { PNG } from 'pngjs';
import gifenc from 'gifenc';
import { launch, openViz, vizUrl, now, ms, defaultOutDir, artifactName } from './lib/browser.mjs';
import { inspectStill, reportStill, recordStills } from './lib/still-check.mjs';

const { GIFEncoder, quantize, applyPalette } = gifenc;

const argv = process.argv.slice(2);
const arg = (k, d) => { const i = argv.indexOf(`--${k}`); return i >= 0 ? argv[i + 1] : d; };

const template = resolve(process.cwd(), arg('template', 'template.html'));
const outDir = arg('out') ? resolve(process.cwd(), arg('out')) : defaultOutDir(template);
const name = arg('name', artifactName(template));
const size = Number(arg('size', 640));
const height = Number(arg('height', size));
const fps = Number(arg('fps', 12));
const clip = Number(arg('clip', 3.2));      // seconds of timeline captured
const hold = Number(arg('hold', 1400));     // extra ms on the settled last frame
const colors = Number(arg('colors', 160));
const reportOnly = argv.includes('--report-only');  // global palette size (max 255)

const frames = Math.max(2, Math.round(clip * fps));
const delay = Math.round(1000 / fps);

mkdirSync(outDir, { recursive: true });
const t0 = now();
const browser = await launch();
const shots = [];

try {
  const tCap = now();
  const { page, errors, external } = await openViz(browser, vizUrl(template, {
    gif: 1, static: 1, loop: clip,
    vertical: arg('vertical'), intent: arg('intent'),
    palette: arg('palette'), seed: arg('seed'),
  }), { width: size, height, deviceScaleFactor: 1 });
  if (errors.length) throw new Error(`Page errors: ${errors.join(' | ')}`);
  if (external.length) throw new Error(`Artifact reached the network: ${external.slice(0, 3).join(', ')}`);

  // Frame integrity on the settled GIF frame, before spending 4 s capturing 38 of them.
  await page.evaluate(() => window.VIZ.seek(window.VIZ.duration));
  const still = reportStill(await inspectStill(page, { label: `gif ${size}x${height}`, width: size, height }), { throwOnFail: !reportOnly });
  recordStills(outDir, [still]);
  if (still.failures.length) process.exitCode = 1;

  for (let i = 0; i < frames; i++) {
    const t = (i / frames) * clip;
    await page.evaluate(s => window.VIZ.seek(s), t);
    shots.push(await page.screenshot({ clip: { x: 0, y: 0, width: size, height }, captureBeyondViewport: false }));
  }
  await page.close();
  console.log(`  captured ${frames} frames at ${size}×${height} in ${ms(tCap)}`);
} finally {
  await browser.close();
}

// ---------------------------------------------------------------- encode
const tEnc = now();
const rgba = shots.map(buf => new Uint8Array(PNG.sync.read(buf).data));
const px = size * height;

// One global palette, sampled across the clip so late frames are not starved.
const sampleIdx = [0, Math.floor(frames * 0.35), Math.floor(frames * 0.7), frames - 1];
const sample = new Uint8Array(sampleIdx.length * px * 4);
sampleIdx.forEach((f, i) => sample.set(rgba[f], i * px * 4));
const palette = quantize(sample, Math.min(255, colors), { format: 'rgb565' });
const transparentIndex = palette.length;          // one slot past the real colours
const tablePalette = [...palette, [0, 0, 0]];

const indexed = rgba.map(f => applyPalette(f, palette, 'rgb565'));

const gif = GIFEncoder();
for (let i = 0; i < indexed.length; i++) {
  const cur = indexed[i];
  const isLast = i === indexed.length - 1;
  const opts = { delay: isLast ? delay + hold : delay, repeat: 0 };
  if (i === 0) {
    gif.writeFrame(cur, size, height, { ...opts, palette: tablePalette });
    continue;
  }
  // Delta: unchanged pixels become transparent and the previous frame shows through.
  const prev = indexed[i - 1];
  const out = new Uint8Array(px);
  let changed = 0;
  for (let p = 0; p < px; p++) {
    if (cur[p] === prev[p]) out[p] = transparentIndex;
    else { out[p] = cur[p]; changed++; }
  }
  gif.writeFrame(out, size, height, { ...opts, transparent: true, transparentIndex, dispose: 1 });
  if (i === 1) console.log(`  delta frame 1: ${((changed / px) * 100).toFixed(1)}% of pixels changed`);
}
gif.finish();

const file = join(outDir, `${name}-${size}x${height}.gif`);
writeFileSync(file, gif.bytes());
const kb = statSync(file).size / 1024;
console.log(`  encoded in ${ms(tEnc)}`);
console.log(`  ${kb.toFixed(0)} KB  ${file}`);
if (kb > 7800) console.warn('  WARNING: over ~8 MB — LinkedIn will not animate this. Lower --size, --fps or --colors.');
console.log(`gif: ${frames} frames, ${fps} fps, ${clip}s clip (+${hold}ms hold), ${palette.length}-colour global palette, total ${ms(t0)}`);
