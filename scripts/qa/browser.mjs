#!/usr/bin/env node
/**
 * Headless-Chrome QA for the release candidate (puppeteer-core + local Chrome).
 * Requires the static server: node scripts/qa/serve.mjs dist 5193
 *
 *   node scripts/qa/browser.mjs [--base http://127.0.0.1:5193] [--out docs/redesign-2026-09-14/qa/browser.json] [--shots docs/redesign-2026-09-14/screenshots]
 *
 * Per page and viewport (1360×900, 390×844): HTTP status, console/page errors,
 * horizontal overflow, broken images, placeholder text, full-page screenshot.
 * Hydration: the three lab islands and the workbench island become interactive
 * without errors; a Mermaid study diagram renders to SVG; the resume dialog opens
 * and closes; the contact form pre-fills ?topic=, and its submit handler shows
 * honest messages against a mocked Worker (200 ok, 400 validation, network failure).
 * 2026-09-24 post: both living infographics load in same-origin frames that fit their content,
 * a real click on a mandala sector opens its panel and "Read the section" lands the parent on
 * #intent-<slug>, a journey territory does the same, the parent listener ignores foreign
 * senders, off-site ?parent= values are ignored, JSON-LD parses, posters/GIFs are served.
 * Wave 2 (2026-09-24, four posts): each infographic loads in a fitted same-origin frame, a real
 * click on a sector/title/vertical/stop lands the post on that section, every jump target the
 * embed can produce is a heading in the post, the listener ignores foreign senders, malformed
 * anchors and non-heading targets, the full-screen embed keeps its links on this origin even
 * with an off-site ?parent=, JSON-LD parses, and posters, GIF, card and narration are served.
 * Third-party hosts (fonts, GA4, Turnstile, LinkedIn) are blocked so no analytics
 * hits leave the machine and the run is hermetic.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const args = Object.fromEntries(process.argv.slice(2).map((value, index, list) => value.startsWith('--') ? [value.slice(2), list[index + 1]] : []).filter(Boolean));
const base = args.base || 'http://127.0.0.1:5193';
const out = resolve(args.out || 'docs/redesign-2026-09-14/qa/browser.json');
const shots = resolve(args.shots || 'docs/redesign-2026-09-14/screenshots');
const chrome = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const endpoint = 'https://mitchjmiller-api.clearkayakrentalsoahu.workers.dev/contact';
const blocked = /^(https?:\/\/)(fonts\.googleapis\.com|fonts\.gstatic\.com|www\.googletagmanager\.com|www\.google-analytics\.com|analytics\.google\.com|stats\.g\.doubleclick\.net|challenges\.cloudflare\.com|linkedin\.com|www\.linkedin\.com)\//;

const pages = [
  ['home', '/'], ['services', '/services/'], ['work', '/work/'], ['case-commonspirit', '/case-studies/commonspirit-locations-conversion-engine/'],
  ['case-sfc', '/case-studies/sfc-surf-school/'], ['post-gbp', '/blog/gbp-2026-ai-grounding/'],
  ['note-hermes-mermaid', '/blog/studying/hermes-concepts-field-guide/'], ['lab', '/lab/'],
  ['workbench', '/lab/population-workbench/'], ['workbench-methodology', '/lab/population-workbench/methodology/'],
  ['resume', '/resume/'], ['contact', '/contact/'], ['clients', '/clients/'], ['404', '/no-such-page/'],
  ['post-search-intent', '/blog/search-results-by-intent/'], ['note-pocock-ai-coding', '/blog/studying/pocock-ai-coding-workflow/'],
  ['note-fde', '/blog/studying/fde-1m-ai-job/'], ['note-pocock-agentic', '/blog/studying/pocock-agentic-workflow/'],
  // Wave 2 (2026-09-24): four posts with living infographics.
  ['post-llm-ads', '/blog/optimizing-for-ads-in-free-llm-answers/'], ['post-titles', '/blog/growth-title-market/'],
  ['post-b2b', '/blog/b2b-vs-b2c-by-vertical/'], ['post-roles', '/blog/statistician-vs-data-scientist/'],
  // Site standards deploy 2: the Spanish pilot.
  ['es-home', '/es/'], ['es-services', '/es/services/'], ['es-contact', '/es/contact/'], ['es-blog', '/es/blog/'], ['es-post-gbp', '/es/blog/gbp-2026-ai-grounding/'],
];
const viewports = [[1360, 900], [390, 844]];
const results = [];
const record = (scope, check, pass, detail = '') => { results.push({ scope, check, pass, detail }); console.log(`${pass ? 'PASS' : 'FAIL'} ${scope} — ${check}${detail ? ` (${detail})` : ''}`); };
const wait = ms => new Promise(r => setTimeout(r, ms));

const puppeteer = (await import('puppeteer-core')).default;
const browser = await puppeteer.launch({ executablePath: chrome, headless: true, args: ['--no-sandbox', '--hide-scrollbars'] });
mkdirSync(shots, { recursive: true });

async function newPage(mock, expectedStatus = null) {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(`pageerror: ${String(error).slice(0, 200)}`));
  // Intentional non-200 responses (the 404 document itself, a mocked 400 from the Worker) are not defects.
  page.on('console', message => { if (message.type() === 'error' && !blocked.test(message.location()?.url || '') && !/ERR_FAILED|ERR_BLOCKED_BY_CLIENT|net::/.test(message.text()) && !(expectedStatus && new RegExp(`status of ${expectedStatus}\\b`).test(message.text()))) errors.push(`console: ${message.text().slice(0, 200)}`); });
  await page.setRequestInterception(true);
  page.on('request', request => {
    const url = request.url();
    if (mock && url === endpoint && request.method() === 'POST') return mock(request);
    if (blocked.test(url) || url === endpoint) return request.abort('blockedbyclient');
    request.continue();
  });
  return { page, errors };
}

try {
  for (const [name, path] of pages) {
    for (const [width, height] of viewports) {
      const { page, errors } = await newPage(null, name === '404' ? 404 : null);
      await page.setViewport({ width, height, deviceScaleFactor: 1 });
      const response = await page.goto(`${base}${path}`, { waitUntil: 'networkidle0', timeout: 60000 });
      const status = response?.status();
      const expected = name === '404' ? 404 : 200;
      record(`${name}@${width}`, `HTTP ${expected}`, status === expected, `status ${status}`);
      if (name === 'workbench') { await page.$eval('.wb', el => el.scrollIntoView()); await page.waitForSelector('[data-workbench-state="ready"]', { timeout: 60000 }).catch(() => {}); await page.evaluate(() => window.scrollTo(0, 0)); }
      if (name === 'lab') await page.waitForFunction(() => document.querySelectorAll('astro-island[ssr]').length === 0, { timeout: 20000 }).catch(() => {});
      if (name === 'note-hermes-mermaid') await page.waitForSelector('.parity-diagram svg', { timeout: 30000 }).catch(() => {});
      // Scroll through the page so lazy-loaded images are fetched before the full-page capture, then return to the top.
      await page.evaluate(async () => { const step = window.innerHeight; for (let y = 0; y < document.documentElement.scrollHeight; y += step) { window.scrollTo({ top: y, behavior: 'instant' }); await new Promise(r => setTimeout(r, 60)); } window.scrollTo({ top: 0, behavior: 'instant' }); });
      // Wait for in-flight images, but never longer than 10 s (a never-loading image is reported as broken below, not hung on).
      await page.evaluate(() => Promise.race([Promise.all([...document.images].filter(img => !img.complete).map(img => new Promise(r => { img.onload = img.onerror = r; }))), new Promise(r => setTimeout(r, 10000))])).catch(() => {});
      await wait(300);
      const metrics = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth,
        brokenImages: [...document.images].filter(img => img.getAttribute('src') && img.complete && img.naturalWidth === 0).map(img => img.getAttribute('src')),
        // TODO/TBD/FIXME are uppercase developer markers; the Spanish word "todo" is content.
        placeholders: [...(document.body.innerText.match(/lorem ipsum|\[insert|Did you forget to add the page/gi) || []), ...(document.body.innerText.match(/\bTODO\b|\bTBD\b|\bFIXME\b/g) || [])].slice(0, 5),
        h1: document.querySelectorAll('h1').length,
      }));
      record(`${name}@${width}`, 'no horizontal overflow', metrics.scrollWidth <= metrics.innerWidth, `scrollWidth ${metrics.scrollWidth} / viewport ${metrics.innerWidth}`);
      record(`${name}@${width}`, 'no broken images', metrics.brokenImages.length === 0, metrics.brokenImages.slice(0, 4).join(', '));
      record(`${name}@${width}`, 'no placeholder/developer text', metrics.placeholders.length === 0, metrics.placeholders.join(' | '));
      record(`${name}@${width}`, 'exactly one h1 in the DOM', metrics.h1 === 1, `${metrics.h1}`);
      record(`${name}@${width}`, 'no console or page errors', errors.length === 0, errors.slice(0, 3).join(' | '));
      const file = join(shots, `${name}-${width}.png`);
      await page.screenshot({ path: file, fullPage: true });
      await page.screenshot({ path: join(shots, `${name}-${width}-fold.png`), fullPage: false });
      results.push({ scope: `${name}@${width}`, check: 'screenshot (full page + above the fold)', pass: true, detail: file.replace(`${process.cwd()}/`, '') });
      await page.close();
    }
  }

  // 2026-09-24 post: living infographics in same-origin frames and the viz-intent jump contract.
  {
    const postPath = '/blog/search-results-by-intent/';
    const slugs = ['informational', 'commercial', 'transactional', 'navigational', 'local'];
    const landed = (page, slug) => page.waitForFunction(s => location.hash === `#intent-${s}` && Math.abs(document.getElementById(`intent-${s}`).getBoundingClientRect().top - 110) < 60, { timeout: 5000 }, slug).then(() => true).catch(() => false);
    for (const [width, height] of viewports) {
      const scope = `post-search-intent@${width}`;
      const { page, errors } = await newPage();
      await page.setViewport({ width, height, deviceScaleFactor: 1 });
      await page.goto(`${base}${postPath}`, { waitUntil: 'networkidle0', timeout: 60000 });
      await page.evaluate(async () => { for (const f of document.querySelectorAll('iframe')) { f.scrollIntoView(); await new Promise(r => setTimeout(r, 500)); } window.scrollTo(0, 0); });
      const frameFor = part => page.frames().find(f => f.url().includes(part));
      const mandala = frameFor('/viz/search-results-by-intent-mandala/'), journey = frameFor('/viz/search-results-by-intent-journey/');
      const readyM = mandala ? await mandala.waitForFunction(() => window.VIZ && document.querySelectorAll('path.hit').length === 5, { timeout: 20000 }).then(() => true).catch(() => false) : false;
      const readyJ = journey ? await journey.waitForFunction(() => document.documentElement.dataset.ready === '1' && document.querySelectorAll('a[aria-label^="Jump to the"]').length === 5, { timeout: 20000 }).then(() => true).catch(() => false) : false;
      record(scope, 'both living infographics load in same-origin frames', readyM && readyJ, `mandala ${readyM}, journey ${readyJ}`);
      await wait(600);
      const fit = await page.evaluate(() => [...document.querySelectorAll('iframe')].map(f => ({ frame: Math.round(f.getBoundingClientRect().height), body: Math.ceil(f.contentDocument.body.getBoundingClientRect().height), sw: f.contentDocument.documentElement.scrollWidth, cw: f.contentDocument.documentElement.clientWidth })));
      record(scope, 'frames fit their content with no horizontal overflow inside', fit.length === 2 && fit.every(f => Math.abs(f.frame - (f.body + 2)) <= 2 && f.sw <= f.cw), fit.map(f => `${f.frame}px for ${f.body}px, ${f.sw}/${f.cw}`).join(' · '));
      // Real click on the "local" sector: find an on-screen point that hits the sector in the frame and the frame in the page.
      const iframeM = await page.$('iframe[src^="/viz/search-results-by-intent-mandala/"]');
      await page.evaluate(el => window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 100), iframeM);
      await wait(300);
      const box = await iframeM.boundingBox();
      const point = await mandala.evaluate((ox, oy, vh) => {
        const hit = document.querySelectorAll('path.hit')[4];
        const r = hit.getBoundingClientRect();
        for (let y = r.top + 4; y < r.bottom; y += 6) for (let x = r.left + 4; x < r.right; x += 6) {
          if (oy + y > 110 && oy + y < vh - 10 && document.elementFromPoint(x, y) === hit) return { x, y };
        }
        return null;
      }, box.x + 1, box.y + 1, height);
      if (point) await page.mouse.click(box.x + 1 + point.x, box.y + 1 + point.y);
      await wait(400);
      const panel = await mandala.evaluate(() => { const p = document.getElementById('panel'); const j = p && p.querySelector('.jump'); return { open: Boolean(p && !p.hidden), href: j ? j.href : null, img: p && p.querySelector('.shot img, .shot svg') ? p.querySelector('.shot img, .shot svg').tagName : null, cap: p?.querySelector('.cap')?.textContent || '' }; });
      record(scope, 'a real click on a mandala sector opens its panel', Boolean(point) && panel.open, point ? `clicked at ${Math.round(point.x)},${Math.round(point.y)} in frame` : 'no clickable point found');
      record(scope, 'panel shows the labelled representative rendering and a same-origin jump link', panel.href === `${base}${postPath}#intent-local` && /Representative rendering/.test(panel.cap) && !/Captured/.test(panel.cap), `${panel.href} · ${panel.img} · ${panel.cap.slice(0, 70)}`);
      if (panel.open) { const jump = await mandala.$('#panel .jump'); await jump.click(); }
      record(scope, '“Read the local section” lands the parent on #intent-local below the sticky header', await landed(page, 'local'), await page.evaluate(() => `${location.hash} top=${Math.round(document.getElementById('intent-local').getBoundingClientRect().top)}`));
      // Journey territory: real click on the transactional card.
      const territory = await journey.$('a[aria-label="Jump to the TRANSACTIONAL section"]');
      const tHref = territory ? await journey.evaluate(a => a.href.baseVal ?? a.getAttribute('href'), territory) : null;
      if (territory) { await territory.scrollIntoView(); await wait(200); await territory.click(); }
      record(scope, 'a journey territory click lands the parent on #intent-transactional', tHref === `${base}${postPath}#intent-transactional` && await landed(page, 'transactional'), `${tHref}`);
      // Listener only: a message from an embedded frame scrolls; a message from the page itself or a malformed intent does not.
      await page.evaluate(() => { window.scrollTo(0, 0); history.replaceState(null, '', location.pathname); });
      await journey.evaluate(() => window.parent.postMessage({ type: 'viz-intent', intent: 'navigational' }, '*'));
      const listened = await landed(page, 'navigational');
      await page.evaluate(() => { window.scrollTo(0, 0); history.replaceState(null, '', location.pathname); window.postMessage({ type: 'viz-intent', intent: 'commercial' }, '*'); });
      await journey.evaluate(() => window.parent.postMessage({ type: 'viz-intent', intent: '<img src=x>' }, '*'));
      await wait(800);
      const ignored = await page.evaluate(() => location.hash === '' && window.scrollY < 50);
      record(scope, 'parent listener honors only its own /viz/ frames and valid intents', listened && ignored, `frame message landed ${listened}; foreign/malformed ignored ${ignored}`);
      if (width === viewports[0][0]) {
        const ld = await page.evaluate(() => [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => { try { const d = JSON.parse(s.textContent); return (d['@graph'] || [d]).map(n => n['@type']); } catch { return ['INVALID']; } }).flat());
        record('post-search-intent', 'JSON-LD parses: Article, BreadcrumbList and FAQPage', !ld.includes('INVALID') && ['Article', 'BreadcrumbList', 'FAQPage'].every(t => ld.includes(t)), ld.join(', '));
        const assets = await page.evaluate(async () => Promise.all(['mandala', 'journey'].flatMap(v => ['anim-640x800.gif', 'poster-1080x1350.png', 'poster-1080x1080.png', 'poster-2160x2700.png'].map(async f => { const u = `/viz/search-results-by-intent-${v}/${f}`; const r = await fetch(u); return `${u} ${r.status} ${r.headers.get('content-type')}`; }))));
        record('post-search-intent', 'GIFs and posters are served (200, image types)', assets.every(a => / 200 image\/(gif|png)$/.test(a)), assets.filter(a => !/ 200 image\//.test(a)).join(', ') || `${assets.length} files`);
      }
      record(scope, 'no console or page errors (post and frames)', errors.length === 0, errors.slice(0, 3).join(' | '));
      await page.close();
    }
    // Full-screen versions: render, fit the viewport, and point "read the section" at the post; off-site ?parent= is ignored.
    for (const [name, path] of [['viz-mandala', '/viz/search-results-by-intent-mandala/'], ['viz-journey', '/viz/search-results-by-intent-journey/']]) {
      for (const [width, height] of viewports) {
        const { page, errors } = await newPage();
        await page.setViewport({ width, height, deviceScaleFactor: 1 });
        const response = await page.goto(`${base}${path}?parent=https%3A%2F%2Fevil.example%2Fphish%2F`, { waitUntil: 'networkidle0', timeout: 60000 });
        await page.waitForFunction(() => document.querySelector('svg#viz')?.childElementCount > 0, { timeout: 20000 }).catch(() => {});
        await wait(500);
        const links = name === 'viz-mandala'
          ? await page.evaluate(s => { window.VIZ.selectIntent(s); return [document.querySelector('#panel .jump')?.href]; }, 'commercial')
          : await page.evaluate(() => [...document.querySelectorAll('a[aria-label^="Jump to the"]')].map(a => a.href.baseVal ?? a.getAttribute('href')));
        const m = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth, robots: document.querySelector('meta[name="robots"]')?.content }));
        record(`${name}@${width}`, 'HTTP 200, renders, no horizontal overflow, noindex', response?.status() === 200 && m.sw <= m.iw && /noindex/.test(m.robots || ''), `status ${response?.status()}, ${m.sw}/${m.iw}, robots ${m.robots}`);
        record(`${name}@${width}`, 'jump links target the post on this origin even with an off-site ?parent=', links.length > 0 && links.every(h => h && h.startsWith(`${base}${postPath}#intent-`)), links.slice(0, 2).join(', '));
        record(`${name}@${width}`, 'no console or page errors', errors.length === 0, errors.slice(0, 3).join(' | '));
        await page.screenshot({ path: join(shots, `${name}-${width}.png`), fullPage: true });
        await page.close();
      }
    }
  }

  // Wave 2 (2026-09-24): one living infographic per post, each with its own jump contract.
  {
    const wave2 = [
      { name: 'llm-ads', post: '/blog/optimizing-for-ads-in-free-llm-answers/', viz: '/viz/llm-ads-mandala/', kind: 'wheel', hits: 5, pick: 1, anchor: 'assistant-google-ai-mode', extra: ['ads-in-free-llm-answers-data-mandala-1200x630.png'], audio: 'optimizing-for-ads-in-free-llm-answers' },
      { name: 'titles', post: '/blog/growth-title-market/', viz: '/viz/growth-title-market/', kind: 'wheel', hits: 10, slug: 'director-of-seo', anchor: 'title-director-of-seo', extra: [], audio: 'growth-title-market' },
      { name: 'b2b', post: '/blog/b2b-vs-b2c-by-vertical/', viz: '/viz/b2b-vs-b2c-by-vertical/', kind: 'cells', slug: 'saas-software', anchor: 'vertical-saas-software', extra: [], audio: 'b2b-vs-b2c-by-vertical' },
      { name: 'roles', post: '/blog/statistician-vs-data-scientist/', viz: '/viz/statistician-vs-data-scientist/', kind: 'stops', label: 'Stop 2, pay', anchor: 'role-pay', extra: [], audio: 'statistician-vs-data-scientist' },
    ];
    const declared = new Map((JSON.parse(readFileSync('docs/implementation-2026-09-11/route-manifest.json', 'utf8')).embeds || []).map(e => [e.path, e.anchors || []]));
    const ready = { wheel: n => window.VIZ && document.querySelectorAll('path.hit').length === n, cells: () => document.documentElement.dataset.ready === '1' && document.querySelectorAll('article.cell.l2[role="button"]').length === 10, stops: () => document.documentElement.dataset.ready === '1' && window.VIZ && window.VIZ.stops.length > 0 };
    // Every jump target the embed can produce, read through its own API (the panel link or the stop links).
    const allTargets = frame => frame.evaluate(() => {
      const V = window.VIZ, read = () => document.querySelector('#panel .jump')?.href;
      if (V.selectAssistant) { const out = V.assistants.map(s => (V.selectAssistant(s), read())); V.selectAssistant(null); return out; }
      if (V.selectTitle) { const out = V.titles.map(s => (V.selectTitle(s), read())); V.selectTitle(null); return out; }
      if (V.verticals) { const first = V.selected; const out = V.verticals.map(s => (V.select(s), read())); V.select(first); return out; }
      return [...document.querySelectorAll('svg a[target="_top"]')].map(a => a.href.baseVal ?? a.getAttribute('href'));
    });
    const settle = async frame => { await frame.evaluate(() => [...document.querySelectorAll('button')].find(b => b.textContent.trim() === 'Skip animation')?.click()); await wait(300); };
    const landed = (page, id) => page.waitForFunction(a => location.hash === `#${a}` && Math.abs(document.getElementById(a).getBoundingClientRect().top - 110) < 60, { timeout: 6000 }, id).then(() => true).catch(() => false);
    for (const v of wave2) {
      for (const [width, height] of viewports) {
        const scope = `post-${v.name}@${width}`;
        const { page, errors } = await newPage();
        await page.setViewport({ width, height, deviceScaleFactor: 1 });
        await page.goto(`${base}${v.post}`, { waitUntil: 'networkidle0', timeout: 60000 });
        const iframe = await page.$(`iframe[src^="${v.viz}"]`);
        await iframe.scrollIntoView(); await wait(800);
        const frame = page.frames().find(f => f.url().includes(v.viz));
        const ok = frame ? await frame.waitForFunction(ready[v.kind], { timeout: 20000 }, v.hits).then(() => true).catch(() => false) : false;
        record(scope, 'the living infographic loads in a same-origin frame', ok, frame ? frame.url().replace(base, '') : 'no frame');
        if (!ok) { await page.close(); continue; }
        await settle(frame); await wait(600);
        const fit = await page.evaluate(src => { const f = document.querySelector(`iframe[src^="${src}"]`); return { frame: Math.round(f.getBoundingClientRect().height), body: Math.ceil(f.contentDocument.body.getBoundingClientRect().height), sw: f.contentDocument.documentElement.scrollWidth, cw: f.contentDocument.documentElement.clientWidth }; }, v.viz);
        record(scope, 'the frame fits its content with no horizontal overflow inside', Math.abs(fit.frame - (fit.body + 2)) <= 2 && fit.sw <= fit.cw, `${fit.frame}px for ${fit.body}px, ${fit.sw}/${fit.cw}`);
        const targets = await allTargets(frame);
        const want = declared.get(v.viz) || [];
        const ids = targets.map(h => (h || '').split('#')[1]);
        const present = await page.evaluate(list => list.map(id => { const el = document.getElementById(id); return Boolean(el && /^H[2-4]$/.test(el.tagName) && el.closest('.prose')); }), ids);
        record(scope, 'every jump target is a heading in this post, on this origin, and the manifest declares the same anchors', targets.length > 0 && targets.every(h => h && h.startsWith(`${base}${v.post}#`)) && present.every(Boolean) && [...new Set(ids)].sort().join() === [...want].sort().join(), `${targets.length} targets, ${new Set(ids).size} anchors: ${[...new Set(ids)].join(' ')}`);
        // Real click on one sector / title / vertical / stop, then its "Read the section" link.
        await page.evaluate(() => { window.scrollTo(0, 0); history.replaceState(null, '', location.pathname); });
        await page.evaluate(el => window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 100), iframe); await wait(300);
        let clicked = false, href = null;
        if (v.kind === 'wheel') {
          const box = await iframe.boundingBox();
          const index = v.pick ?? await frame.evaluate(s => window.VIZ.titles.indexOf(s), v.slug);
          // Scroll the sector into the viewport, then find a point that hits it in the frame and the frame in the page.
          await frame.evaluate(i => document.querySelectorAll('path.hit')[i].scrollIntoView({ block: 'center' }), index); await wait(400);
          const b2 = await iframe.boundingBox();
          const point = await frame.evaluate((i, oy, vh) => { const hit = document.querySelectorAll('path.hit')[i]; const r = hit.getBoundingClientRect(); for (let y = r.top + 4; y < r.bottom; y += 5) for (let x = r.left + 4; x < r.right; x += 5) if (oy + y > 110 && oy + y < vh - 10 && document.elementFromPoint(x, y) === hit) return { x, y }; return null; }, index, b2.y + 1, height);
          if (point) { await page.mouse.click(b2.x + 1 + point.x, b2.y + 1 + point.y); clicked = true; }
          await wait(500);
          href = await frame.evaluate(() => { const p = document.getElementById('panel'); return p && !p.hidden ? p.querySelector('.jump')?.href || null : null; });
          record(scope, 'a real click on a sector opens its panel with a same-origin jump link', clicked && Boolean(box) && href === `${base}${v.post}#${v.anchor}`, `${point ? `clicked at ${Math.round(point.x)},${Math.round(point.y)} in frame` : 'no clickable point'} · ${href}`);
          const jump = await frame.$('#panel .jump');
          if (jump) { await jump.scrollIntoView(); await wait(200); await jump.click(); }
        } else if (v.kind === 'cells') {
          const cell = await frame.$(`#v-${v.slug}`);
          if (cell) { await cell.scrollIntoView(); await wait(200); await cell.click(); clicked = true; }
          await wait(600);
          href = await frame.evaluate(() => document.querySelector('#panel .jump')?.href || null);
          const pressed = await frame.evaluate(s => document.getElementById(`v-${s}`)?.getAttribute('aria-pressed'), v.slug);
          record(scope, 'a real click on a vertical selects it and points the panel link at its section', clicked && pressed === 'true' && href === `${base}${v.post}#${v.anchor}`, `aria-pressed ${pressed} · ${href}`);
          const jump = await frame.$('#panel .jump');
          if (jump) { await jump.scrollIntoView(); await wait(200); await jump.click(); }
        } else {
          const stop = await frame.$(`svg a[aria-label^="${v.label}"]`);
          href = stop ? await frame.evaluate(a => a.href.baseVal ?? a.getAttribute('href'), stop) : null;
          record(scope, 'the stop is a real link to its section on this origin', href === `${base}${v.post}#${v.anchor}`, `${href}`);
          // Click a point that hits this stop's own shapes (its box can overlap the road and other stops).
          if (stop) { await stop.scrollIntoView(); await wait(300); }
          const b3 = await iframe.boundingBox();
          const point = stop ? await frame.evaluate((a, oy, vh) => { const r = a.getBoundingClientRect(); for (let y = r.top + 2; y < r.bottom; y += 3) for (let x = r.left + 2; x < r.right; x += 3) if (oy + y > 110 && oy + y < vh - 10 && document.elementFromPoint(x, y)?.closest('a') === a) return { x, y }; return null; }, stop, b3.y + 1, height) : null;
          if (point) { await page.mouse.click(b3.x + 1 + point.x, b3.y + 1 + point.y); clicked = true; }
        }
        record(scope, `the click lands the post on #${v.anchor} below the sticky header`, clicked && await landed(page, v.anchor), await page.evaluate(a => `${location.hash} top=${Math.round(document.getElementById(a)?.getBoundingClientRect().top)}`, v.anchor));
        // Listener: a frame message with a valid anchor scrolls; the page's own message, a malformed anchor or a non-heading target does not.
        await page.evaluate(() => { window.scrollTo(0, 0); history.replaceState(null, '', location.pathname); });
        const other = want.find(a => a !== v.anchor) || v.anchor;
        await frame.evaluate(a => window.parent.postMessage({ type: 'viz-intent', intent: 'qa', anchor: a }, '*'), other);
        const listened = await landed(page, other);
        await page.evaluate(() => { window.scrollTo(0, 0); history.replaceState(null, '', location.pathname); });
        await page.evaluate(a => window.postMessage({ type: 'viz-intent', intent: 'qa', anchor: a }, '*'), other);
        await frame.evaluate(() => { window.parent.postMessage({ type: 'viz-intent', intent: 'qa', anchor: '<img src=x>' }, '*'); window.parent.postMessage({ type: 'viz-intent', intent: 'qa', anchor: 'main-content' }, '*'); });
        await wait(900);
        const ignored = await page.evaluate(() => location.hash === '' && window.scrollY < 50);
        record(scope, 'the listener honors its own frame and ignores the page, malformed anchors and non-heading targets', listened && ignored, `frame message landed ${listened}; others ignored ${ignored}`);
        if (width === viewports[0][0]) {
          const ld = await page.evaluate(() => [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => { try { const d = JSON.parse(s.textContent); return (d['@graph'] || [d]).map(n => n['@type']); } catch { return ['INVALID']; } }).flat());
          record(`post-${v.name}`, 'JSON-LD parses: Article, BreadcrumbList and FAQPage', !ld.includes('INVALID') && ['Article', 'BreadcrumbList', 'FAQPage'].every(t => ld.includes(t)), ld.join(', '));
          const assets = await page.evaluate(async list => Promise.all(list.map(async u => { const r = await fetch(u); return `${u} ${r.status} ${r.headers.get('content-type')}`; })), [...['anim-640x800.gif', 'poster-1080x1350.png', 'poster-1080x1080.png', 'poster-2160x2700.png', ...v.extra].map(f => `${v.viz}${f}`), `/audio/blog/${v.audio}.m4a`]);
          record(`post-${v.name}`, 'GIF, posters, card and narration are served (200, image/audio types)', assets.every(a => / 200 (image\/(gif|png)|audio\/mp4)$/.test(a)), assets.filter(a => !/ 200 (image|audio)\//.test(a)).join(', ') || `${assets.length} files`);
          const listen = await page.evaluate(() => { const a = document.querySelector('audio'); return a ? { src: a.querySelector('source')?.getAttribute('src') || a.getAttribute('src'), label: (a.closest('[aria-label]')?.getAttribute('aria-label') || a.parentElement?.textContent || '').trim().slice(0, 60) } : null; });
          record(`post-${v.name}`, 'the "Listen to this article" audio element points at the narration', Boolean(listen && listen.src === `/audio/blog/${v.audio}.m4a`), JSON.stringify(listen));
        }
        record(scope, 'no console or page errors (post and frame)', errors.length === 0, errors.slice(0, 3).join(' | '));
        await page.screenshot({ path: join(shots, `post-${v.name}-${width}-embed.png`), fullPage: false });
        await page.close();
      }
      // Full-screen version: renders, fits, noindex, and keeps "read the section" on this origin with an off-site ?parent=.
      for (const [width, height] of viewports) {
        const scope = `viz-${v.name}@${width}`;
        const { page, errors } = await newPage();
        await page.setViewport({ width, height, deviceScaleFactor: 1 });
        const response = await page.goto(`${base}${v.viz}?parent=https%3A%2F%2Fevil.example%2Fphish%2F`, { waitUntil: 'networkidle0', timeout: 60000 });
        const main = page.mainFrame();
        await main.waitForFunction(ready[v.kind], { timeout: 20000 }, v.hits).catch(() => {});
        await wait(500);
        const links = await allTargets(main).catch(() => []);
        const m = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth, robots: document.querySelector('meta[name="robots"]')?.content }));
        record(scope, 'HTTP 200, renders, no horizontal overflow, noindex', response?.status() === 200 && m.sw <= m.iw && /noindex/.test(m.robots || ''), `status ${response?.status()}, ${m.sw}/${m.iw}, robots ${m.robots}`);
        record(scope, 'jump links target the post on this origin even with an off-site ?parent=', links.length > 0 && links.every(h => h && h.startsWith(`${base}${v.post}#`)), links.slice(0, 2).join(', '));
        record(scope, 'no console or page errors', errors.length === 0, errors.slice(0, 3).join(' | '));
        await page.screenshot({ path: join(shots, `viz-${v.name}-${width}.png`), fullPage: true });
        await page.close();
      }
    }
  }

  // Agency shell (2026-09-14): marquee motion, pause on hover, reduced-motion fallback, nav dropdown, green CTA, mobile menu.
  for (const [name, path] of [['home', '/'], ['services', '/services/']]) {
    const { page, errors } = await newPage();
    await page.setViewport({ width: 1360, height: 900 });
    await page.goto(`${base}${path}`, { waitUntil: 'networkidle0', timeout: 60000 });
    const marquee = await page.evaluate(() => {
      const track = document.querySelector('.ag-marquee-track');
      const style = track && getComputedStyle(track);
      const lists = document.querySelectorAll('.ag-marquee-track ul');
      return { animation: style?.animationName, state: style?.animationPlayState, lists: lists.length, hiddenDuplicate: lists[1]?.getAttribute('aria-hidden') === 'true', items: document.querySelectorAll('.ag-marquee-track li').length, labelled: Boolean(document.querySelector('.ag-marquee[aria-labelledby]')) };
    });
    record(name, 'brand marquee animates (CSS only, duplicated track, aria-hidden copy, labelled section)', marquee.animation === 'ag-marquee' && marquee.state === 'running' && marquee.lists === 2 && marquee.hiddenDuplicate && marquee.items >= 10 && marquee.labelled, `${marquee.animation} ${marquee.state}, ${marquee.items} items`);
    await page.hover('.ag-marquee-track li');
    await wait(100);
    record(name, 'marquee pauses on hover', await page.$eval('.ag-marquee-track', el => getComputedStyle(el).animationPlayState) === 'paused', '');
    const cta = await page.$eval('.ag-header .ag-button', el => ({ bg: getComputedStyle(el).backgroundColor, color: getComputedStyle(el).color, text: el.textContent.trim(), href: el.getAttribute('href') }));
    record(name, 'header “Let’s talk” button is green with white text and links to /contact/', cta.bg === 'rgb(20, 128, 74)' && cta.color === 'rgb(255, 255, 255)' && cta.href === '/contact/' && /Let’s talk/.test(cta.text), `${cta.bg} ${cta.color} ${cta.href}`);
    const navLabels = await page.$$eval('.ag-nav > ul > li > a', links => links.map(link => link.textContent.trim()));
    record(name, 'primary nav order Services · Products · Work · Lab · Writing · About', navLabels.join(' · ') === 'Services · Products · Work · Lab · Writing · About', navLabels.join(' · '));
    await page.hover('.ag-nav .ag-has-drop > a');
    await wait(100);
    record(name, 'nav dropdown opens on hover', await page.$eval('.ag-nav .ag-has-drop .ag-drop', el => getComputedStyle(el).display === 'block'), '');
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await wait(100);
    const reduced = await page.evaluate(() => { const track = document.querySelector('.ag-marquee-track'); const duplicate = document.querySelector('.ag-marquee-track ul[aria-hidden="true"]'); return { animation: getComputedStyle(track).animationName, duplicate: getComputedStyle(duplicate).display, overflow: document.documentElement.scrollWidth <= window.innerWidth }; });
    record(name, 'prefers-reduced-motion: marquee static, duplicate hidden, no overflow', reduced.animation === 'none' && reduced.duplicate === 'none' && reduced.overflow, `${reduced.animation} / duplicate ${reduced.duplicate}`);
    record(name, 'no console or page errors (shell checks)', errors.length === 0, errors.slice(0, 3).join(' | '));
    await page.close();
  }
  {
    const { page, errors } = await newPage();
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto(`${base}/`, { waitUntil: 'networkidle0', timeout: 60000 });
    const desktopHidden = await page.$eval('.ag-nav', el => getComputedStyle(el).display === 'none');
    await page.click('.ag-menu summary');
    await wait(150);
    const menu = await page.evaluate(() => ({ open: document.querySelector('.ag-menu').open, links: document.querySelectorAll('.ag-menu-panel a').length, cta: document.querySelector('.ag-menu-panel .ag-button')?.getAttribute('href'), width: document.documentElement.scrollWidth, viewport: window.innerWidth }));
    record('home@390', 'mobile menu opens with the full navigation and the contact button; no overflow', desktopHidden && menu.open && menu.links >= 12 && menu.cta === '/contact/' && menu.width <= menu.viewport, `${menu.links} links, scrollWidth ${menu.width}`);
    await page.screenshot({ path: join(shots, 'home-390-menu-open.png'), fullPage: false });
    record('home@390', 'no console or page errors (menu)', errors.length === 0, errors.slice(0, 3).join(' | '));
    await page.close();
  }
  // Hydration and interaction checks at desktop width.
  {
    const { page, errors } = await newPage();
    await page.setViewport({ width: 1360, height: 900 });
    await page.goto(`${base}/lab/`, { waitUntil: 'networkidle0', timeout: 60000 });
    const hydrated = await page.waitForFunction(() => document.querySelectorAll('astro-island').length === 3 && document.querySelectorAll('astro-island[ssr]').length === 0, { timeout: 20000 }).then(() => true).catch(() => false);
    record('lab', 'three lab islands hydrate (astro-island loses ssr)', hydrated, '');
    const toggles = await page.$$('.lab-experiment button[aria-pressed="false"]');
    let toggled = 0;
    for (const button of toggles.slice(0, 3)) { await button.click(); await wait(150); if (await button.evaluate(el => el.getAttribute('aria-pressed')) === 'true') toggled++; }
    record('lab', 'lab controls respond to clicks (aria-pressed toggles)', toggled > 0, `${toggled} of ${Math.min(3, toggles.length)} clicked controls became pressed`);
    record('lab', 'no console or page errors after interaction', errors.length === 0, errors.slice(0, 3).join(' | '));
    await page.close();
  }
  {
    const { page, errors } = await newPage();
    await page.setViewport({ width: 1360, height: 900 });
    await page.goto(`${base}/lab/population-workbench/`, { waitUntil: 'networkidle0', timeout: 60000 });
    await page.$eval('.wb', el => el.scrollIntoView());
    const ready = await page.waitForSelector('[data-workbench-state="ready"]', { timeout: 60000 }).then(() => true).catch(() => false);
    record('workbench', 'workbench island hydrates to data-workbench-state="ready"', ready, '');
    const before = await page.$eval('[data-testid="people-count"]', el => el.textContent.trim()).catch(() => '');
    await page.click('[data-testid="chip-employment-Employed"]').catch(() => {});
    await wait(400);
    const after = await page.$eval('[data-testid="people-count"]', el => el.textContent.trim()).catch(() => '');
    record('workbench', 'filter changes the weighted count', Boolean(before) && before !== after, `${before} → ${after}`);
    record('workbench', 'no console or page errors', errors.length === 0, errors.slice(0, 3).join(' | '));
    await page.close();
  }
  {
    const { page, errors } = await newPage();
    await page.setViewport({ width: 1360, height: 900 });
    await page.goto(`${base}/blog/studying/hermes-concepts-field-guide/`, { waitUntil: 'networkidle0', timeout: 60000 });
    const svg = await page.waitForSelector('.parity-diagram svg', { timeout: 30000 }).then(() => true).catch(() => false);
    const sourceKept = await page.$eval('.study-content .mermaid', el => el.textContent.trim().length > 20).catch(() => false);
    record('note-hermes-mermaid', 'Mermaid diagram renders to SVG with the source kept in a details element', svg && sourceKept, '');
    record('note-hermes-mermaid', 'no console or page errors', errors.length === 0, errors.slice(0, 3).join(' | '));
    await page.close();
  }
  {
    const { page, errors } = await newPage();
    await page.setViewport({ width: 1360, height: 900 });
    await page.goto(`${base}/resume/`, { waitUntil: 'networkidle0', timeout: 60000 });
    // The resume chooser and the four PDFs were retired on 2026-09-25; /resume/ is a transfer page.
    const transfer = await page.evaluate(() => ({
      h1: document.querySelectorAll('main h1').length,
      chooser: document.querySelectorAll('#resume-chooser, [data-resume-open]').length,
      pdfLinks: document.querySelectorAll('a[href$=".pdf"]').length,
      linkedin: [...document.querySelectorAll('main a[href]')].some(a => /linkedin\.com\/in\//.test(a.href)),
    }));
    record('resume', 'transfer page: one h1, a LinkedIn link, no chooser and no PDF links', transfer.h1 === 1 && transfer.linkedin && transfer.chooser === 0 && transfer.pdfLinks === 0, JSON.stringify(transfer));
    record('resume', 'no console or page errors', errors.length === 0, errors.slice(0, 3).join(' | '));
    await page.close();
  }
  // Contact form: pre-fill and mocked submissions.
  const fill = async page => {
    await page.type('#contact-name', 'QA Robot');
    await page.type('#contact-email', 'qa@example.com');
    await page.select('#contact-topic', 'population-simulation');
    await page.type('#contact-message', 'Automated release QA message. Not a real inquiry.');
    await page.evaluate(() => { const input = document.createElement('input'); input.type = 'hidden'; input.name = 'turnstileToken'; input.value = 'qa-token'; document.getElementById('contact-form').append(input); });
  };
  const submitWith = async (mock, label, expectedPattern, mockStatus = null) => {
    const { page, errors } = await newPage(mock, mockStatus);
    await page.setViewport({ width: 1360, height: 900 });
    await page.goto(`${base}/contact/?topic=population-simulation`, { waitUntil: 'networkidle0', timeout: 60000 });
    const prefilled = await page.$eval('#contact-topic', el => el.value);
    if (label === '200 ok') record('contact', '?topic=population-simulation pre-fills the topic select', prefilled === 'population-simulation', prefilled);
    await fill(page);
    await page.click('#contact-form button[type=submit]');
    await page.waitForFunction(pattern => new RegExp(pattern).test(document.querySelector('[data-contact-status]')?.textContent || ''), { timeout: 10000 }, expectedPattern).catch(() => {});
    const status = await page.$eval('[data-contact-status]', el => ({ text: el.textContent, hidden: el.hidden, kind: el.dataset.kind }));
    record('contact', `mocked Worker ${label}: honest message shown`, !status.hidden && new RegExp(expectedPattern).test(status.text), `${status.kind}: ${status.text.slice(0, 100)}`);
    if (label === '400 validation') record('contact', 'validation errors mark the field aria-invalid', await page.$eval('#contact-email', el => el.getAttribute('aria-invalid') === 'true'), '');
    if (label === '200 ok') record('contact', 'form resets after success', await page.$eval('#contact-message', el => el.value === ''), '');
    record('contact', `no console or page errors (${label})`, errors.length === 0, errors.slice(0, 3).join(' | '));
    await page.close();
  };
  await submitWith(request => request.respond({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify({ ok: true, id: 'qa' }) }), '200 ok', 'message was received');
  await submitWith(request => request.respond({ status: 400, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify({ ok: false, error: 'validation', fields: { email: 'invalid' } }) }), '400 validation', 'check the highlighted fields', 400);
  await submitWith(request => request.abort('failed'), 'network failure', 'could not be sent');
  {
    const { page } = await newPage();
    await page.setJavaScriptEnabled(false);
    await page.goto(`${base}/contact/`, { waitUntil: 'load', timeout: 60000 });
    const formHidden = await page.$eval('#contact-form', el => getComputedStyle(el).display === 'none');
    const mailto = await page.$$eval('a[href^="mailto:"]', links => links.length);
    record('contact', 'JavaScript off: form hidden via noscript style, mailto links remain', formHidden && mailto >= 2, `${mailto} mailto links`);
    await page.close();
  }
} finally {
  await browser.close();
}
const failures = results.filter(r => !r.pass);
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, `${JSON.stringify({ generated: new Date().toISOString(), base, checks: results.length, passed: results.length - failures.length, failed: failures.length, failures, results }, null, 2)}\n`);
console.log(`\nBrowser QA: ${results.length - failures.length}/${results.length} checks passed`);
process.exitCode = failures.length ? 1 : 0;
