#!/usr/bin/env node
/**
 * Exports + checks for the statistician-vs-data-scientist journey map.
 *
 *   node export.mjs                 # 3 posters + gif, each gated by the text audit
 *   node export.mjs --posters       # posters only
 *   node export.mjs --gif           # gif only
 *   node export.mjs --interaction   # headless click / keyboard / fallback-link checks
 *   node export.mjs --gif --fps 10 --colors 128 --reps 1 --final-hold 1500   # quick preview gif
 *
 * Borrows the kit's Chrome discovery / page harness (../../kit/export/lib/browser.mjs)
 * and the kit's local gifenc + pngjs; nothing in the kit is written to. Output lands
 * beside this file: poster-1080x1350.png, poster-1080x1080.png, poster-2160x2700.png,
 * anim-640x800.gif. Each poster is gated by the text audit and the measured contrast audit. --interaction writes one throwaway harness page to a temp dir
 * (os.tmpdir(), or --tmp <dir>) and deletes it afterwards.
 */
import { mkdtempSync, writeFileSync, readFileSync, statSync, rmSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const HERE = dirname(fileURLToPath(import.meta.url));
const KIT = resolve(HERE, '../../kit');
const { launch, openViz, vizUrl, now, ms } = await import(pathToFileURL(join(KIT, 'export/lib/browser.mjs')).href);
const kitRequire = createRequire(pathToFileURL(join(KIT, 'package.json')).href);
const { PNG } = kitRequire('pngjs');
const { GIFEncoder, quantize, applyPalette } = kitRequire('gifenc');

const argv = process.argv.slice(2);
const arg = (k, d) => { const i = argv.indexOf(`--${k}`); return i >= 0 ? argv[i + 1] : d; };
const only = argv.includes('--interaction') ? 'interaction' : argv.includes('--posters') ? 'posters' : argv.includes('--gif') ? 'gif' : 'all';

const TEMPLATE = join(HERE, 'index.html');
const OUT = HERE;
const POSTERS = [
  { w: 1080, h: 1350, file: 'poster-1080x1350.png' },
  { w: 1080, h: 1080, file: 'poster-1080x1080.png' },
  { w: 2160, h: 2700, file: 'poster-2160x2700.png' },
];

/* ------------------------------------------------------------- text audit
   Every laid-out line carries data-box="x,y,w,h" (viewBox units). For each
   line we take the real ink box — horizontal extent from getBBox(), vertical
   extent from the font's own glyph metrics via canvas measureText() — and fail
   the poster if the ink leaves its box, touches the frame edge, collides with
   another line, sits under a road or a milestone pip, or is below 12px (in
   1080-wide units). Lines closer than 2px to a neighbour, and every line under
   14px, are listed so the floor stays visible. */
const FIT_FN = `(() => {
  const svg = document.querySelector('svg');
  const W = svg.viewBox.baseVal.width, H = svg.viewBox.baseVal.height;
  const cv = document.createElement('canvas').getContext('2d');
  const items = [...document.querySelectorAll('text[data-box]')].map(t => {
    const fs = parseFloat(t.getAttribute('font-size'));
    cv.font = (t.getAttribute('font-weight') || 400) + ' ' + fs + 'px ' + t.getAttribute('font-family');
    cv.letterSpacing = (parseFloat(t.getAttribute('letter-spacing')) || 0) + 'px';
    const m = cv.measureText(t.textContent);
    const b = t.getBBox();
    const yb = parseFloat(t.getAttribute('y'));
    const box = t.getAttribute('data-box').split(',').map(Number);
    return {
      text: t.textContent.slice(0, 64), fs,
      ink: { x: b.x, y: yb - m.actualBoundingBoxAscent, w: b.width, h: m.actualBoundingBoxAscent + m.actualBoundingBoxDescent },
      box: { x: box[0], y: box[1], w: box[2], h: box[3] },
    };
  });
  const TOL = 1.0, fail = [], warn = [];
  for (const it of items) {
    const { ink, box } = it;
    if (ink.x < box.x - TOL || ink.x + ink.w > box.x + box.w + TOL)
      fail.push({ kind: 'overflows its box horizontally', text: it.text, by: +Math.max(box.x - ink.x, ink.x + ink.w - (box.x + box.w)).toFixed(1) });
    if (ink.y < box.y - TOL || ink.y + ink.h > box.y + box.h + TOL)
      fail.push({ kind: 'overflows its box vertically', text: it.text, by: +Math.max(box.y - ink.y, ink.y + ink.h - (box.y + box.h)).toFixed(1) });
    if (ink.x < 4 || ink.y < 2 || ink.x + ink.w > W - 4 || ink.y + ink.h > H - 2) fail.push({ kind: 'clipped by the frame', text: it.text });
    if (it.fs < 12) fail.push({ kind: 'below the 12px floor', text: it.text, by: it.fs });
  }
  for (let i = 0; i < items.length; i++) for (let j = i + 1; j < items.length; j++) {
    const a = items[i].ink, b = items[j].ink;
    const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
    const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
    if (ox > 0.5 && oy > 0.5) fail.push({ kind: 'overlaps another line', text: items[i].text + '  ><  ' + items[j].text, by: +Math.min(ox, oy).toFixed(1) });
    else if (ox > 0.5 && oy > -2) warn.push({ kind: 'within 2px of another line', text: items[i].text + '  /  ' + items[j].text, by: +(-oy).toFixed(1) });
  }
  /* roads, side paths and pips must never run under text */
  const hazards = [];
  for (const p of document.querySelectorAll('path[data-road]')) {
    const half = parseFloat(p.getAttribute('stroke-width')) / 2 + 1, L = p.getTotalLength();
    for (let l = 0; l <= L; l += 3) { const q = p.getPointAtLength(l); hazards.push({ x: q.x, y: q.y, r: half, what: p.getAttribute('data-road') }); }
  }
  for (const c of document.querySelectorAll('circle[data-pip]')) hazards.push({ x: +c.getAttribute('cx'), y: +c.getAttribute('cy'), r: +c.getAttribute('r') + 2, what: 'pip' });
  for (const it of items) {
    const k = it.ink;
    const hit = hazards.find(h => h.x > k.x - h.r && h.x < k.x + k.w + h.r && h.y > k.y - h.r && h.y < k.y + k.h + h.r);
    if (hit) fail.push({ kind: 'a ' + hit.what + ' runs under this line', text: it.text });
  }
  const sizes = items.map(i => i.fs);
  return { count: items.length, fail, warn, smallest: Math.min(...sizes),
    under14: items.filter(i => i.fs < 14).map(i => i.fs + 'px ' + i.text.slice(0, 40)) };
})()`;

async function audit(page, label) {
  const r = await page.evaluate(FIT_FN);
  if (r.fail.length) {
    console.error(`  ✗ ${label}: ${r.fail.length} text problem(s) across ${r.count} lines`);
    for (const f of r.fail.slice(0, 40)) console.error(`      ${f.kind}${f.by !== undefined ? ` (${f.by})` : ''}: “${f.text}”`);
  } else {
    console.log(`  ✓ ${label}: ${r.count} text lines fit, smallest ${r.smallest}px, ${r.under14.length} under 14px`);
  }
  for (const w of r.warn.slice(0, 12)) console.log(`      · ${w.kind} (${w.by}px): “${w.text}”`);
  if (argv.includes('--verbose')) for (const u of r.under14) console.log(`      <14 ${u}`);
  return r.fail.length;
}

/* --------------------------------------------------------- contrast audit
   Measured, not assumed: every text line's colour is compared with the actual
   pixels behind it. All text is hidden, the background is screenshotted, and
   the worst ratio over every pixel inside the line's ink box is kept — so
   decorative stripes, rings and hatching under a line count. WCAG 2.x AA: 4.5:1,
   or 3:1 for large text (>= 24px, or >= 18.66px at weight >= 700).
   Gate: every line on every poster. Title bar (data-zone="title"): 4.5:1 on
   every line except the display numeral (>= 60px, 3:1). Everywhere else: WCAG
   AA. Any miss blocks the export. */
const CONTRAST_PREP = `(() => {
  const svg = document.querySelector('svg');
  const vb = svg.viewBox.baseVal, r = svg.getBoundingClientRect();
  const sx = r.width / vb.width, sy = r.height / vb.height;
  const cv = document.createElement('canvas').getContext('2d');
  const rgb = s => (s.match(/[\\d.]+/g) || []).slice(0, 3).map(Number);
  const items = [...document.querySelectorAll('text[data-box]')].map(t => {
    const fs = parseFloat(t.getAttribute('font-size')), wt = +(t.getAttribute('font-weight') || 400);
    cv.font = wt + ' ' + fs + 'px ' + t.getAttribute('font-family');
    cv.letterSpacing = (parseFloat(t.getAttribute('letter-spacing')) || 0) + 'px';
    const m = cv.measureText(t.textContent), b = t.getBBox(), yb = parseFloat(t.getAttribute('y'));
    let op = 1;
    for (let n = t; n && n !== svg; n = n.parentNode) { const o = n.getAttribute && n.getAttribute('opacity'); if (o) op *= parseFloat(o); }
    return { text: t.textContent.slice(0, 48), fs, wt, zone: t.getAttribute('data-zone') || '', fill: rgb(getComputedStyle(t).fill), op,
      x: b.x * sx + r.left, y: (yb - m.actualBoundingBoxAscent) * sy + r.top, w: b.width * sx, h: (m.actualBoundingBoxAscent + m.actualBoundingBoxDescent) * sy };
  });
  for (const t of document.querySelectorAll('svg text')) t.style.visibility = 'hidden';
  return items;
})()`;
const lin = c => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const ratio = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

async function contrastAudit(page, label, w, h) {
  const items = await page.evaluate(CONTRAST_PREP);
  const shot = await page.screenshot({ clip: { x: 0, y: 0, width: w, height: h }, captureBeyondViewport: false });
  await page.evaluate(() => { for (const t of document.querySelectorAll('svg text')) t.style.visibility = ''; });
  const png = PNG.sync.read(shot), d = png.data;
  const gate = [], title = [], largeUnder45 = [];
  let worstN = { r: Infinity }, worstL = { r: Infinity };
  for (const it of items) {
    if (it.op < 0.999) { gate.push(`${it.text} — not measured, opacity ${it.op} in the settled frame`); continue; }
    const Lt = lum(it.fill);
    let worst = Infinity;
    const x0 = Math.max(0, Math.floor(it.x)), x1 = Math.min(png.width - 1, Math.ceil(it.x + it.w));
    const y0 = Math.max(0, Math.floor(it.y)), y1 = Math.min(png.height - 1, Math.ceil(it.y + it.h));
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
      const i = (y * png.width + x) * 4;
      const c = ratio(Lt, lum([d[i], d[i + 1], d[i + 2]]));
      if (c < worst) worst = c;
    }
    const large = it.fs >= 24 || (it.fs >= 18.66 && it.wt >= 700);
    const need = it.zone === 'title' ? (it.fs >= 60 ? 3 : 4.5) : (large ? 3 : 4.5);
    const row = `${worst.toFixed(2)}:1 (needs ${need}) ${it.fs}px/${it.wt} “${it.text}”`;
    if (it.zone === 'title') title.push(row);
    if (worst < need) gate.push(row);
    const slot = need >= 4.5 ? 'N' : 'L';
    if (slot === 'N' && worst < worstN.r) worstN = { r: worst, row };
    if (slot === 'L' && worst < worstL.r) worstL = { r: worst, row };
    if (slot === 'L' && worst < 4.5) largeUnder45.push(row);
  }
  if (gate.length) { console.error(`  ✗ ${label}: ${gate.length} line(s) below WCAG AA contrast (measured)`); gate.forEach(g => console.error('      ' + g)); }
  else console.log(`  ✓ ${label}: contrast, all ${items.length} lines at WCAG AA (measured worst case)`);
  console.log(`      worst normal-size (needs 4.5): ${worstN.row}`);
  console.log(`      worst large-size  (needs 3):   ${worstL.row}`);
  if (argv.includes('--verbose')) { title.forEach(t => console.log('      title  ' + t)); largeUnder45.forEach(t => console.log('      large<4.5  ' + t)); }
  return gate.length;
}

