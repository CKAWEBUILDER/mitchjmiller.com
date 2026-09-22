#!/usr/bin/env node
/**
 * Exporter for the Data Mandala direction.
 *
 *   node export.mjs            # both posters + the GIF
 *   node export.mjs --posters  # posters only
 *   node export.mjs --gif      # GIF only
 *   node export.mjs --gif --fps 10 --colors 48 --dur 4.0
 *
 * Borrows Chrome discovery / launch / network-blocking from the shared kit
 * (viz/kit/export/lib/browser.mjs) and resolves gifenc + pngjs out of
 * viz/kit/node_modules. Nothing in the kit is written to.
 */
import { mkdirSync, writeFileSync, statSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const HERE = dirname(fileURLToPath(import.meta.url));
const KIT  = resolve(HERE, '../../kit');
const { launch, openViz, vizUrl, now, ms } = await import(resolve(KIT, 'export/lib/browser.mjs'));

const kitRequire = createRequire(join(KIT, 'package.json'));
const { PNG } = kitRequire('pngjs');
const { GIFEncoder, quantize, applyPalette } = kitRequire('gifenc');

const argv = process.argv.slice(2);
const arg = (k, d) => { const i = argv.indexOf(`--${k}`); return i >= 0 ? argv[i + 1] : d; };
const wants = n => argv.length === 0 || argv.includes(`--${n}`) ||
  (!argv.includes('--posters') && !argv.includes('--gif'));

const TEMPLATE = resolve(HERE, 'index.html');
const OUT = HERE;
const SETTLED = Number(arg('t', 3.2));
mkdirSync(OUT, { recursive: true });

const t0 = now();
const browser = await launch();
try {
  /* ------------------------------------------------------------- posters */
  if (wants('posters')) {
    for (const [w, h] of [[1080, 1350], [1080, 1080]]) {
      const t = now();
      const { page, errors, external } = await openViz(browser, vizUrl(TEMPLATE, { size: `${w}x${h}`, t: SETTLED }), {
        width: w, height: h, deviceScaleFactor: 1,
      });
      if (errors.length) throw new Error(`page errors @${w}x${h}: ${errors.join(' | ')}`);
      if (external.length) throw new Error(`artifact hit the network: ${external.slice(0, 3).join(', ')}`);
      const buf = await page.screenshot({ clip: { x: 0, y: 0, width: w, height: h }, captureBeyondViewport: false });
      const file = join(OUT, `poster-${w}x${h}.png`);
      writeFileSync(file, buf);
      await page.close();
      console.log(`poster ${w}×${h}  ${(statSync(file).size / 1024).toFixed(0)} KB  ${ms(t)}`);
    }
  }

  /* ----------------------------------------------------------------- gif */
  if (wants('gif')) {
    const W = Number(arg('w', 640)), H = Number(arg('h', 800));
    const fps = Number(arg('fps', 11));
    const dur = Number(arg('dur', 4.0));
    const colors = Number(arg('colors', 64));
    const frames = Math.round(dur * fps);
    const delay = Math.round(1000 / fps);

    const t = now();
    const { page, errors, external } = await openViz(browser, vizUrl(TEMPLATE, { size: `${W}x${H}`, t: 0 }), {
      width: W, height: H, deviceScaleFactor: 1,
    });
    if (errors.length) throw new Error(`page errors @gif: ${errors.join(' | ')}`);
    if (external.length) throw new Error(`artifact hit the network: ${external.slice(0, 3).join(', ')}`);

    const shots = [];
    for (let i = 0; i < frames; i++) {
      await page.evaluate(s => window.VIZ.seek(s), (i / frames) * dur);
      shots.push(await page.screenshot({ clip: { x: 0, y: 0, width: W, height: H }, captureBeyondViewport: false }));
    }
    await page.close();
    console.log(`  captured ${frames} frames at ${W}×${H} in ${ms(t)}`);

    const px = W * H;
    const rgba = shots.map(b => new Uint8Array(PNG.sync.read(b).data));
    const idxs = [0, Math.floor(frames * 0.3), Math.floor(frames * 0.55), Math.floor(frames * 0.8), frames - 1];
    const sample = new Uint8Array(idxs.length * px * 4);
    idxs.forEach((fr, i) => sample.set(rgba[fr], i * px * 4));
    const palette = quantize(sample, Math.min(255, colors), { format: 'rgb565' });
    const transparentIndex = palette.length;
    const tablePalette = [...palette, [0, 0, 0]];
    const indexed = rgba.map(fr => applyPalette(fr, palette, 'rgb565'));

    const gif = GIFEncoder();
    for (let i = 0; i < indexed.length; i++) {
      const cur = indexed[i];
      if (i === 0) { gif.writeFrame(cur, W, H, { delay, repeat: 0, palette: tablePalette }); continue; }
      const prev = indexed[i - 1], out = new Uint8Array(px);
      for (let p = 0; p < px; p++) out[p] = cur[p] === prev[p] ? transparentIndex : cur[p];
      gif.writeFrame(out, W, H, { delay, repeat: 0, transparent: true, transparentIndex, dispose: 1 });
    }
    gif.finish();
    const file = join(OUT, `anim-${W}x${H}.gif`);
    writeFileSync(file, gif.bytes());
    const kb = statSync(file).size / 1024;
    console.log(`gif ${W}×${H}  ${frames} frames @ ${fps}fps  ${palette.length} colours  ${(kb / 1024).toFixed(2)} MB  ${file}`);
    if (kb > 3072) console.warn('  WARNING: over 3 MB — lower --fps or --colors.');
  }
} finally {
  await browser.close();
}
console.log(`done in ${ms(t0)}`);
