#!/usr/bin/env node
/**
 * NEON ARCADE — export.
 *
 *   node export.mjs            # posters + gif + fit check
 *   node export.mjs --check    # fit check only, writes nothing
 *   node export.mjs --posters  # posters only
 *   node export.mjs --gif      # gif only
 *
 * Chrome discovery and the hardened page-open (network blocked, VIZ.ready
 * awaited) are reused from the kit: ../../kit/export/lib/browser.mjs.
 * gifenc + pngjs are required out of ../../kit/node_modules — the kit itself
 * is never modified and kit/exports is never touched.
 */
import { mkdirSync, writeFileSync, statSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const HERE = dirname(fileURLToPath(import.meta.url));
const KIT = resolve(HERE, '../../kit');

const { launch, openViz, vizUrl, now, ms } = await import(
  resolve(KIT, 'export/lib/browser.mjs')
);

// gifenc / pngjs live only in the kit's node_modules; resolve from there.
const kitRequire = createRequire(join(KIT, 'package.json'));
const { PNG } = kitRequire('pngjs');
const gifenc = kitRequire('gifenc');
const { GIFEncoder, quantize, applyPalette } = gifenc;

const argv = process.argv.slice(2);
const has = f => argv.includes(`--${f}`);
const arg = (k, d) => { const i = argv.indexOf(`--${k}`); return i >= 0 ? argv[i + 1] : d; };

const TEMPLATE = resolve(HERE, 'index.html');
const OUT = resolve(HERE, arg('out', '.'));
mkdirSync(OUT, { recursive: true });

const doPosters = !has('gif') && !has('check') || has('posters');
const doGif = !has('posters') && !has('check') || has('gif');

/* ------------------------------------------------------------- fit check */
// Runs inside the page. Flags anything that leaves the frame, any text box
// whose content is wider/taller than its box (clipped), and any two text
// boxes that overlap.
const FIT_CHECK = `(() => {
  const frame = document.getElementById('frame');
  const fb = { w: frame.offsetWidth, h: frame.offsetHeight };
  const fr = frame.getBoundingClientRect();
  const scale = fr.width / fb.w;
  const issues = [];
  const boxes = [];
  const label = n => {
    const t = (n.textContent || '').trim().replace(/\\s+/g, ' ');
    return (n.className && typeof n.className === 'string' ? '.' + n.className.split(' ')[0] : n.tagName)
      + ' "' + t.slice(0, 46) + (t.length > 46 ? '…' : '') + '"';
  };
  for (const n of frame.querySelectorAll('*')) {
    const cs = getComputedStyle(n);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const r = n.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) continue;
    // outside the frame?
    if (r.left < fr.left - 0.6 || r.top < fr.top - 0.6 ||
        r.right > fr.right + 0.6 || r.bottom > fr.bottom + 0.6) {
      issues.push({ kind: 'outside-frame', el: label(n),
        box: [ +(r.left - fr.left).toFixed(1), +(r.top - fr.top).toFixed(1),
               +(r.right - fr.left).toFixed(1), +(r.bottom - fr.top).toFixed(1) ] });
    }
    // Clipped text: only meaningful where the box actually clips. line-height
    // below 1 on display type makes scrollHeight exceed clientHeight without
    // anything being lost, so a visible overflow is never a failure.
    const hidesX = /hidden|clip|scroll/.test(cs.overflowX);
    const hidesY = /hidden|clip|scroll/.test(cs.overflowY);
    const leafText = n.children.length === 0 && (n.textContent || '').trim().length > 0;
    const clamped = cs.webkitLineClamp && cs.webkitLineClamp !== 'none';
    if (!clamped) {
      if (hidesX && n.scrollWidth - n.clientWidth > 1.5)
        issues.push({ kind: 'clipped-x', el: label(n), over: n.scrollWidth - n.clientWidth });
      if (hidesY && n.scrollHeight - n.clientHeight > 1.5 && (leafText || n.classList.contains('b-main')))
        issues.push({ kind: 'clipped-y', el: label(n), over: n.scrollHeight - n.clientHeight });
    }
    // Overlap is only meaningful between boxes that lay themselves out; an
    // inline <b> inside a wrapped paragraph has a multi-line union rect that
    // always "overlaps" its siblings.
    if (leafText && cs.display !== 'inline')
      boxes.push({ el: label(n), r: { l: r.left, t: r.top, rt: r.right, b: r.bottom } });
  }
  // overlapping text (ignore nested/stacked pairs that share a parent chain)
  for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
    const a = boxes[i].r, b = boxes[j].r;
    const ox = Math.min(a.rt, b.rt) - Math.max(a.l, b.l);
    const oy = Math.min(a.b, b.b) - Math.max(a.t, b.t);
    if (ox > 2 && oy > 2) issues.push({ kind: 'text-overlap', el: boxes[i].el + '  ×  ' + boxes[j].el,
      over: +(ox * oy).toFixed(0) });
  }
  // Band overflow. scrollHeight misses the centred case: a flex column with
  // justify-content:center spills equally out of both ends and the scroll box
  // never grows. Compare the union of the real child rects to the band's box.
  for (const n of frame.querySelectorAll('.band')) {
    const br = n.getBoundingClientRect();
    const cs2 = getComputedStyle(n);
    // Rects are post-transform; computed padding is not. Scale it to match,
    // or every band reads as ~3px overflowed at the GIF's 0.59 scale.
    const padT = parseFloat(cs2.paddingTop) * scale, padB = parseFloat(cs2.paddingBottom) * scale;
    let top = Infinity, bot = -Infinity;
    for (const c of n.querySelectorAll('.b-detail, .b-tag, .bars, .b-metric')) {
      const r = c.getBoundingClientRect();
      if (r.height < 1) continue;
      top = Math.min(top, r.top); bot = Math.max(bot, r.bottom);
    }
    if (!isFinite(top)) continue;
    const over = Math.max((br.top + padT) - top, bot - (br.bottom - padB));
    if (over > 1.5) issues.push({ kind: 'band-overflow', el: label(n.querySelector('.b-title')), over });
    if (n.scrollHeight - n.clientHeight > 1.5)
      issues.push({ kind: 'band-scroll', el: label(n.querySelector('.b-title')), over: n.scrollHeight - n.clientHeight });
  }
  return { scale: +scale.toFixed(4), frame: fb, issues };
})()`;

async function check(page, tag) {
  const r = await page.evaluate(FIT_CHECK);
  const bad = r.issues;
  if (!bad.length) { console.log(`  fit ${tag.padEnd(10)} OK  (${r.frame.w}×${r.frame.h} @ ${r.scale})`); return 0; }
  console.log(`  fit ${tag.padEnd(10)} ${bad.length} issue(s):`);
  for (const i of bad.slice(0, 24)) console.log(`      ${i.kind.padEnd(14)} ${i.el}${i.over ? '  (+' + Number(i.over).toFixed(1) + ')' : ''}`);
  if (bad.length > 24) console.log(`      … ${bad.length - 24} more`);
  return bad.length;
}

/* ------------------------------------------------------------------- run */
const t0 = now();
const browser = await launch();
const written = [];
let problems = 0;

try {
  const SIZES = [
    { w: 1080, h: 1350, tag: '1080x1350' },
    { w: 1080, h: 1080, tag: '1080x1080' },
  ];

  for (const { w, h, tag } of SIZES) {
    const t = now();
    const { page, errors, external } = await openViz(
      browser, vizUrl(TEMPLATE, { size: tag, static: 1 }), { width: w, height: h, deviceScaleFactor: 1 },
    );
    if (errors.length) throw new Error(`Page errors at ${tag}: ${errors.join(' | ')}`);
    if (external.length) throw new Error(`Artifact reached the network at ${tag}: ${external.slice(0, 3).join(', ')}`);
    problems += await check(page, tag);
    if (doPosters) {
      const file = join(OUT, `poster-${tag}.png`);
      await page.screenshot({ path: file, clip: { x: 0, y: 0, width: w, height: h }, captureBeyondViewport: false });
      written.push([file, ms(t)]);
    }
    await page.close();
  }

  /* ------------------------------------------------------------ the GIF */
  if (doGif) {
    const size = Number(arg('size', 640));
    const height = Number(arg('height', 800));
    const fps = Number(arg('fps', 11));
    const clip = Number(arg('clip', 3.2));
    const hold = Number(arg('hold', 1100));
    const colors = Number(arg('colors', 144));
    const frames = Math.max(2, Math.round(clip * fps));
    const delay = Math.round(1000 / fps);

    const tCap = now();
    const { page, errors, external } = await openViz(
      browser, vizUrl(TEMPLATE, { size: `${size}x${height}` }), { width: size, height, deviceScaleFactor: 1 },
    );
    if (errors.length) throw new Error(`Page errors in gif mode: ${errors.join(' | ')}`);
    if (external.length) throw new Error(`Artifact reached the network in gif mode: ${external.slice(0, 3).join(', ')}`);
    await page.evaluate(() => window.VIZ.seek(window.VIZ.settled));
    problems += await check(page, `${size}x${height}`);

    const shots = [];
    for (let i = 0; i < frames; i++) {
      const t = (i / frames) * clip;
      await page.evaluate(s => window.VIZ.seek(s), t);
      shots.push(await page.screenshot({ clip: { x: 0, y: 0, width: size, height }, captureBeyondViewport: false }));
    }
    await page.close();
    console.log(`  captured ${frames} frames at ${size}×${height} in ${ms(tCap)}`);

    const tEnc = now();
    const rgba = shots.map(b => new Uint8Array(PNG.sync.read(b).data));
    const px = size * height;
    const sampleIdx = [0, Math.floor(frames * 0.3), Math.floor(frames * 0.55),
                       Math.floor(frames * 0.78), frames - 1];
    const sample = new Uint8Array(sampleIdx.length * px * 4);
    sampleIdx.forEach((f, i) => sample.set(rgba[f], i * px * 4));
    const palette = quantize(sample, Math.min(255, colors), { format: 'rgb565' });
    const transparentIndex = palette.length;
    const tablePalette = [...palette, [0, 0, 0]];
    const indexed = rgba.map(f => applyPalette(f, palette, 'rgb565'));

    const gif = GIFEncoder();
    for (let i = 0; i < indexed.length; i++) {
      const cur = indexed[i];
      const isLast = i === indexed.length - 1;
      const opts = { delay: isLast ? delay + hold : delay, repeat: 0 };
      if (i === 0) { gif.writeFrame(cur, size, height, { ...opts, palette: tablePalette }); continue; }
      const prev = indexed[i - 1];
      const out = new Uint8Array(px);
      for (let p = 0; p < px; p++) out[p] = cur[p] === prev[p] ? transparentIndex : cur[p];
      gif.writeFrame(out, size, height, { ...opts, transparent: true, transparentIndex, dispose: 1 });
    }
    gif.finish();

    const file = join(OUT, `anim-${size}x${height}.gif`);
    writeFileSync(file, gif.bytes());
    written.push([file, ms(tEnc)]);
    const kb = statSync(file).size / 1024;
    console.log(`  gif: ${frames} frames · ${fps} fps · ${clip}s + ${hold}ms hold · ${palette.length} colours`);
    if (kb > 3072) console.warn(`  WARNING: ${(kb / 1024).toFixed(2)} MB — over the 3 MB budget. Lower --colors or --fps.`);
  }
} finally {
  await browser.close();
}

for (const [file, took] of written) {
  console.log(`  ${(statSync(file).size / 1024).toFixed(0).padStart(6)} KB  ${String(took).padStart(8)}  ${file}`);
}
console.log(`done in ${ms(t0)}${problems ? ` — ${problems} fit issue(s)` : ''}`);
if (problems) process.exitCode = 1;
