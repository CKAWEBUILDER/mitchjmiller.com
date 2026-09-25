#!/usr/bin/env node
/**
 * Browser QA for the site standards (docs/site-standards.md, 2026-09-24), headless Chrome.
 * Requires the static server: node scripts/qa/serve.mjs dist 5193
 *
 *   node scripts/qa/standards.mjs [--base http://127.0.0.1:5193] [--out docs/…/qa/standards.json] [--shots <dir>] [--only <route prefix>]
 *
 * - axe-core (WCAG 2.0/2.1/2.2 A and AA rules) on every manifest route, every declared /viz/
 *   embed and the 404 document, in the light and the dark theme: zero serious or critical.
 * - Themes: system light and system dark each apply before <body> exists (no flash); the toggle
 *   is a keyboard-operable button with aria-pressed that overrides the system, persists across
 *   reloads, follows live system changes only without a stored choice, and still works with
 *   storage blocked; JavaScript off still follows the system and hides the toggle.
 * - Every route at 390 px wide: no horizontal overflow; the toggle stays visible, 44×44.
 * - Declared /viz/ embeds: the intro (longer than five seconds) has a "Skip animation" button
 *   that stops it; reduced motion shows the settled frame with no button (WCAG 2.2.2).
 * - Languages: the suggestion banner appears only when the browser's languages rank the page's
 *   translation first (or that language was chosen before), never redirects, and remembers a
 *   dismissal; the globe picker opens and closes by keyboard and remembers the language chosen;
 *   the Spanish contact form reports in Spanish (mocked Worker).
 * - Every share card referenced by a page serves 200 image/png at 1200×630; every narration
 *   serves 200 audio/mp4, reports the recorded duration and actually plays.
 * Third-party hosts are blocked, as in scripts/qa/browser.mjs.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';

const args = Object.fromEntries(process.argv.slice(2).map((value, index, list) => value.startsWith('--') ? [value.slice(2), list[index + 1]] : []).filter(Boolean));
const base = args.base || 'http://127.0.0.1:5193';
const out = resolve(args.out || 'docs/release-2026-09-24-standards/qa/standards.json');
const shots = args.shots ? resolve(args.shots) : null;
const chrome = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const blocked = /^(https?:\/\/)(fonts\.googleapis\.com|fonts\.gstatic\.com|www\.googletagmanager\.com|www\.google-analytics\.com|analytics\.google\.com|stats\.g\.doubleclick\.net|challenges\.cloudflare\.com|linkedin\.com|www\.linkedin\.com)\//;
const manifest = JSON.parse(readFileSync('docs/implementation-2026-09-11/route-manifest.json', 'utf8'));
const narration = JSON.parse(readFileSync('site/data/narration.json', 'utf8'));
const axePath = createRequire(import.meta.url).resolve('axe-core/axe.min.js');
const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa'];

let routes = [...manifest.routes.map(route => route.path), ...(manifest.embeds || []).map(embed => embed.path), '/no-such-page/'];
if (args.only) routes = routes.filter(route => route.startsWith(args.only));
const results = [];
const record = (scope, check, pass, detail = '') => { results.push({ scope, check, pass, detail }); if (!pass || process.env.VERBOSE) console.log(`${pass ? 'PASS' : 'FAIL'} ${scope} — ${check}${detail ? ` (${detail})` : ''}`); };
const wait = ms => new Promise(r => setTimeout(r, ms));
const puppeteer = (await import('puppeteer-core')).default;
const browser = await puppeteer.launch({ executablePath: chrome, headless: true, args: ['--no-sandbox', '--hide-scrollbars', '--autoplay-policy=no-user-gesture-required'] });
if (shots) mkdirSync(shots, { recursive: true });

async function newPage({ scheme = 'light', width = 1360, height = 900, storage = null, blockStorage = false } = {}) {
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(`pageerror: ${String(error).slice(0, 200)}`));
  page.on('console', message => { if (message.type() === 'error' && !blocked.test(message.location()?.url || '') && !/ERR_FAILED|ERR_BLOCKED_BY_CLIENT|net::|status of 404/.test(message.text())) errors.push(`console: ${message.text().slice(0, 200)}`); });
  await page.setRequestInterception(true);
  page.on('request', request => blocked.test(request.url()) ? request.abort('blockedbyclient') : request.continue());
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: scheme }]);
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  // Record the theme at the moment <body> is created, i.e. before anything can paint.
  await page.evaluateOnNewDocument((stored, block) => {
    if (block) Object.defineProperty(window, 'localStorage', { configurable: true, get() { throw new DOMException('blocked', 'SecurityError'); } });
    else if (stored) { try { localStorage.setItem('mj2-theme', stored); } catch {} }
    new MutationObserver((_, observer) => { if (document.body) { window.__themeAtBody = document.documentElement.getAttribute('data-theme'); observer.disconnect(); } }).observe(document, { childList: true, subtree: true });
  }, storage, blockStorage);
  return { page, errors, context };
}

async function runAxe(page) {
  await page.addScriptTag({ path: axePath });
  return page.evaluate(async tags => {
    const result = await window.axe.run(document, { runOnly: { type: 'tag', values: tags }, iframes: false, resultTypes: ['violations'] });
    return result.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, targets: v.nodes.slice(0, 3).map(n => n.target.join(' ')), summary: v.nodes[0]?.failureSummary?.slice(0, 240) }));
  }, wcagTags);
}

const axeSummary = { light: { serious: 0, critical: 0, other: 0 }, dark: { serious: 0, critical: 0, other: 0 } };
try {
  // 1. axe on every document in both themes, with the theme present before first paint.
  for (const route of routes) {
    for (const scheme of ['light', 'dark']) {
      const { page, errors, context } = await newPage({ scheme });
      const response = await page.goto(`${base}${route}`, { waitUntil: 'networkidle0', timeout: 60000 });
      const expected = route === '/no-such-page/' ? 404 : 200;
      const standalone = route.startsWith('/viz/'); // embeds keep their own palette; the SFC report follows the site theme
      if (!standalone) {
        const theme = await page.evaluate(() => ({ atBody: window.__themeAtBody, now: document.documentElement.getAttribute('data-theme'), bg: getComputedStyle(document.body).backgroundColor }));
        record(`${route}@${scheme}`, `HTTP ${expected} and the ${scheme} theme is set before <body> is parsed`, response?.status() === expected && theme.atBody === scheme && theme.now === scheme, `status ${response?.status()}, at body ${theme.atBody}, now ${theme.now}, body ${theme.bg}`);
      } else record(`${route}@${scheme}`, `HTTP ${expected}`, response?.status() === expected, `status ${response?.status()}`);
      const violations = await runAxe(page);
      const gating = violations.filter(v => v.impact === 'serious' || v.impact === 'critical');
      for (const v of violations) axeSummary[scheme][gating.includes(v) ? v.impact : 'other'] += 1;
      record(`${route}@${scheme}`, 'axe WCAG 2.2 A/AA: zero serious or critical violations', gating.length === 0, gating.map(v => `${v.impact} ${v.id} ×${v.nodes}: ${v.targets.join(' | ')} — ${v.summary}`).join(' ;; ') || `${violations.length} minor/moderate`);
      if (violations.length > gating.length) results.push({ scope: `${route}@${scheme}`, check: 'axe minor/moderate (informational)', pass: true, detail: violations.filter(v => !gating.includes(v)).map(v => `${v.impact} ${v.id} ×${v.nodes}`).join(', ') });
      record(`${route}@${scheme}`, 'no console or page errors', errors.length === 0, errors.slice(0, 3).join(' | '));
      await context.close();
    }
  }

  // 2. 390 px: no horizontal overflow on any route; the theme toggle stays visible at 44×44.
  for (const route of routes) {
    const { page, context } = await newPage({ width: 390, height: 844 });
    await page.goto(`${base}${route}`, { waitUntil: 'networkidle0', timeout: 60000 });
    const m = await page.evaluate(() => { const t = document.querySelector('[data-theme-toggle]'); const r = t?.getBoundingClientRect(); return { sw: document.documentElement.scrollWidth, iw: window.innerWidth, toggle: r ? { w: Math.round(r.width), h: Math.round(r.height), visible: r.width > 0 && getComputedStyle(t).visibility !== 'hidden' && r.right <= window.innerWidth } : null }; });
    record(`${route}@390`, 'no horizontal overflow', m.sw <= m.iw, `scrollWidth ${m.sw} / viewport ${m.iw}`);
    if (m.toggle) record(`${route}@390`, 'theme toggle visible inside the viewport, at least 44×44', m.toggle.visible && m.toggle.w >= 44 && m.toggle.h >= 44, `${m.toggle.w}×${m.toggle.h}`);
    await context.close();
  }

  // Desktop header: every item stays inside the header's content box where the full navigation
  // shows (1281 px and up); Spanish labels run longer, so both languages are measured.
  for (const route of ['/', '/services/', '/blog/search-results-by-intent/', '/es/', '/es/services/', '/es/contact/', '/es/blog/', '/es/blog/gbp-2026-ai-grounding/'].filter(item => routes.includes(item))) {
    for (const width of [1281, 1360, 1500]) {
      const { page, context } = await newPage({ width, height: 800 });
      await page.goto(`${base}${route}`, { waitUntil: 'networkidle0', timeout: 60000 });
      const over = await page.evaluate(() => { const inner = document.querySelector('.ag-header-inner'); const box = inner.getBoundingClientRect(); const items = [...inner.children].filter(el => getComputedStyle(el).display !== 'none'); return Math.round(Math.max(...items.map(el => el.getBoundingClientRect().right)) - box.right); });
      record(`${route}@${width}`, 'desktop header items fit inside the header', over <= 0, `${over}px past the edge`);
      await context.close();
    }
  }

  // 3. Theme behavior on representative templates.
  const themeRoutes = ['/', '/services/', '/blog/search-results-by-intent/', '/case-studies/apple-store-amr/', '/lab/population-workbench/'].filter(route => routes.includes(route));
  for (const route of themeRoutes) {
    {
      const { page, errors, context } = await newPage({ scheme: 'light' });
      await page.goto(`${base}${route}`, { waitUntil: 'networkidle0' });
      const before = await page.$eval('[data-theme-toggle]', el => ({ pressed: el.getAttribute('aria-pressed'), name: el.textContent.trim(), tag: el.tagName }));
      await page.click('[data-theme-toggle]');
      const after = await page.evaluate(() => ({ theme: document.documentElement.getAttribute('data-theme'), pressed: document.querySelector('[data-theme-toggle]').getAttribute('aria-pressed'), stored: localStorage.getItem('mj2-theme'), bg: getComputedStyle(document.body).backgroundColor }));
      record(`${route} toggle`, 'system light: the named button (aria-pressed=false) switches to dark, aria-pressed=true, choice stored', before.tag === 'BUTTON' && before.pressed === 'false' && /Dark theme/.test(before.name) && after.theme === 'dark' && after.pressed === 'true' && after.stored === 'dark' && after.bg !== 'rgb(255, 255, 255)', `${JSON.stringify(before)} → ${JSON.stringify(after)}`);
      if (shots && route === '/') await page.screenshot({ path: join(shots, 'home-dark-1360-fold.png') });
      await page.reload({ waitUntil: 'networkidle0' });
      const persisted = await page.evaluate(() => ({ atBody: window.__themeAtBody, pressed: document.querySelector('[data-theme-toggle]').getAttribute('aria-pressed') }));
      record(`${route} toggle`, 'the choice persists across reloads against the system setting, before first paint', persisted.atBody === 'dark' && persisted.pressed === 'true', JSON.stringify(persisted));
      await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);
      await wait(100);
      record(`${route} toggle`, 'a stored choice ignores later system changes', await page.evaluate(() => document.documentElement.getAttribute('data-theme')) === 'dark', '');
      await page.focus('[data-theme-toggle]');
      await page.keyboard.press('Enter');
      const enter = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
      await page.keyboard.press('Space');
      const space = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
      record(`${route} toggle`, 'keyboard operable (Enter and Space)', enter === 'light' && space === 'dark', `${enter} → ${space}`);
      record(`${route} toggle`, 'no console or page errors', errors.length === 0, errors.slice(0, 3).join(' | '));
      await context.close();
    }
    {
      const { page, context } = await newPage({ scheme: 'dark' });
      await page.goto(`${base}${route}`, { waitUntil: 'networkidle0' });
      const first = await page.evaluate(() => ({ atBody: window.__themeAtBody, pressed: document.querySelector('[data-theme-toggle]').getAttribute('aria-pressed') }));
      if (shots && route === '/blog/search-results-by-intent/') await page.screenshot({ path: join(shots, 'post-dark-1360-fold.png') });
      await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);
      await wait(150);
      const followed = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
      record(`${route} system`, 'system dark: dark before first paint, aria-pressed=true; without a stored choice it follows a live system change', first.atBody === 'dark' && first.pressed === 'true' && followed === 'light', `${JSON.stringify(first)} → ${followed}`);
      await context.close();
    }
    {
      const { page, context } = await newPage({ scheme: 'dark', storage: 'light' });
      await page.goto(`${base}${route}`, { waitUntil: 'networkidle0' });
      record(`${route} system`, 'a stored light choice wins over system dark before first paint', await page.evaluate(() => window.__themeAtBody) === 'light', '');
      await context.close();
      const run = await newPage({ scheme: 'dark', blockStorage: true });
      await run.page.goto(`${base}${route}`, { waitUntil: 'networkidle0' });
      const atBody = await run.page.evaluate(() => window.__themeAtBody);
      await run.page.click('[data-theme-toggle]');
      const toggled = await run.page.evaluate(() => document.documentElement.getAttribute('data-theme'));
      record(`${route} storage`, 'storage blocked: the system theme still applies, the toggle still works, no errors', atBody === 'dark' && toggled === 'light' && run.errors.length === 0, `${atBody} → ${toggled}; ${run.errors.join(' | ')}`);
      await run.context.close();
    }
  }
  if (routes.includes('/services/')) {
    const { page, context } = await newPage({ scheme: 'dark' });
    await page.setJavaScriptEnabled(false);
    await page.goto(`${base}/services/`, { waitUntil: 'load' });
    const m = await page.evaluate(() => ({ bg: getComputedStyle(document.body).backgroundColor, toggle: getComputedStyle(document.querySelector('[data-theme-toggle]')).display }));
    record('/services/ no-js', 'JavaScript off + system dark: dark background, toggle hidden', m.bg === 'rgb(10, 19, 34)' && m.toggle === 'none', JSON.stringify(m));
    await context.close();
  }

  // Embedded infographics: their intro runs longer than five seconds (WCAG 2.2.2), so a visible
  // "Skip animation" button must stop it; under reduced motion there is no intro and no button.
  for (const embed of (manifest.embeds || []).filter(item => routes.includes(item.path))) {
    const { page, errors, context } = await newPage();
    await page.goto(`${base}${embed.path}`, { waitUntil: 'load' });
    const button = await page.waitForFunction(() => [...document.querySelectorAll('button')].find(b => b.textContent.trim() === 'Skip animation'), { timeout: 3000 }).then(() => true).catch(() => false);
    let stopped = false, removed = false;
    if (button) {
      await page.evaluate(() => [...document.querySelectorAll('button')].find(b => b.textContent.trim() === 'Skip animation').click());
      const before = await page.evaluate(() => document.querySelector('svg')?.innerHTML.length + ':' + document.body.innerHTML.length);
      await wait(600);
      const after = await page.evaluate(() => document.querySelector('svg')?.innerHTML.length + ':' + document.body.innerHTML.length);
      stopped = before === after;
      removed = await page.evaluate(() => ![...document.querySelectorAll('button')].some(b => b.textContent.trim() === 'Skip animation'));
    }
    record(`${embed.path} motion`, 'the >5 s intro offers a visible "Skip animation" button that stops it and then goes away', button && stopped && removed, `button ${button}, stopped ${stopped}, removed ${removed}`);
    await context.close();
    const reduced = await newPage();
    await reduced.page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await reduced.page.goto(`${base}${embed.path}`, { waitUntil: 'networkidle0' });
    record(`${embed.path} motion`, 'prefers-reduced-motion: no intro, no skip button', await reduced.page.evaluate(() => ![...document.querySelectorAll('button')].some(b => b.textContent.trim() === 'Skip animation')), '');
    record(`${embed.path} motion`, 'no console or page errors', errors.length === 0 && reduced.errors.length === 0, [...errors, ...reduced.errors].slice(0, 3).join(' | '));
    await reduced.context.close();
  }

  // 5. Languages (runs when the Spanish pilot routes are in the manifest).
  const withLanguages = async (languages, options = {}) => {
    const run = await newPage(options);
    await run.page.evaluateOnNewDocument(list => { Object.defineProperty(navigator, 'languages', { get: () => list }); Object.defineProperty(navigator, 'language', { get: () => list[0] }); }, languages);
    return run;
  };
  const bannerState = page => page.evaluate(() => { const b = document.querySelector('[data-lang-banner]'); return { exists: Boolean(b), visible: Boolean(b && !b.hidden && b.getBoundingClientRect().height > 0), lang: b?.getAttribute('lang'), href: b?.querySelector('a')?.getAttribute('href'), text: b?.querySelector('p')?.textContent, path: location.pathname }; });
  if (routes.includes('/es/services/') && routes.includes('/services/')) {
    {
      const { page, errors, context } = await withLanguages(['es-MX', 'es']);
      await page.goto(`${base}/services/`, { waitUntil: 'networkidle0' });
      await wait(1500);
      const shown = await bannerState(page);
      record('/services/ banner', 'Spanish browser: Spanish banner suggests /es/services/, and the page does not redirect', shown.visible && shown.lang === 'es' && shown.href === '/es/services/' && shown.path === '/services/' && /español/.test(shown.text || ''), JSON.stringify(shown));
      await page.click('[data-lang-dismiss]');
      const stored = await page.evaluate(() => ({ hidden: document.querySelector('[data-lang-banner]').hidden, lang: localStorage.getItem('mj2-lang') }));
      await page.reload({ waitUntil: 'networkidle0' });
      await wait(800);
      const after = await bannerState(page);
      record('/services/ banner', '“No, gracias” hides it and is remembered across reloads; still no redirect', stored.hidden && stored.lang === 'en' && !after.visible && after.path === '/services/', `${JSON.stringify(stored)} → ${JSON.stringify(after)}`);
      record('/services/ banner', 'no console or page errors', errors.length === 0, errors.slice(0, 3).join(' | '));
      await context.close();
    }
    for (const [languages, route, wantVisible, label] of [
      [['en-US', 'en'], '/services/', false, 'English browser on an English page: no banner'],
      [['en-US', 'es'], '/services/', false, 'English ranked above Spanish: no banner'],
      [['es-MX', 'es'], '/es/services/', false, 'Spanish browser on the Spanish page: no banner'],
      [['en-US', 'en'], '/es/services/', true, 'English browser on the Spanish page: English banner suggests /services/'],
      [['es-MX', 'es'], '/about/', false, 'page without a translation: no banner at all'],
    ]) {
      const { page, context } = await withLanguages(languages);
      await page.goto(`${base}${route}`, { waitUntil: 'networkidle0' });
      await wait(600);
      const state = await bannerState(page);
      const ok = state.visible === wantVisible && state.path === route && (!wantVisible || (state.lang === 'en' && state.href === '/services/')) && (route !== '/about/' || !state.exists);
      record(`${route} banner`, label, ok, `${languages.join(',')} → ${JSON.stringify(state)}`);
      await context.close();
    }
    {
      const { page, errors, context } = await withLanguages(['en-US', 'en']);
      await page.goto(`${base}/services/`, { waitUntil: 'networkidle0' });
      await page.focus('[data-lang-picker] summary');
      await page.keyboard.press('Enter');
      const opened = await page.evaluate(() => document.querySelector('[data-lang-picker]').open);
      const items = await page.$$eval('[data-lang-picker] .ag-lang-menu a', links => links.map(a => ({ text: a.textContent.trim(), lang: a.getAttribute('lang'), href: a.getAttribute('href'), current: a.getAttribute('aria-current') })));
      await page.keyboard.press('Escape');
      const closed = await page.evaluate(() => ({ open: document.querySelector('[data-lang-picker]').open, focus: document.activeElement?.matches('[data-lang-picker] summary') }));
      record('/services/ picker', 'globe picker opens with Enter, lists English (current) and Español in their own script, Escape closes and returns focus', opened && items.length === 2 && items[0].text === 'English' && items[0].current === 'true' && items[1].text === 'Español' && items[1].lang === 'es' && items[1].href === '/es/services/' && !closed.open && closed.focus, `${JSON.stringify(items)} ${JSON.stringify(closed)}`);
      await page.click('[data-lang-picker] summary');
      await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle0' }), page.click('[data-lang-picker] a[lang="es"]')]);
      const landed = await page.evaluate(() => ({ path: location.pathname, lang: document.documentElement.lang, stored: localStorage.getItem('mj2-lang') }));
      record('/services/ picker', 'choosing Español opens /es/services/ (lang="es") and remembers the choice', landed.path === '/es/services/' && landed.lang === 'es' && landed.stored === 'es', JSON.stringify(landed));
      await page.goto(`${base}/work/`, { waitUntil: 'networkidle0' });
      const untranslated = await page.$eval('[data-lang-picker] a[lang="es"]', a => ({ href: a.getAttribute('href'), text: a.textContent.trim() }));
      record('/work/ picker', 'on a page without a translation, Español leads to the Spanish home and says so', untranslated.href === '/es/' && /página de inicio/.test(untranslated.text), JSON.stringify(untranslated));
      record('picker', 'no console or page errors', errors.length === 0, errors.slice(0, 3).join(' | '));
      await context.close();
    }
  }
  if (routes.includes('/es/contact/')) {
    const endpoint = 'https://mitchjmiller-api.clearkayakrentalsoahu.workers.dev/contact';
    for (const [status, body, pattern, label] of [[200, { ok: true, id: 'qa' }, /recibí tu mensaje/, '200 ok'], [400, { ok: false, error: 'validation', fields: { email: 'invalid' } }, /Revisa los campos marcados/, '400 validation']]) {
      const { page, context } = await newPage();
      await page.setRequestInterception(true);
      page.removeAllListeners('request');
      page.on('request', request => request.url() === endpoint && request.method() === 'POST' ? request.respond({ status, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify(body) }) : (blocked.test(request.url()) || request.url() === endpoint ? request.abort('blockedbyclient') : request.continue()));
      await page.goto(`${base}/es/contact/`, { waitUntil: 'networkidle0' });
      await page.type('#contact-name', 'QA Robot');
      await page.type('#contact-email', 'qa@example.com');
      await page.select('#contact-topic', 'consulting');
      await page.type('#contact-message', 'Mensaje automático de QA. No es una consulta real.');
      await page.evaluate(() => { const input = document.createElement('input'); input.type = 'hidden'; input.name = 'turnstileToken'; input.value = 'qa-token'; document.getElementById('contact-form').append(input); });
      await page.click('#contact-form button[type=submit]');
      const shown = await page.waitForFunction(p => new RegExp(p).test(document.querySelector('[data-contact-status]')?.textContent || ''), { timeout: 8000 }, pattern.source).then(() => true).catch(() => false);
      const text = await page.$eval('[data-contact-status]', el => el.textContent);
      record('/es/contact/ form', `mocked Worker ${label}: the status message is in Spanish`, shown, text.slice(0, 100));
      await context.close();
    }
  }

  // 4. Share cards over HTTP and narration playback.
  {
    const { page, context } = await newPage();
    await page.goto(`${base}/`, { waitUntil: 'networkidle0' });
    const cards = new Set();
    for (const route of routes) {
      const html = await page.evaluate(async url => (await fetch(url)).text(), `${base}${route}`);
      const image = html.match(/<meta property="og:image" content="https:\/\/mj2\.pro([^"]+)"/)?.[1];
      if (image) cards.add(image); else record(route, 'page declares og:image', false, '');
    }
    const served = await page.evaluate(async list => Promise.all(list.map(async path => { const r = await fetch(path); const b = new Uint8Array(await r.arrayBuffer()); return { path, status: r.status, type: r.headers.get('content-type'), w: (b[16] << 24 | b[17] << 16 | b[18] << 8 | b[19]) >>> 0, h: (b[20] << 24 | b[21] << 16 | b[22] << 8 | b[23]) >>> 0 }; })), [...cards]);
    const bad = served.filter(c => c.status !== 200 || c.type !== 'image/png' || c.w !== 1200 || c.h !== 630);
    record('share cards', `every referenced card serves 200 image/png at 1200×630 (${served.length} cards)`, bad.length === 0 && served.length > 0, bad.slice(0, 5).map(c => `${c.path} ${c.status} ${c.type} ${c.w}×${c.h}`).join(', '));
    await context.close();
  }
  for (const [route, item] of Object.entries(narration.items).filter(([route]) => routes.includes(route))) {
    const { page, errors, context } = await newPage();
    await page.goto(`${base}${route}`, { waitUntil: 'networkidle0' });
    const head = await page.evaluate(async src => { const r = await fetch(src, { method: 'HEAD' }); return { status: r.status, type: r.headers.get('content-type') }; }, item.src);
    const play = await page.evaluate(async () => {
      const audio = document.querySelector('.mj-narration audio');
      if (!audio) return { found: false };
      const label = document.getElementById(audio.getAttribute('aria-labelledby'))?.textContent;
      const preloadAttr = audio.getAttribute('preload');
      audio.muted = true;
      try { await audio.play(); } catch (error) { return { found: true, label, error: String(error) }; }
      const started = Date.now();
      while (audio.currentTime < 0.5 && Date.now() - started < 8000) await new Promise(r => setTimeout(r, 100));
      audio.pause();
      return { found: true, label, preloadAttr, currentTime: audio.currentTime, duration: audio.duration };
    });
    const wanted = item.lang === 'es' ? `Escuchar este artículo (${item.minutes} min)` : `Listen to this article (${item.minutes} min)`;
    record(`${route} audio`, 'narration serves 200 audio/mp4', head.status === 200 && head.type === 'audio/mp4', `${head.status} ${head.type}`);
    record(`${route} audio`, `"${wanted}" (preload="none") plays and its duration matches the record`, play.found && play.preloadAttr === 'none' && play.currentTime >= 0.5 && Math.abs(play.duration - item.seconds) < 1.5 && play.label === wanted, JSON.stringify(play));
    record(`${route} audio`, 'no console or page errors', errors.length === 0, errors.slice(0, 3).join(' | '));
    await context.close();
  }
} finally {
  await browser.close();
}
const failures = results.filter(r => !r.pass);
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, `${JSON.stringify({ generated: new Date().toISOString(), base, documents: routes.length, axe: { version: JSON.parse(readFileSync(join(dirname(axePath), 'package.json'), 'utf8')).version, tags: wcagTags, gate: 'zero serious or critical', violationsByTheme: axeSummary }, checks: results.length, passed: results.length - failures.length, failed: failures.length, failures, results }, null, 2)}\n`);
console.log(`\nStandards QA: ${results.length - failures.length}/${results.length} checks passed over ${routes.length} documents; axe serious+critical light ${axeSummary.light.serious + axeSummary.light.critical}, dark ${axeSummary.dark.serious + axeSummary.dark.critical}`);
process.exitCode = failures.length ? 1 : 0;
