#!/usr/bin/env node
/**
 * Exporter — B2B vs B2C by vertical, the fractal stack (final build).
 *
 *   node export.mjs             # contrast + posters + verify + GIF + live round trip
 *   node export.mjs --posters   # poster-1080x1350.png, poster-1080x1080.png, poster-2160x2700.png
 *   node export.mjs --verify    # audits: type floor, clipping, overlap; every vertical in the live page
 *   node export.mjs --gif       # anim-640x800.gif  (three renderings, then a 50 s still, loops)
 *   node export.mjs --live      # postMessage + target=_top round trip on a throwaway 127.0.0.1 server
 *   node export.mjs --gif --fps 12 --colors 128 --hold 50 --port 5311
 *
 * Chrome discovery and the network guard come from the kit
 * (../../kit/export/lib/browser.mjs); gifenc + pngjs resolve from ../../kit/node_modules.
 * Writes only into this folder. The --live server binds 127.0.0.1 on a port ≥ 5300
 * and is closed before the script exits.
 */
import { writeFileSync, statSync, readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const HERE = dirname(fileURLToPath(import.meta.url));
const KIT = resolve(HERE, '../../kit');
const { launch, openViz, vizUrl, now, ms } = await import(resolve(KIT, 'export/lib/browser.mjs'));
const kitRequire = createRequire(join(KIT, 'package.json'));
const { PNG } = kitRequire('pngjs');
const { GIFEncoder, quantize, applyPalette } = kitRequire('gifenc');

const argv = process.argv.slice(2);
const arg = (k, d) => { const i = argv.indexOf(`--${k}`); return i >= 0 ? argv[i + 1] : d; };
const MODES = ['posters', 'verify', 'gif', 'live'];
const picked = MODES.filter(m => argv.includes(`--${m}`));
const wants = m => picked.length === 0 || picked.includes(m);
const TEMPLATE = join(HERE, 'index.html');
const POST_URL = 'https://mj2.pro/blog/b2b-vs-b2c-by-vertical/';   /* the jump's fallback when no allowed ?parent= */
const t0 = now();
let failures = 0;
const bad = msg => { failures++; console.error(`  ✗ ${msg}`); };

/* --------------------------------------------------------- contrast pass
   Same palette as index.html. Text pairs must clear 4.5:1; marks (bars,
   swatches) are reported against 3:1 and always sit beside a printed value. */
const PAPER = '#FFF6E9', INK = '#15100C', INK_SOFT = '#4A3F33', YELLOW = '#FFE500', PANEL = '#FFFDF7';
const B2B = '#1B3BEF', B2C = '#E25700', GAP = '#8A7F70';
const FAM = { close: '#15100C', find: '#B5419A', site: '#009E73', nurture: '#7A6500' };
const hex2rgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const lum = h => { const s = hex2rgb(h).map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }); return 0.2126 * s[0] + 0.7152 * s[1] + 0.0722 * s[2]; };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
const mix = (a, b, t) => '#' + hex2rgb(a).map((v, i) => Math.round(v * (1 - t) + hex2rgb(b)[i] * t).toString(16).padStart(2, '0')).join('').toUpperCase();
const onColor = c => ratio('#FFFFFF', c) >= ratio(INK, c) ? '#FFFFFF' : INK;

