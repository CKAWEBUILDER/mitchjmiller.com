#!/usr/bin/env node
/**
 * Exporter for the growth-title-market data mandala.
 *
 *   node export.mjs                 # posters (1x + 2x) + verify + GIF
 *   node export.mjs --posters       # poster-1080x1350 / 1080x1080 / 2160x2700
 *   node export.mjs --verify        # type-size / overlap / crossing audit, exits 1 on a finding
 *   node export.mjs --gif           # anim-640x800.gif
 *   node export.mjs --gif --fps 12 --colors 96 --hold 50
 *
 * The GIF is three complete renderings in a row -- each a slowed assembly with a
 * 0.70s beat between stages and a 1.50s settled hold -- followed by ONE frame
 * held for --hold seconds, then the loop repeats. Beats and holds are single
 * frames carrying a long delay, so an 80-second loop still costs ~230 frames.
 *
 * Adapted from viz/directions/01-data-mandala/export.mjs. Borrows Chrome
 * discovery / launch / network-blocking from the shared kit
 * (viz/kit/export/lib/browser.mjs) and resolves gifenc + pngjs out of
 * viz/kit/node_modules. Nothing in the kit is written to; output lands here.
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
const only = argv.filter(a => ['--posters', '--gif', '--verify'].includes(a));
const wants = n => only.length === 0 || only.includes(`--${n}`);

const TEMPLATE = resolve(HERE, 'index.html');
const OUT = HERE;
mkdirSync(OUT, { recursive: true });

/* posters: [css width, css height, device scale] */
const POSTERS = [[1080, 1350, 1], [1080, 1080, 1], [1080, 1350, 2]];

function report(label, a, { floorApplies = true } = {}) {
  const bad = (floorApplies ? a.under.length : 0) + a.overlaps.length + a.crossings.length + a.arcOverflow.length + a.outside.length;
  console.log(`verify ${label}: ${a.textCount} text runs + ${a.arcCount} crown arcs · ${floorApplies ? a.under.length : `(${a.under.length} normalised)`} under 14px · ` +
    `${a.overlaps.length} overlaps · ${a.crossings.length} line crossings · ${a.arcOverflow.length} arc overflows · ${a.outside.length} off-canvas`);
  if (floorApplies) a.under.slice(0, 12).forEach(u => console.log(`   UNDER ${u.size}px  "${u.text}"`));
  a.overlaps.slice(0, 12).forEach(o => console.log(`   OVERLAP "${o.a}" x "${o.b}"  ${o.ox}x${o.oy}px`));
  a.crossings.slice(0, 16).forEach(c => console.log(`   CROSSING "${c.text}" by ${c.by}`));
  a.arcOverflow.forEach(c => console.log(`   ARC OVERFLOW "${c.text}" fill ${c.fill}`));
  a.outside.forEach(s => console.log(`   OFF-CANVAS "${s}"`));
  return bad;
}

