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
 * Third-party hosts (fonts, GA4, Turnstile, LinkedIn) are blocked so no analytics
 * hits leave the machine and the run is hermetic.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
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
        placeholders: (document.body.innerText.match(/lorem ipsum|\bTODO\b|\bTBD\b|\[insert|\bFIXME\b|Did you forget to add the page/gi) || []).slice(0, 5),
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
    await page.click('[data-resume-open]');
    await wait(200);
    const open = await page.$eval('#resume-chooser', el => el.open).catch(() => false);
    await page.keyboard.press('Escape');
    await wait(200);
    const closed = await page.$eval('#resume-chooser', el => !el.open).catch(() => false);
    const pdfLinks = await page.$$eval('#resume-chooser a[href$=".pdf"]', links => links.map(a => a.getAttribute('href')));
    record('resume', 'resume dialog opens on click and closes on Escape', open && closed, '');
    record('resume', 'dialog offers the four PDF paths', pdfLinks.length === 4 && pdfLinks.every(h => h.startsWith('/files/')), pdfLinks.join(', '));
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