function contrastPass() {
  const text = [], marks = [];
  const T = (n, f, b) => text.push([n, ratio(f, b)]);
  const M = (n, f, b) => marks.push([n, ratio(f, b)]);
  const SEL = mix(YELLOW, PAPER, 0.55), NOSRC = mix(GAP, PAPER, 0.84);
  T('ink on title bar', INK, YELLOW); T('yellow on ink (title highlight)', YELLOW, INK);
  T('paper on footer', PAPER, INK); T('yellow byline on footer', YELLOW, INK);
  T('ink-soft on paper (legend)', INK_SOFT, PAPER);
  T('white on B2B tag', '#FFFFFF', B2B); T('ink on B2C tag', INK, B2C);
  T('paper on ink group bar', PAPER, INK); T('ink on grey group bar', INK, GAP);
  T('ink on open strip', INK, YELLOW); T('ink on open cell', INK, SEL); T('ink-soft on open cell', INK_SOFT, SEL);
  T('ink on no-source cell', INK, NOSRC); T('ink-soft on no-source cell', INK_SOFT, NOSRC); T('ink on stamp', INK, PAPER);
  for (const [k, c] of Object.entries(FAM)) {
    T(`strip label · ${k}`, onColor(c), c);
    for (const [lvl, t] of k === 'close' ? [[1, 0.80], [2, 0.845], [3, 0.905]] : [[3, 0.905]]) {
      T(`ink on ${k} L${lvl} tint`, INK, mix(c, PAPER, t));
      T(`ink-soft on ${k} L${lvl} tint`, INK_SOFT, mix(c, PAPER, t));
    }
    M(`${k} bar on its track`, c, mix(c, PAPER, 0.955));
  }
  T('ink on panel', INK, PANEL); T('ink-soft on panel', INK_SOFT, PANEL); T('link blue on panel', B2B, PANEL);
  M('B2B bar on track', B2B, mix(INK, PAPER, 0.955)); M('B2C bar on track', B2C, mix(INK, PAPER, 0.955));
  M('hatch grey on paper', GAP, PAPER);
  const badT = text.filter(([, r]) => r < 4.5);
  const minT = Math.min(...text.map(c => c[1])), minM = Math.min(...marks.map(c => c[1]));
  console.log(`contrast: text ${text.length - badT.length}/${text.length} ≥ 4.5:1 (min ${minT.toFixed(2)}:1) · marks min ${minM.toFixed(2)}:1`);
  badT.forEach(([n, r]) => bad(`${n}: ${r.toFixed(2)}:1`));
  marks.filter(([, r]) => r < 3).forEach(([n, r]) => console.log(`  · mark under 3:1 (value printed beside it): ${n} ${r.toFixed(2)}:1`));
}

function summarise(a) {
  const g = {};
  a.under14.forEach(u => { const k = `${u.cls} ${u.px}px`; g[k] = (g[k] || 0) + 1; });
  return Object.entries(g).sort((x, y) => y[1] - x[1]).map(([k, n]) => `${k} ×${n}`).join(', ');
}
function reportAudit(label, a, detail) {
  if (a.fail.length) { a.fail.slice(0, 20).forEach(f => bad(`${label}: ${f}`)); return; }
  console.log(`  ✓ ${label}: ${a.cells} cells, ${a.textEls} text runs, min ${a.minPx}px, ${a.under14.length} runs at 12–13.9px, no clipping, no overlap`);
  if (detail && a.under14.length) console.log(`      12–13.9px: ${summarise(a)}`);
}

/* ------------------------------------------------------------ GIF parser
   Reads the written file back: signature, size, loop count, frame delays.  */
function parseGif(buf) {
  const sig = buf.toString('ascii', 0, 6), w = buf.readUInt16LE(6), h = buf.readUInt16LE(8);
  let p = 13; const f = buf[10];
  if (f & 0x80) p += 3 * (1 << ((f & 7) + 1));
  const delays = []; let frames = 0, loop = null;
  while (p < buf.length) {
    const b = buf[p++];
    if (b === 0x3B) break;
    if (b === 0x21) {
      const label = buf[p++];
      if (label === 0xF9) { delays.push(buf.readUInt16LE(p + 2)); p += buf[p] + 2; continue; }
      if (label === 0xFF) {
        const size = buf[p], app = buf.toString('ascii', p + 1, p + 1 + size); p += size + 1;
        while (buf[p] !== 0) { const n = buf[p]; if (app.startsWith('NETSCAPE') && n >= 3) loop = buf.readUInt16LE(p + 2); p += n + 1; }
        p++; continue;
      }
      while (buf[p] !== 0) p += buf[p] + 1;
      p++; continue;
    }
    if (b === 0x2C) {
      frames++; const lf = buf[p + 8]; p += 9;
      if (lf & 0x80) p += 3 * (1 << ((lf & 7) + 1));
      p++;
      while (buf[p] !== 0) p += buf[p] + 1;
      p++; continue;
    }
    throw new Error(`unexpected GIF block 0x${b.toString(16)} at ${p - 1}`);
  }
  return { sig, w, h, frames, delaysCs: delays, loop };
}