/* ------------------------------------------------------ gif byte check */
function inspectGif(buf) {
  const u8 = new Uint8Array(buf);
  const head = String.fromCharCode(...u8.slice(0, 6));
  let p = 13;
  const flags = u8[10];
  if (flags & 0x80) p += 3 * (1 << ((flags & 7) + 1));
  let frames = 0, loop = null; const delays = [];
  const skipSub = () => { while (u8[p] !== 0) p += u8[p] + 1; p += 1; };
  while (p < u8.length) {
    const b = u8[p];
    if (b === 0x3B) break;
    if (b === 0x21) {
      const label = u8[p + 1];
      if (label === 0xF9) { delays.push(u8[p + 4] | (u8[p + 5] << 8)); p += 2; skipSub(); }
      else if (label === 0xFF) {
        const id = String.fromCharCode(...u8.slice(p + 3, p + 14));
        if (id === 'NETSCAPE2.0') loop = u8[p + 16] | (u8[p + 17] << 8);
        p += 2; skipSub();
      } else { p += 2; skipSub(); }
    } else if (b === 0x2C) {
      frames++;
      const lf = u8[p + 9];
      p += 10;
      if (lf & 0x80) p += 3 * (1 << ((lf & 7) + 1));
      p += 1; skipSub();
    } else throw new Error(`unexpected GIF block 0x${b.toString(16)} at ${p}`);
  }
  return { head, frames, loop, delays, totalCs: delays.reduce((a, b) => a + b, 0) };
}

