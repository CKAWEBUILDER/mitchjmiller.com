#!/usr/bin/env node
/**
 * Build-time share cards (docs/site-standards.md "Share cards"). Runs on dist/ after
 * scripts/finalize-parity.mjs, so every route, including routes added later, gets its card:
 *
 * 1. Documents rendered by site/layouts/AgencyLayout.astro carry the full share tag set plus a
 *    transient <meta name="mj2:card" content="{json}"> marker. The card is rendered from that
 *    spec and the marker is removed.
 * 2. Standalone documents (the byte-preserved SFC report, the declared /viz/ embeds) get the
 *    missing share tags inserted before </head>; their bodies are never touched.
 * 3. Every card is rendered from the one template scripts/share-card.html at 1200×630 in headless
 *    Chrome (CHROME_PATH or the macOS default), written to dist/og/<route>.png and size-checked.
 *
 *   node scripts/share-cards.mjs            (env PARITY_DIST, CHROME_PATH)
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { decodeHTML } from 'entities';
import { loadTs, root } from './lib/load-ts.mjs';
import { attr, metaTags, shareMeta } from './lib/html.mjs';

const dist = resolve(root, process.env.PARITY_DIST || 'dist');
const chrome = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const manifest = JSON.parse(readFileSync(join(root, 'docs/implementation-2026-09-11/route-manifest.json'), 'utf8'));
const share = await loadTs(`export * from './site/lib/share.ts';`);
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)]);
const esc = value => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const routeOf = file => file === join(dist, '404.html') ? '/404.html' : file.slice(dist.length).replace(/index\.html$/, '');
const failures = [];
const cards = new Map();
let markers = 0, injected = 0;
for (const file of walk(dist).filter(path => path.endsWith('.html'))) {
  const route = routeOf(file);
  let html = readFileSync(file, 'utf8');
  const marker = html.match(/<meta name="mj2:card" content="([^"]*)"\s*\/?>/);
  if (marker) {
    const spec = JSON.parse(decodeHTML(marker[1]));
    html = html.replace(marker[0], '');
    markers++;
    cards.set(share.cardPath(route), { ...spec, route });
    writeFileSync(file, html);
    continue;
  }
  // Standalone document: add only the tags it lacks, before </head>.
  const embed = (manifest.embeds || []).find(item => item.path === route);
  const standalone = embed || route === '/case-studies/sfc-surf-school/';
  if (!standalone) { failures.push(`${route}: no share-card marker (not rendered by AgencyLayout) and not a declared standalone document`); continue; }
  const present = shareMeta(html);
  const title = present['og:title']?.[0] || decodeHTML(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '').trim();
  let description = present['og:description']?.[0] || attr(metaTags(html).find(tag => /name="description"/i.test(tag)) || '', 'content');
  if (embed && !description) {
    const host = readFileSync(join(dist, embed.embeddedIn, 'index.html'), 'utf8');
    description = `Interactive infographic from the mj2.pro post “${share.cardTitleFor(shareMeta(host)['og:title']?.[0] || embed.embeddedIn)}”.`;
  }
  const { image, alt, locale, spec } = share.shareFor(route, title);
  const url = `${share.origin}${route}`;
  const wanted = [
    ['property', 'og:site_name', 'Mitchell Miller'], ['property', 'og:title', title], ['property', 'og:description', description],
    ['property', 'og:url', url], ['property', 'og:type', embed ? 'website' : 'article'], ['property', 'og:locale', locale],
    ['property', 'og:image', image], ['property', 'og:image:width', '1200'], ['property', 'og:image:height', '630'],
    ['property', 'og:image:type', 'image/png'], ['property', 'og:image:alt', alt],
    ['name', 'twitter:card', 'summary_large_image'], ['name', 'twitter:title', title], ['name', 'twitter:description', description],
    ['name', 'twitter:image', image], ['name', 'twitter:image:alt', alt],
  ].filter(([, key]) => !present[key]);
  const tags = wanted.map(([kind, key, value]) => `<meta ${kind}="${key}" content="${esc(value)}">`).join('\n');
  html = html.replace(/<\/head>/i, `${tags}\n</head>`);
  writeFileSync(file, html);
  injected++;
  cards.set(share.cardPath(route), spec);
}

// Render every card from the one template.
const puppeteer = (await import('puppeteer-core')).default;
const browser = await puppeteer.launch({ executablePath: chrome, headless: true, args: ['--no-sandbox', '--hide-scrollbars', '--force-color-profile=srgb', '--font-render-hinting=none'] });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(join(root, 'scripts/share-card.html')).href, { waitUntil: 'load' });
  for (const [path, spec] of [...cards].sort(([a], [b]) => a.localeCompare(b))) {
    let poster;
    if (spec.poster) {
      const posterFile = join(dist, spec.poster);
      if (!existsSync(posterFile)) { failures.push(`${spec.route}: declared poster ${spec.poster} is missing from dist`); continue; }
      poster = pathToFileURL(posterFile).href;
    }
    const result = await page.evaluate(data => window.renderCard(data), { title: spec.title, section: spec.section, poster, lang: spec.lang });
    if (!result.fits) failures.push(`${spec.route}: title does not fit the card even at ${result.size}px: ${spec.title}`);
    const out = join(dist, path);
    mkdirSync(dirname(out), { recursive: true });
    const png = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: 1200, height: 630 } });
    writeFileSync(out, png);
    const bytes = readFileSync(out);
    if (bytes.readUInt32BE(16) !== 1200 || bytes.readUInt32BE(20) !== 630) failures.push(`${path}: rendered ${bytes.readUInt32BE(16)}×${bytes.readUInt32BE(20)}, expected 1200×630`);
  }
} finally {
  await browser.close();
}

console.log(`Share cards: ${cards.size} rendered at 1200×630 (${markers} layout documents, ${injected} standalone documents given share tags).`);
if (failures.length) { console.error(failures.map(value => `  - ${value}`).join('\n')); process.exitCode = 1; }
