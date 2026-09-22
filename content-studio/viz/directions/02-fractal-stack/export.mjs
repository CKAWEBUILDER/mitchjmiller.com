#!/usr/bin/env node
/**
 * Export for direction 02 — THE FRACTAL STACK.
 *
 *   node export.mjs            # posters + gif + checks
 *   node export.mjs --posters  # posters only
 *   node export.mjs --gif      # gif only
 *
 * Reuses the kit's Chrome discovery / self-containment guard
 * (../../kit/export/lib/browser.mjs) and the kit's local gifenc + pngjs
 * (../../kit/node_modules). Nothing in the kit is written to.
 *
 * Outputs, beside this file:
 *   poster-1080x1350.png   poster-1080x1080.png   anim-640x800.gif
 */
import { mkdirSync, writeFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const HERE = dirname(fileURLToPath(import.meta.url));
const KIT = resolve(HERE, '../../kit');

const { launch, openViz, vizUrl, now, ms } = await import(
  resolve(KIT, 'export/lib/browser.mjs')
);
const kitRequire = createRequire(join(KIT, 'package.json'));
const { PNG } = kitRequire('pngjs');
const gifenc = kitRequire('gifenc');
const { GIFEncoder, quantize, applyPalette } = gifenc;

const argv = process.argv.slice(2);
const arg = (k, d) => { const i = argv.indexOf(`--${k}`); return i >= 0 ? argv[i + 1] : d; };
const only = argv.includes('--posters') ? 'posters' : argv.includes('--gif') ? 'gif' : 'all';

const TEMPLATE = join(HERE, 'index.html');
const t0 = now();
mkdirSync(HERE, { recursive: true });

/* --------------------------------------------------------------- checks
   A still is laid out in a fixed frame with overflow:hidden, so anything
   that does not fit is silently clipped and a naive screenshot looks fine.
   Measure geometry instead of trusting it. */
async function inspect(page, label, W, H) {
  return page.evaluate(({ label, W, H }) => {
    const fail = [];
    const poster = document.getElementById('poster');
    /* measure in the poster's own 1080-wide design space, not the scaled
       viewport — the GIF renders the same layout at 0.59x */
    const savedTransform = poster.style.transform;
    poster.style.transform = 'none';
    const pr = poster.getBoundingClientRect();
    if (Math.round(pr.width) !== W || Math.round(pr.height) !== H)
      fail.push(`frame is ${Math.round(pr.width)}x${Math.round(pr.height)}, expected ${W}x${H}`);
    if (poster.scrollHeight > H + 1) fail.push(`poster content ${poster.scrollHeight}px > frame ${H}px`);
    if (poster.scrollWidth > W + 1) fail.push(`poster content ${poster.scrollWidth}px wide > frame ${W}px`);

    const inside = (el, name) => {
      const r = el.getBoundingClientRect();
      if (r.top < pr.top - 1 || r.bottom > pr.bottom + 1 || r.left < pr.left - 1 || r.right > pr.right + 1)
        fail.push(`${name} outside the frame (${Math.round(r.left)},${Math.round(r.top)} ${Math.round(r.right)},${Math.round(r.bottom)})`);
    };
    inside(document.getElementById('foot'), 'footer');
    inside(document.getElementById('srcline'), 'source line');
    inside(document.getElementById('byline'), 'byline');

    /* truncation only exists where overflow is actually clipped */
    const clipAxes = el => {
      const cs = getComputedStyle(el);
      const vis = v => v === 'visible';
      return {
        x: !vis(cs.overflowX) && el.scrollWidth > el.clientWidth + 1,
        y: !vis(cs.overflowY) && el.scrollHeight > el.clientHeight + 1,
      };
    };

    let cells = 0;
    document.querySelectorAll('.cell').forEach(c => {
      cells++;
      inside(c, `cell ${c.id}`);
      const cc = clipAxes(c);
      if (cc.y) fail.push(`cell ${c.id} content clipped (${c.scrollHeight} > ${c.clientHeight})`);
      c.querySelectorAll('.line, .cname, .kicker, .src, .mlabel, .num, .lvl').forEach(t => {
        const a = clipAxes(t);
        if (a.x) fail.push(`cell ${c.id}: "${t.textContent.trim().slice(0, 28)}…" truncated horizontally`);
        if (a.y) fail.push(`cell ${c.id}: "${t.textContent.trim().slice(0, 28)}…" truncated vertically`);
      });
    });
    for (const id of ['titlebar', 'legend', 'foot']) {
      const el = document.getElementById(id);
      const a = clipAxes(el);
      if (a.x || a.y) fail.push(`#${id} content clipped (${el.scrollWidth}x${el.scrollHeight} in ${el.clientWidth}x${el.clientHeight})`);
    }
    if (cells < 8 || cells > 14) fail.push(`${cells} labelled cells — brief asks for 8–14`);

    /* overlapping text runs, measured with a Range so overflow counts too */
    const runs = [];
    document.querySelectorAll('.cname, .kicker, .line, .src, .num, .mlabel, .eyebrow, #h1, #deck, #srcline, #byline, .lchip span').forEach(el => {
      const r = document.createRange(); r.selectNodeContents(el);
      const b = r.getBoundingClientRect();
      if (b.width > 1 && b.height > 1) runs.push({ b, txt: el.textContent.trim().slice(0, 24), el });
    });
    for (let i = 0; i < runs.length; i++) for (let j = i + 1; j < runs.length; j++) {
      const a = runs[i], c = runs[j];
      if (a.el.contains(c.el) || c.el.contains(a.el)) continue;
      const ox = Math.min(a.b.right, c.b.right) - Math.max(a.b.left, c.b.left);
      const oy = Math.min(a.b.bottom, c.b.bottom) - Math.max(a.b.top, c.b.top);
      if (ox > 2 && oy > 2) fail.push(`text overlap: "${a.txt}" / "${c.txt}"`);
    }

    /* the still must carry sources on its face — nobody can hover a PNG */
    const src = document.getElementById('srcline').textContent;
    if (!/20\d\d-\d\d-\d\d|20\d\d/.test(src)) fail.push('source line carries no date');
    if (document.querySelectorAll('.src').length < 8) fail.push('per-cell source lines missing');

    const fitNotes = window.VIZ.fitNotes || [];
    if (fitNotes.length) fail.push(`fit loop gave up on: ${fitNotes.join(', ')}`);

    poster.style.transform = savedTransform;
    return { label, cells, fail };
  }, { label, W, H });
}

function report(r) {
  if (r.fail.length) {
    console.error(`  ✗ ${r.label}: ${r.fail.length} problem(s)`);
    r.fail.forEach(f => console.error(`      - ${f}`));
    return false;
  }
  console.log(`  ✓ ${r.label}: ${r.cells} cells, no clipping, no overlap`);
  return true;
}

/* -------------------------------------------------------- contrast pass */
const hex2rgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const lum = h => { const s = hex2rgb(h).map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }); return 0.2126 * s[0] + 0.7152 * s[1] + 0.0722 * s[2]; };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
const mixHex = (a, b, t) => '#' + hex2rgb(a).map((v, i) => Math.round(v * (1 - t) + hex2rgb(b)[i] * t).toString(16).padStart(2, '0')).join('').toUpperCase();