/* -------------------------------------------------------------------- run */
const t0 = now();
const browser = await launch();
let problems = 0;
const written = [];

try {
  if (only === 'all' || only === 'posters') {
    for (const { w, h, file } of POSTERS) {
      const t = now();
      const { page, errors, external } = await openViz(browser, vizUrl(TEMPLATE, { size: `${w}x${h}`, poster: 1 }), { width: w, height: h });
      if (errors.length) throw new Error(`page errors at ${w}x${h}: ${errors.join(' | ')}`);
      if (external.length) throw new Error(`artifact reached the network: ${external.slice(0, 3).join(', ')}`);
      problems += await audit(page, file);
      const path = join(OUT, file);
      await page.screenshot({ path, clip: { x: 0, y: 0, width: w, height: h }, captureBeyondViewport: false });
      problems += await contrastAudit(page, file, w, h);
      await page.close();
      written.push([path, ms(t)]);
    }
  }

  /* gif: index.html's render() already holds a 0.7 s beat at each stop, so a
     uniform time-sample over [0, duration] carries the pacing. Three complete
     renderings are written back to back (same frames, no extra screenshots),
     each ending on a short settled hold except the third, which holds on the
     final frame for 50 s before the NETSCAPE loop starts it over. */
  if (only === 'all' || only === 'gif') {
    const size = Number(arg('size', 640)), height = Number(arg('height', 800));
    const fps = Number(arg('fps', 11)), colors = Number(arg('colors', 160));
    const cycleHold = Number(arg('cycle-hold', 1500)), finalHold = Number(arg('final-hold', 50000));
    const reps = Number(arg('reps', 3));
    const t = now();
    const { page, errors, external } = await openViz(browser, vizUrl(TEMPLATE, { size: `${size}x${height}`, gif: 1 }), { width: size, height });
    if (errors.length) throw new Error(`page errors in gif mode: ${errors.join(' | ')}`);
    if (external.length) throw new Error(`artifact reached the network: ${external.slice(0, 3).join(', ')}`);
    const duration = await page.evaluate(() => window.VIZ.duration);
    const sched = await page.evaluate(() => window.VIZ.schedule);
    const clip = Number(arg('clip', duration.toFixed(2)));
    const frames = Math.max(2, Math.round(clip * fps));
    const delay = Math.round(1000 / fps);
    const shots = [];
    for (let i = 0; i < frames; i++) {
      await page.evaluate(s => window.VIZ.seek(s), (i / (frames - 1)) * clip);
      shots.push(await page.screenshot({ clip: { x: 0, y: 0, width: size, height }, captureBeyondViewport: false }));
    }
    await page.close();
    console.log(`  captured ${frames} frames at ${size}×${height}, ${fps} fps, ${clip}s per rendering (x${reps}) in ${ms(t)}`);
    console.log(`  schedule: side paths reach signposts ${sched.sideEnd.toFixed(2)}s · roads start ${sched.roadStart.toFixed(2)}s · stops ${sched.stops.map(s => s.key + ' ' + s.t.toFixed(2)).join(', ')} · roads end ${sched.roadEnd.toFixed(2)}s`);

    const rgba = shots.map(b => new Uint8Array(PNG.sync.read(b).data));
    const px = size * height;
    const idx = [0, Math.floor(frames * 0.35), Math.floor(frames * 0.7), frames - 1];
    const sample = new Uint8Array(idx.length * px * 4);
    idx.forEach((f, i) => sample.set(rgba[f], i * px * 4));
    const palette = quantize(sample, Math.min(255, colors), { format: 'rgb565' });
    const transparentIndex = palette.length;
    const tablePalette = [...palette, [0, 0, 0]];
    const indexed = rgba.map(f => applyPalette(f, palette, 'rgb565'));
    const gif = GIFEncoder();
    let prev = null;
    for (let c = 0; c < reps; c++) {
      for (let i = 0; i < indexed.length; i++) {
        const cur = indexed[i];
        const extra = i === indexed.length - 1 ? (c < reps - 1 ? cycleHold : finalHold) : 0;
        const opts = { delay: delay + extra, repeat: 0 };
        if (prev === null) { gif.writeFrame(cur, size, height, { ...opts, palette: tablePalette }); prev = cur; continue; }
        const out = new Uint8Array(px);
        for (let q = 0; q < px; q++) out[q] = cur[q] === prev[q] ? transparentIndex : cur[q];
        gif.writeFrame(out, size, height, { ...opts, transparent: true, transparentIndex, dispose: 1 });
        prev = cur;
      }
    }
    gif.finish();
    const path = join(OUT, `anim-${size}x${height}.gif`);
    writeFileSync(path, gif.bytes());
    written.push([path, ms(t)]);
    const info = inspectGif(readFileSync(path));
    const holds = info.delays.map((d, i) => [i, d]).filter(([, d]) => d > delay / 10 + 1);
    console.log(`  gif bytes: ${info.head}, ${info.frames} frames, loop=${info.loop}, per-frame ${info.delays[1]} cs, holds ${holds.map(([i, d]) => `#${i}=${(d / 100).toFixed(2)}s`).join(' ')}, total ${(info.totalCs / 100).toFixed(1)}s`);
    if (info.head !== 'GIF89a' || info.loop !== 0 || info.frames !== reps * frames) { console.error('  ✗ gif structure unexpected'); problems++; }
    const mb = statSync(path).size / 1048576;
    if (mb > 3) { console.error(`  ✗ gif is ${mb.toFixed(2)} MB — over the 3 MB ceiling`); problems++; }
  }

  /* interaction: a throwaway parent page embeds the live map at 640x800 with
     ?parent= pointing back at itself, so a fallback link lands as a same-page
     hash change the harness can read. */
  if (only === 'interaction') {
    const dir = mkdtempSync(join(arg('tmp', tmpdir()), 'svds-harness-'));
    const harness = join(dir, 'harness.html');
    const harnessUrl = pathToFileURL(harness).href;
    const liveUrl = vizUrl(TEMPLATE, { size: '640x800', parent: harnessUrl });
    const sections = ['no-bls-code', 'pay', 'growth', 'education', 'practice', 'methods'];
    writeFileSync(harness, `<!doctype html><html><body style="margin:0;font:16px sans-serif">
<iframe id="f" src="${liveUrl}" width="640" height="850" style="border:0;display:block"></iframe>
${sections.map(s => `<h2 id="role-${s}" style="margin:900px 0 0">${s}</h2>`).join('\n')}
<div style="height:900px"></div>
<script>window.__msgs=[];addEventListener('message',e=>window.__msgs.push(e.data));</script></body></html>`);
    const results = [];
    const ok = (name, pass, detail = '') => { results.push({ name, pass, detail }); if (!pass) problems++; console.log(`  ${pass ? '✓' : '✗'} ${name}${detail ? ' — ' + detail : ''}`); };
    try {
      const page = await browser.newPage();
      const external = [];
      await page.setRequestInterception(true);
      page.on('request', r => { const u = r.url(); if (!/^(file|data|about):/.test(u)) { external.push(u); return r.abort('blockedbyclient'); } r.continue(); });
      const errors = [];
      page.on('pageerror', e => errors.push(String(e)));
      await page.setViewport({ width: 700, height: 900 });
      await page.goto(harnessUrl, { waitUntil: 'load' });
      const fh = await page.$('#f');
      const frame = await fh.contentFrame();
      await frame.waitForFunction(() => document.documentElement.dataset.ready === '1');
      const stops = await frame.evaluate(() => window.VIZ.stops);
      ok('eight stops exposed', stops.length === 8, stops.map(s => s.key).join(','));

      /* hrefs */
      const hrefs = await frame.evaluate(() => [...document.querySelectorAll('a[data-stop]')].map(a => [a.dataset.stop, a.dataset.section, a.getAttribute('href'), a.getAttribute('target')]));
      ok('every fallback href = parent + #role-<section>, target=_top', hrefs.every(([, sec, h, tg]) => h === harnessUrl + '#role-' + sec && tg === '_top'), hrefs.map(h => h[0] + '→' + h[2].split('#')[1]).join(' '));

      /* tab order */
      await frame.evaluate(() => { document.body.tabIndex = -1; document.body.focus(); });
      const order = [];
      for (let i = 0; i < 9; i++) {
        await page.keyboard.press('Tab');
        order.push(await frame.evaluate(() => document.activeElement && (document.activeElement.dataset.stop || document.activeElement.id || document.activeElement.tagName)));
      }
      ok('tab order: Sources, GE, AI, stops 1–5, journey’s end', order.join(',') === 'src-btn,growth-engineer,ai-engineer,education,pay,growth,tools,postings,practice', order.join(','));

      /* real clicks */
      for (const s of stops) {
        await page.evaluate(() => { window.__msgs = []; history.replaceState(null, '', location.pathname); window.scrollTo(0, 0); });
        /* aim at the stop's own body rect: the <a>'s box also spans its clipped decorative rings */
        const el = await frame.$(`a[data-stop="${s.key}"] > g > rect:nth-of-type(2)`);
        const box = await el.boundingBox();
        await page.mouse.click(box.x + box.width * 0.3, box.y + box.height / 2);
        await new Promise(r => setTimeout(r, 120));
        const got = await page.evaluate(() => ({ msgs: window.__msgs, hash: location.hash }));
        const m = got.msgs[0] || {};
        ok(`click ${s.key}`, m.type === 'viz-intent' && m.intent === s.section && m.stop === s.key && got.hash === '#role-' + s.section, `msg ${JSON.stringify(m)} hash ${got.hash}`);
      }
      /* keyboard: Enter and Space on focused stops */
      for (const [key, k] of [['pay', 'Enter'], ['tools', 'Space'], ['ai-engineer', 'Enter']]) {
        await page.evaluate(() => { window.__msgs = []; history.replaceState(null, '', location.pathname); window.scrollTo(0, 0); });
        await frame.evaluate(k => document.querySelector(`a[data-stop="${k}"]`).focus(), key);   // SVG <a>: puppeteer's focus() only takes HTMLElements
        await page.keyboard.press(k);
        await new Promise(r => setTimeout(r, 120));
        const got = await page.evaluate(() => ({ msgs: window.__msgs, hash: location.hash }));
        const sec = stops.find(s => s.key === key).section;
        ok(`${k} on ${key}`, got.msgs.length === 1 && got.msgs[0].intent === sec && got.hash === '#role-' + sec, `${JSON.stringify(got.msgs)} ${got.hash}`);
      }
      /* highlight + API */
      const api = await frame.evaluate(() => {
        const a = window.VIZ.selectIntent('growth'), b = window.VIZ.selectIntent('methods'), c = window.VIZ.selectIntent('bogus');
        const lit = [...document.querySelectorAll('a[data-stop]')].filter(a => [...a.querySelectorAll('rect')].some(r => r.getAttribute('pointer-events') === 'none' && r.getAttribute('opacity') === '1')).map(a => a.dataset.stop);
        return { a, b, c, lit };
      });
      ok('selectIntent accepts stop keys and sections, rejects others; one stop lit', api.a && api.b && !api.c && api.lit.length === 1 && api.lit[0] === 'tools', JSON.stringify(api));
      /* hover prompt */
      const pr = await frame.evaluate(async () => {
        const a = document.querySelector('a[data-stop="education"]');
        a.dispatchEvent(new MouseEvent('mouseenter'));
        const on = document.getElementById('prompt').textContent;
        a.dispatchEvent(new MouseEvent('mouseleave'));
        return { on, off: document.getElementById('prompt').textContent };
      });
      ok('prompt: default text, "Read the section" on hover', pr.off === 'Click a stop on either road to jump to its section.' && /^Read the section: Stop 1/.test(pr.on), JSON.stringify(pr));
      /* sources drawer */
      await frame.click('#src-btn');
      const d1 = await frame.evaluate(() => ({ hidden: document.getElementById('drawer').hidden, exp: document.getElementById('src-btn').getAttribute('aria-expanded'), focus: document.activeElement.id, items: document.querySelectorAll('#drawer-list li').length }));
      await page.keyboard.press('Escape');
      const d2 = await frame.evaluate(() => ({ hidden: document.getElementById('drawer').hidden, exp: document.getElementById('src-btn').getAttribute('aria-expanded'), focus: document.activeElement.id }));
      ok('sources drawer opens (focus to heading), Escape closes (focus back)', !d1.hidden && d1.exp === 'true' && d1.focus === 'drawer-h' && d1.items >= 8 && d2.hidden && d2.exp === 'false' && d2.focus === 'src-btn', JSON.stringify([d1, d2]));
      ok('no page errors', errors.length === 0, errors.join(' | '));
      ok('no network requests', external.length === 0, external.join(', '));
      await page.close();

      /* modes */
      for (const [params, expectBar] of [[{ size: '1080x1350', poster: 1 }, false], [{ size: '640x800', gif: 1 }, false], [{}, true]]) {
        const { page: p2, errors: e2 } = await openViz(browser, vizUrl(TEMPLATE, params), { width: 1080, height: 1350 });
        const bar = await p2.evaluate(() => getComputedStyle(document.getElementById('bar')).display !== 'none');
        ok(`prompt bar ${expectBar ? 'shown' : 'hidden'} for ${JSON.stringify(params)}`, bar === expectBar && e2.length === 0, e2.join(' | '));
        await p2.close();
      }
      const { page: p3 } = await openViz(browser, vizUrl(TEMPLATE, { size: '640x800' }), { width: 640, height: 800, reducedMotion: true });
      const rm = await p3.evaluate(() => ({ at: window.VIZ.frame(), dur: window.VIZ.duration, end: document.querySelector('[data-body="end"]').getAttribute('opacity') }));
      ok('reduced motion renders the settled frame', Math.abs(rm.at - rm.dur) < 1e-6 && rm.end === '1.000', JSON.stringify(rm));
      await p3.close();
      const { page: p4 } = await openViz(browser, vizUrl(TEMPLATE, { size: '640x800', parent: 'javascript:alert(1)' }), { width: 640, height: 800 });
      const bad = await p4.evaluate(() => document.querySelector('a[data-stop="pay"]').getAttribute('href'));
      ok('a javascript: parent is refused (falls back to the standalone post URL)', bad === 'https://mj2.pro/blog/statistician-vs-data-scientist/#role-pay', bad);
      await p4.close();
      /* opened on its own with no ?parent= (e.g. from the LinkedIn link): stops go to the post, never to the referrer */
      const { page: p5 } = await openViz(browser, vizUrl(TEMPLATE, {}), { width: 700, height: 905 });
      const solo = await p5.evaluate(() => [...document.querySelectorAll('a[data-stop]')].map(a => a.getAttribute('href')));
      ok('standalone page: every stop links to the post section', solo.every(h => h.startsWith('https://mj2.pro/blog/statistician-vs-data-scientist/#role-')), solo.slice(0, 3).join(' '));
      await p5.close();
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
    console.log(`  interaction: ${results.filter(r => r.pass).length}/${results.length} passed`);
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