const t0 = now();
const browser = await launch();
let failures = 0;
try {
  /* ------------------------------------------------------------- posters */
  if (wants('posters')) {
    for (const [w, h, dsf] of POSTERS) {
      const t = now();
      const { page, errors, external } = await openViz(browser, vizUrl(TEMPLATE, { size: `${w}x${h}`, poster: 1 }), {
        width: w, height: h, deviceScaleFactor: dsf,
      });
      if (errors.length) throw new Error(`page errors @${w}x${h}: ${errors.join(' | ')}`);
      if (external.length) throw new Error(`artifact hit the network: ${external.slice(0, 3).join(', ')}`);
      const buf = await page.screenshot({ clip: { x: 0, y: 0, width: w, height: h }, captureBeyondViewport: false });
      const file = join(OUT, `poster-${w * dsf}x${h * dsf}.png`);
      writeFileSync(file, buf);
      await page.close();
      console.log(`poster ${w * dsf}x${h * dsf}  ${(statSync(file).size / 1024).toFixed(0)} KB  ${ms(t)}`);
    }
  }

  /* -------------------------------------------------------------- verify */
  if (wants('verify')) {
    for (const [w, h, dsf] of POSTERS) {
      if (dsf !== 1) continue;                       // 2x is the same layout, doubled
      const { page, errors } = await openViz(browser, vizUrl(TEMPLATE, { size: `${w}x${h}`, poster: 1 }), { width: w, height: h, deviceScaleFactor: 1 });
      if (errors.length) throw new Error(`page errors @${w}x${h}: ${errors.join(' | ')}`);
      const a = await page.evaluate(() => window.VIZ.audit());
      await page.close();
      failures += report(`${w}x${h}`, a);
      if (process.env.ARCFILL) a.arcFill.forEach(x => console.log('   arc', x));
    }
    /* the GIF canvas is a straight scale-down of the 4:5 poster; the floor is defined at 1080 wide */
    const { page } = await openViz(browser, vizUrl(TEMPLATE, { size: '640x800', poster: 1 }), { width: 640, height: 800, deviceScaleFactor: 1 });
    const a = await page.evaluate(() => window.VIZ.audit());
    await page.close();
    failures += report('640x800 (gif canvas)', a, { floorApplies: false });
  }

  /* ----------------------------------------------------------------- gif */
  if (wants('gif')) {
    const W = Number(arg('w', 640)), H = Number(arg('h', 800));
    const fps = Number(arg('fps', 11));
    const colors = Number(arg('colors', 96));
    const holdS = Number(arg('hold', 50));

    const t = now();
    const { page, errors, external } = await openViz(browser, vizUrl(TEMPLATE, { size: `${W}x${H}`, t: 0 }), {
      width: W, height: H, deviceScaleFactor: 1,
    });
    if (errors.length) throw new Error(`page errors @gif: ${errors.join(' | ')}`);
    if (external.length) throw new Error(`artifact hit the network: ${external.slice(0, 3).join(', ')}`);

    const cycleWipe = await page.evaluate(n => window.VIZ.framePlan(n, { wipe: true }), fps);
    const cycleLast = await page.evaluate(n => window.VIZ.framePlan(n, { wipe: false }), fps);
    const settled = await page.evaluate(() => window.VIZ.settled);
    const seq = [...cycleWipe, ...cycleWipe, ...cycleLast, { t: settled, delay: holdS * 1000 }];

    /* capture every distinct timestamp exactly once */
    const uniq = [...new Set(seq.map(s => s.t))].sort((a, b) => a - b);
    const shots = new Map();
    for (const tt of uniq) {
      await page.evaluate(s => window.VIZ.seek(s), tt);
      shots.set(tt, await page.screenshot({ clip: { x: 0, y: 0, width: W, height: H }, captureBeyondViewport: false }));
    }
    await page.close();
    const cycleS = cycleWipe.reduce((n, s) => n + s.delay, 0) / 1000;
    const lastS  = cycleLast.reduce((n, s) => n + s.delay, 0) / 1000;
    const totalS = (seq.reduce((n, s) => n + s.delay, 0)) / 1000;
    console.log(`  captured ${uniq.length} distinct frames at ${W}x${H} in ${ms(t)}`);
    console.log(`  cycle ${cycleS.toFixed(2)}s (x2) + final cycle ${lastS.toFixed(2)}s + ${holdS}s hold = ${totalS.toFixed(2)}s loop, ${seq.length} frames`);

    /* palette from a spread of the distinct frames */
    const px = W * H;
    const pick = [0, 0.18, 0.36, 0.55, 0.75, 0.93, 1].map(k => uniq[Math.min(uniq.length - 1, Math.floor(k * uniq.length))]);
    const sample = new Uint8Array(pick.length * px * 4);
    pick.forEach((tt, i) => sample.set(new Uint8Array(PNG.sync.read(shots.get(tt)).data), i * px * 4));
    const palette = quantize(sample, Math.min(255, colors), { format: 'rgb565' });
    const transparentIndex = palette.length;
    const tablePalette = [...palette, [0, 0, 0]];

    /* index each distinct frame once, then write the sequence */
    const indexed = new Map();
    for (const tt of uniq) {
      indexed.set(tt, applyPalette(new Uint8Array(PNG.sync.read(shots.get(tt)).data), palette, 'rgb565'));
      shots.delete(tt);
    }

    const gif = GIFEncoder();
    let prev = null;
    for (let i = 0; i < seq.length; i++) {
      const cur = indexed.get(seq[i].t), delay = seq[i].delay;
      if (i === 0) { gif.writeFrame(cur, W, H, { delay, repeat: 0, palette: tablePalette }); prev = cur; continue; }
      const out = new Uint8Array(px);
      for (let p = 0; p < px; p++) out[p] = cur[p] === prev[p] ? transparentIndex : cur[p];
      gif.writeFrame(out, W, H, { delay, repeat: 0, transparent: true, transparentIndex, dispose: 1 });
      prev = cur;
    }
    gif.finish();
    const file = join(OUT, `anim-${W}x${H}.gif`);
    writeFileSync(file, gif.bytes());
    const kb = statSync(file).size / 1024;
    console.log(`gif ${W}x${H}  ${seq.length} frames @ ${fps}fps  ${palette.length} colours  ${(kb / 1024).toFixed(2)} MB  ${file}`);
    if (kb > 3072) { console.warn('  WARNING: over 3 MB -- lower --colors or --fps.'); failures++; }
  }
} finally {
  await browser.close();
}
console.log(`done in ${ms(t0)}${failures ? `  (${failures} issue(s) reported)` : ''}`);
if (failures) process.exitCode = 1;