contrastPass();
const browser = await launch();
try {
  /* ------------------------------------------------------------ posters */
  if (wants('posters')) {
    for (const [w, h, dsf] of [[1080, 1350, 1], [1080, 1080, 1], [1080, 1350, 2]]) {
      const tp = now();
      const { page, errors, external } = await openViz(browser, vizUrl(TEMPLATE, { size: `${w}x${h}`, poster: 1 }), { width: w, height: h, deviceScaleFactor: dsf });
      if (errors.length) throw new Error(`page errors: ${errors.join(' | ')}`);
      if (external.length) throw new Error(`artifact reached the network: ${external.slice(0, 3).join(', ')}`);
      const a = await page.evaluate(() => { window.VIZ.seek(window.VIZ.settled); return window.VIZ.audit(); });
      reportAudit(`poster ${w * dsf}x${h * dsf}`, a, false);
      const file = join(HERE, `poster-${w * dsf}x${h * dsf}.png`);
      writeFileSync(file, await page.screenshot({ clip: { x: 0, y: 0, width: w, height: h }, captureBeyondViewport: false }));
      console.log(`    ${(statSync(file).size / 1024).toFixed(0)} KB  ${file}  (${ms(tp)})`);
      await page.close();
    }
  }

  /* ------------------------------------------------------------- verify */
  if (wants('verify')) {
    for (const [w, h] of [[1080, 1350], [1080, 1080]]) {
      const { page } = await openViz(browser, vizUrl(TEMPLATE, { size: `${w}x${h}`, poster: 1 }), { width: w, height: h });
      const a = await page.evaluate(() => { window.VIZ.seek(window.VIZ.settled); return window.VIZ.audit(); });
      reportAudit(`verify poster ${w}x${h} · education`, a, true);
      await page.close();
    }
    { /* the GIF canvas is the 4:5 layout scaled to 0.593: overlaps only (type floor is set at 1080) */
      const { page } = await openViz(browser, vizUrl(TEMPLATE, { size: '1080x1350', t: 0 }), { width: 640, height: 800 });
      const a = await page.evaluate(() => { window.VIZ.seek(window.VIZ.settled); return window.VIZ.audit(); });
      const ov = a.fail.filter(f => /overlap|clipped|outside/.test(f));
      if (ov.length) ov.forEach(f => bad(`gif canvas: ${f}`)); else console.log('  ✓ gif canvas 640x800: no clipping, no overlap at 0.593×');
      await page.close();
    }
    for (const [w, h] of [[1200, 1000], [390, 844]]) {
      const { page, errors, external } = await openViz(browser, vizUrl(TEMPLATE, {}), { width: w, height: h });
      if (errors.length) throw new Error(`live page errors: ${errors.join(' | ')}`);
      if (external.length) throw new Error(`live page reached the network: ${external.slice(0, 3).join(', ')}`);
      await page.evaluate(() => window.VIZ.seek(window.VIZ.settled));
      const slugs = await page.evaluate(() => window.VIZ.verticals);
      const heights = [];
      for (const s of slugs) {
        const r = await page.evaluate(s => {
          window.VIZ.select(s, { force: true });
          const a = window.VIZ.audit();
          const jump = document.querySelector('#panel .jump');
          const cell = document.getElementById('v-' + s);
          return {
            a, overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
            href: jump && jump.getAttribute('href'), target: jump && jump.getAttribute('target'), intent: jump && jump.dataset.intent,
            pressed: cell.getAttribute('aria-pressed'), others: [...document.querySelectorAll('.cell.l2[aria-pressed="true"]')].length,
            announce: document.getElementById('announce').textContent,
          };
        }, s);
        heights.push(r.a.height);
        if (r.a.fail.length) r.a.fail.slice(0, 8).forEach(f => bad(`live ${w}px ${s}: ${f}`));
        if (r.overflow) bad(`live ${w}px ${s}: horizontal scroll`);
        if (r.href !== POST_URL + '#vertical-' + s || r.target !== '_top' || r.intent !== s) bad(`live ${w}px ${s}: jump link wrong (${r.href}, ${r.target})`);
        if (r.pressed !== 'true' || r.others !== 1) bad(`live ${w}px ${s}: aria-pressed state wrong`);
        if (!r.announce.startsWith(await page.evaluate(s => document.getElementById('v-' + s).querySelector('.cname').textContent, s))) bad(`live ${w}px ${s}: live region not updated`);
      }
      /* keyboard: Tab-reachable cells, Enter opens */
      await page.focus('#v-real-estate'); await page.keyboard.press('Enter');
      await new Promise(r => setTimeout(r, 2300));
      const kb = await page.evaluate(() => window.VIZ.selected);
      if (kb !== 'real-estate') bad(`live ${w}px: Enter on a focused cell did not open it (${kb})`);
      console.log(`  ✓ live ${w}px: 10 verticals opened, audited, jump links (${POST_URL}#vertical-<slug>) + aria-pressed + live region checked, Enter opens a cell · frame height ${Math.min(...heights)}–${Math.max(...heights)}px`);
      await page.close();
    }
  }

  /* ---------------------------------------------------------------- gif */
  if (wants('gif')) {
    const W = Number(arg('w', 640)), H = Number(arg('h', 800));
    const fps = Number(arg('fps', 11)), colors = Number(arg('colors', 128)), holdS = Number(arg('hold', 50));
    const tc = now();
    const { page, errors, external } = await openViz(browser, vizUrl(TEMPLATE, { size: '1080x1350', t: 0 }), { width: W, height: H, deviceScaleFactor: 1 });
    if (errors.length) throw new Error(`page errors @gif: ${errors.join(' | ')}`);
    if (external.length) throw new Error(`artifact reached the network: ${external.slice(0, 3).join(', ')}`);
    const plan = await page.evaluate(n => ({
      wipe: window.VIZ.framePlan(n, { wipe: true }), last: window.VIZ.framePlan(n, { wipe: false }),
      settled: window.VIZ.settled, holdEnd: window.VIZ.timeline.holdEnd,
    }), fps);
    const wipeOnly = plan.wipe.filter(f => f.t > plan.holdEnd);
    /* Opens on the finished poster (the frame previews and thumbnails show), wipes,
       then three renderings — each ends on a 1.5 s hold — then the long still.
       The still is split across the loop point: (hold − 1.5) s at the end + the
       1.5 s opening frame, so after the third hold the poster rests for --hold s. */
    const seq = [{ t: plan.settled, delay: 1500 }, ...wipeOnly, ...plan.wipe, ...plan.wipe, ...plan.last,
                 { t: plan.settled, delay: (holdS - 1.5) * 1000 }];
    const uniq = [...new Set(seq.map(s => s.t))].sort((a, b) => a - b);
    const shots = new Map();
    for (const tt of uniq) {
      await page.evaluate(s => window.VIZ.seek(s), tt);
      shots.set(tt, await page.screenshot({ clip: { x: 0, y: 0, width: W, height: H }, captureBeyondViewport: false }));
    }
    await page.close();
    const secs = a => a.reduce((n, s) => n + s.delay, 0) / 1000;
    console.log(`  captured ${uniq.length} distinct frames at ${W}x${H} in ${ms(tc)}`);
    console.log(`  1.5s opening still + ${secs(wipeOnly).toFixed(2)}s wipe + rendering ${secs(plan.wipe).toFixed(2)}s ×2 + ${secs(plan.last).toFixed(2)}s + ${holdS - 1.5}s = ${secs(seq).toFixed(2)}s loop, ${seq.length} frames`);

    const px = W * H;
    const pickT = [0, 0.12, 0.3, 0.45, 0.6, 0.75, 0.9, 1].map(k => uniq[Math.min(uniq.length - 1, Math.floor(k * (uniq.length - 1)))]);
    if (!pickT.includes(plan.settled)) pickT.push(plan.settled);
    const sample = new Uint8Array(pickT.length * px * 4);
    pickT.forEach((tt, i) => sample.set(new Uint8Array(PNG.sync.read(shots.get(tt)).data), i * px * 4));
    const palette = quantize(sample, Math.min(255, colors), { format: 'rgb565' });
    const transparentIndex = palette.length;
    const tablePalette = [...palette, [0, 0, 0]];
    const indexed = new Map();
    for (const tt of uniq) { indexed.set(tt, applyPalette(new Uint8Array(PNG.sync.read(shots.get(tt)).data), palette, 'rgb565')); shots.delete(tt); }

    const gif = GIFEncoder();
    let prev = null;
    seq.forEach((s, i) => {
      const cur = indexed.get(s.t);
      if (i === 0) { gif.writeFrame(cur, W, H, { delay: s.delay, repeat: 0, palette: tablePalette }); prev = cur; return; }
      const out = new Uint8Array(px);
      for (let p = 0; p < px; p++) out[p] = cur[p] === prev[p] ? transparentIndex : cur[p];
      gif.writeFrame(out, W, H, { delay: s.delay, repeat: 0, transparent: true, transparentIndex, dispose: 1 });
      prev = cur;
    });
    gif.finish();
    const file = join(HERE, `anim-${W}x${H}.gif`);
    writeFileSync(file, gif.bytes());
    const kb = statSync(file).size / 1024;
    const g = parseGif(readFileSync(file));
    const cs = g.delaysCs.reduce((a, b) => a + b, 0);
    const hist = {}; g.delaysCs.forEach(d => { hist[d] = (hist[d] || 0) + 1; });
    console.log(`  ${(kb / 1024).toFixed(2)} MB  ${file}`);
    console.log(`  read back: ${g.sig} ${g.w}x${g.h}, loop count ${g.loop} (0 = forever), ${g.frames} frames, ${(cs / 100).toFixed(2)} s per loop, delays (cs×n): ${Object.entries(hist).map(([d, n]) => `${d}×${n}`).join(' ')}, ${palette.length} colours`);
    if (g.sig !== 'GIF89a' || g.loop !== 0) bad('GIF header or loop extension wrong');
    if (kb > 3072) bad(`GIF over 3 MB (${(kb / 1024).toFixed(2)} MB) — lower --colors or --fps`);
  }

  /* --------------------------------------------------------------- live
     A throwaway parent page on 127.0.0.1 embeds the artifact with ?parent=,
     then: click a vertical → level 3 re-subdivides; click "Read the section" →
     (1) with the listener: the parent receives {type:"viz-intent"} and scrolls;
     (2) without it: target=_top lands the parent on #vertical-<slug>.          */
  if (wants('live')) {
    const PORT0 = Number(arg('port', 5311));
    if (PORT0 >= 5187 && PORT0 <= 5193) throw new Error('ports 5187–5193 are reserved');
    const html = readFileSync(TEMPLATE);
    const SLUGS = ['education', 'financial-services', 'real-estate', 'travel-hospitality', 'professional-services', 'saas-software', 'ecommerce-retail', 'healthcare', 'manufacturing-industrial', 'nonprofit'];
    const parentPage = (port, name, listener) => `<!doctype html><meta charset="utf-8"><title>${name}</title>
      <body style="margin:0;font:16px system-ui">
      <iframe id="viz" src="/viz/?parent=${encodeURIComponent(`http://127.0.0.1:${port}/${name}`)}" style="width:900px;height:1500px;border:0;display:block"></iframe>
      ${SLUGS.map(s => `<section id="vertical-${s}" style="height:900px;border-top:2px solid #000"><h2>${s}</h2></section>`).join('')}
      <script>window.__got=[];${listener ? `addEventListener('message',e=>{ if(!e.data) return; window.__got.push(e.data);
        if(e.data.type==='viz-intent'){ const t=document.getElementById('vertical-'+e.data.intent); if(t){ t.scrollIntoView(); history.replaceState(null,'','#vertical-'+e.data.intent);} }
        if(e.data.type==='viz-height'){ document.getElementById('viz').style.height=e.data.height+'px'; } });` : ''}</script></body>`;
    let port = PORT0, server;
    for (; port < PORT0 + 10; port++) {
      server = createServer((req, res) => {
        const u = new URL(req.url, 'http://127.0.0.1');
        if (u.pathname === '/viz/' || u.pathname === '/viz/index.html') { res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }); return res.end(html); }
        if (u.pathname === '/post.html') { res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }); return res.end(parentPage(port, 'post.html', true)); }
        if (u.pathname === '/bare.html') { res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }); return res.end(parentPage(port, 'bare.html', false)); }
        if (u.pathname === '/feed.html') { res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }); return res.end('<!doctype html><title>feed stand-in</title><a id="go" href="/viz/">open the artifact</a>'); }
        res.writeHead(404); res.end();
      });
      const ok = await new Promise(r => { server.once('error', () => r(false)); server.listen(port, '127.0.0.1', () => r(true)); });
      if (ok) break;
    }
    console.log(`  live: throwaway server on http://127.0.0.1:${port}`);
    try {
      for (const [name, listener] of [['post.html', true], ['bare.html', false]]) {
        const page = await browser.newPage();
        const offsite = [];
        page.on('request', r => { if (!r.url().startsWith(`http://127.0.0.1:${port}/`)) offsite.push(r.url()); });
        await page.setViewport({ width: 1000, height: 900 });
        await page.goto(`http://127.0.0.1:${port}/${name}`, { waitUntil: 'load' });
        const frame = page.frames().find(f => f.url().includes('/viz/'));
        await frame.waitForFunction(() => window.VIZ && document.documentElement.dataset.ready === '1', { timeout: 20000 });
        await frame.click('#v-healthcare');
        await new Promise(r => setTimeout(r, 2400));
        const sel = await frame.evaluate(() => [window.VIZ.selected, document.querySelector('#panel h2').textContent, document.querySelectorAll('.cell.l3').length]);
        if (sel[0] !== 'healthcare' || sel[1] !== 'Healthcare' || sel[2] !== 7) bad(`${name}: clicking Healthcare did not open its level 3 (${sel})`);
        await frame.click('#panel .jump');
        await new Promise(r => setTimeout(r, 900));
        const top = await page.evaluate(() => ({ hash: location.hash, y: Math.round(scrollY), anchor: Math.round(document.getElementById('vertical-healthcare').getBoundingClientRect().top), got: window.__got || [] }));
        const msg = top.got.find(m => m.type === 'viz-intent');
        const hgt = top.got.filter(m => m.type === 'viz-height').pop();
        if (listener && !(msg && msg.intent === 'healthcare')) bad(`${name}: parent did not receive {type:"viz-intent", intent:"healthcare"}`);
        if (top.hash !== '#vertical-healthcare' || Math.abs(top.anchor) > 3) bad(`${name}: parent not at #vertical-healthcare (hash ${top.hash}, anchor top ${top.anchor}px)`);
        if (offsite.length) bad(`${name}: requests left 127.0.0.1: ${offsite.slice(0, 3).join(', ')}`);
        console.log(`  ✓ ${name}${listener ? ' (listener)' : ' (no listener, target=_top fallback)'}: Healthcare opened with 7 level-3 cells; jump → ${top.hash}, anchor at ${top.anchor}px from the top` +
          (listener ? `; message ${JSON.stringify(msg)}; last viz-height ${hgt ? hgt.height : 'none'}px` : ''));
        await page.close();
      }
      /* standalone: a reader who clicks through from a feed arrives with a referrer, and a
         foreign ?parent= may be passed in. Neither may become the fallback. The feed is a
         same-origin stand-in, so the referrer is certain to be present (Chrome strips an
         https referrer on an http page). Only the href is read; nothing is navigated. */
      for (const [label, how] of [['standalone, arriving with a referrer', 'click'], ['standalone, foreign ?parent=', 'param']]) {
        const page = await browser.newPage();
        const offsite = [];
        await page.setRequestInterception(true);
        page.on('request', r => { if (r.url().startsWith(`http://127.0.0.1:${port}/`)) r.continue(); else { offsite.push(r.url()); r.abort('blockedbyclient'); } });
        await page.setViewport({ width: 1000, height: 900 });
        if (how === 'click') {
          await page.goto(`http://127.0.0.1:${port}/feed.html`, { waitUntil: 'load' });
          await Promise.all([page.waitForNavigation({ waitUntil: 'load' }), page.click('#go')]);
        } else {
          await page.goto(`http://127.0.0.1:${port}/viz/?parent=${encodeURIComponent('https://www.linkedin.com/feed/')}`, { waitUntil: 'load' });
        }
        await page.waitForFunction(() => window.VIZ && document.documentElement.dataset.ready === '1', { timeout: 20000 });
        const r = await page.evaluate(() => { window.VIZ.select('healthcare', { force: true }); return { ref: document.referrer, href: document.querySelector('#panel .jump').getAttribute('href') }; });
        const want = POST_URL + '#vertical-healthcare';
        if (r.href !== want) bad(`${label}: fallback is ${r.href}, expected ${want}`);
        if (how === 'click' && !r.ref.endsWith('/feed.html')) bad(`${label}: the referrer was not present (${r.ref || 'empty'}), test proves nothing`);
        if (offsite.length) bad(`${label}: requests left 127.0.0.1: ${offsite.slice(0, 3).join(', ')}`);
        console.log(`  ✓ ${label}${how === 'click' ? ` (document.referrer = ${r.ref})` : ' (linkedin.com)'}: fallback → ${r.href}`);
        await page.close();
      }
    } finally {
      if (server.closeAllConnections) server.closeAllConnections();
      await new Promise(r => server.close(() => r()));
      console.log(`  live: server on ${port} stopped`);
    }
  }
} finally {
  await browser.close();
}
console.log(failures ? `\nFAILED — ${failures} problem(s) · ${ms(t0)}` : `\nall checks passed · ${ms(t0)}`);
process.exit(failures ? 1 : 0);