function contrastPass() {
  const PAPER = '#FFF6E9', INK = '#15100C', YELLOW = '#FFE500';
  const fams = { root: '#15100C', info: '#1B3BEF', comm: '#E0006C', trans: '#FF6B00', nav: '#7A22D8', local: '#00A05A', none: '#8A7F70' };
  const checks = [];
  checks.push(['ink on title bar', ratio(INK, YELLOW)]);
  checks.push(['paper on footer ink', ratio(PAPER, INK)]);
  checks.push(['yellow byline on footer ink', ratio(YELLOW, INK)]);
  for (const [k, c] of Object.entries(fams)) {
    const on = ratio('#FFFFFF', c) >= ratio(INK, c) ? '#FFFFFF' : INK;
    checks.push([`strip label · ${k}`, ratio(on, c)]);
    for (const [lvl, t] of [[1, 0.80], [2, 0.845], [3, 0.905]])
      checks.push([`ink on ${k} L${lvl} tint`, ratio(INK, mixHex(c, PAPER, t))]);
  }
  const bad = checks.filter(([, r]) => r < 4.5);
  console.log(`contrast: ${checks.length - bad.length}/${checks.length} pairs ≥ 4.5:1 (min ${Math.min(...checks.map(c => c[1])).toFixed(2)}:1)`);
  bad.forEach(([n, r]) => console.error(`  ✗ ${n}: ${r.toFixed(2)}:1`));
  return bad.length === 0;
}

/* ------------------------------------------------------------- run */
let ok = contrastPass();
const browser = await launch();
try {
  if (only !== 'gif') {
    for (const [W, H] of [[1080, 1350], [1080, 1080]]) {
      const tp = now();
      const { page, errors, external } = await openViz(browser, vizUrl(TEMPLATE, { size: `${W}x${H}`, static: 1 }), { width: W, height: H, deviceScaleFactor: 1 });
      if (errors.length) throw new Error(`page errors: ${errors.join(' | ')}`);
      if (external.length) throw new Error(`artifact reached the network: ${external.slice(0, 3).join(', ')}`);
      await page.evaluate(() => window.VIZ.seek(window.VIZ.duration));
      ok = report(await inspect(page, `poster ${W}x${H}`, W, H)) && ok;
      const file = join(HERE, `poster-${W}x${H}.png`);
      writeFileSync(file, await page.screenshot({ clip: { x: 0, y: 0, width: W, height: H }, captureBeyondViewport: false }));
      console.log(`  ${(statSync(file).size / 1024).toFixed(0)} KB  ${file}  (${ms(tp)})`);
      await page.close();
    }
  }

  if (only !== 'posters') {
    const W = Number(arg('w', 640)), H = Number(arg('h', 800));
    const fps = Number(arg('fps', 11));
    const clip = Number(arg('clip', 4.2));
    const hold = Number(arg('hold', 900));
    const colors = Number(arg('colors', 128));
    const frames = Math.max(2, Math.round(clip * fps));
    const delay = Math.round(1000 / fps);

    const tc = now();
    const { page, errors, external } = await openViz(browser, vizUrl(TEMPLATE, { size: '1080x1350', static: 1, clip, loop: clip }), { width: W, height: H, deviceScaleFactor: 1 });
    if (errors.length) throw new Error(`page errors: ${errors.join(' | ')}`);
    if (external.length) throw new Error(`artifact reached the network: ${external.slice(0, 3).join(', ')}`);
    await page.evaluate(() => window.VIZ.seek(window.VIZ.duration));
    ok = report(await inspect(page, `gif frame ${W}x${H}`, 1080, 1350)) && ok;

    const shots = [];
    for (let i = 0; i < frames; i++) {
      await page.evaluate((n, f) => window.VIZ.frame(n, f), i, frames);
      shots.push(await page.screenshot({ clip: { x: 0, y: 0, width: W, height: H }, captureBeyondViewport: false }));
    }
    await page.close();
    console.log(`  captured ${frames} frames at ${W}×${H} in ${ms(tc)}`);

    const te = now();
    const rgba = shots.map(b => new Uint8Array(PNG.sync.read(b).data));
    const px = W * H;
    const sampleIdx = [0, Math.floor(frames * 0.35), Math.floor(frames * 0.7), frames - 1];
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
      if (i === 0) { gif.writeFrame(cur, W, H, { ...opts, palette: tablePalette }); continue; }
      const prev = indexed[i - 1];
      const out = new Uint8Array(px);
      for (let p = 0; p < px; p++) out[p] = cur[p] === prev[p] ? transparentIndex : cur[p];
      gif.writeFrame(out, W, H, { ...opts, transparent: true, transparentIndex, dispose: 1 });
    }
    gif.finish();
    const file = join(HERE, `anim-${W}x${H}.gif`);
    writeFileSync(file, gif.bytes());
    const kb = statSync(file).size / 1024;
    console.log(`  encoded in ${ms(te)}`);
    console.log(`  ${kb.toFixed(0)} KB  ${file}  (${frames} frames, ${fps} fps, ${clip}s, ${palette.length} colours)`);
    if (kb > 3072) { console.error(`  ✗ GIF over 3 MB (${(kb / 1024).toFixed(2)} MB) — lower --fps, --colors or --w/--h`); ok = false; }
  }
} finally {
  await browser.close();
}

console.log(ok ? `\nall checks passed · ${ms(t0)}` : `\nFAILED — see problems above · ${ms(t0)}`);
process.exit(ok ? 0 : 1);
