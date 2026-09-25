#!/usr/bin/env node
/**
 * Site-standards verifier (docs/site-standards.md, 2026-09-24). Runs after verify-agency.mjs on
 * the built dist/ and fails on:
 *  - share cards: any HTML document missing a required Open Graph / Twitter tag, a card that is
 *    not a local PNG or JPG of exactly 1200×630 under 5 MB, twitter:image ≠ og:image, og:url ≠
 *    canonical, any reference to the headshot (by name or by bytes), or a leftover mj2:card marker;
 *  - themes: a shell document without the pre-paint theme script or the aria-pressed toggle,
 *    the two dark-token blocks in site/styles/standards.css differing, or a dark text pair
 *    below WCAG AA (4.5:1);
 *  - narration: a published post (English archive + src/lib, and Spanish translations) without
 *    its audio file, player ("Listen to this article (N min)", controls, preload="none") and
 *    current record in site/data/narration.json (text hash equal to the post's text today);
 *  - languages: <html lang> not matching the path, a canonical page without its hreflang set
 *    (self = canonical, the translation when one exists, x-default → English) or with a target
 *    that is not built or does not link back, og:locale:alternate out of step with the
 *    translations, sitemap alternates different from the page's, a shell page without the globe
 *    picker (native names, no flags), a suggestion banner where no translation exists (or none
 *    where one does), or any location change in the language script (suggest, never redirect).
 *
 *   node scripts/verify-standards.mjs           (env PARITY_DIST, STANDARDS_REPORT_PATH)
 */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { decodeHTML } from 'entities';
import { root } from './lib/load-ts.mjs';
import { attr, headOf, shareMeta } from './lib/html.mjs';
import { audioPathFor, loadPosts, narrationText, readManifest, routeFor, sha256 } from './lib/narration.mjs';

const dist = resolve(root, process.env.PARITY_DIST || 'dist');
const origin = 'https://mj2.pro';
const failures = [];
const checks = {};
const fail = (scope, message) => failures.push(`${scope}: ${message}`);
const tick = key => { checks[key] = (checks[key] || 0) + 1; };
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)]);
const routeOf = file => file === join(dist, '404.html') ? '/404.html' : file.slice(dist.length).replace(/index\.html$/, '');
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const imageSize = bytes => {
  if (bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return { type: 'png', width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
  if (bytes[0] === 0xff && bytes[1] === 0xd8) {
    for (let i = 2; i < bytes.length - 9;) {
      if (bytes[i] !== 0xff) { i++; continue; }
      const marker = bytes[i + 1];
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) return { type: 'jpeg', width: bytes.readUInt16BE(i + 7), height: bytes.readUInt16BE(i + 5) };
      i += 2 + bytes.readUInt16BE(i + 2);
    }
  }
  return null;
};

// Headshot files by bytes, so a renamed copy is caught too.
const headshotHashes = new Set(['public/images/headshot.png', 'baseline/public/images/headshot.png'].filter(path => existsSync(join(root, path))).map(path => hash(readFileSync(join(root, path)))));

// 1. Share cards on every HTML document.
const required = ['og:site_name', 'og:title', 'og:description', 'og:url', 'og:type', 'og:locale', 'og:image', 'og:image:width', 'og:image:height', 'og:image:alt', 'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image', 'twitter:image:alt'];
const htmlFiles = walk(dist).filter(file => file.endsWith('.html'));
const cardUse = new Map();
for (const file of htmlFiles) {
  const route = routeOf(file);
  const html = readFileSync(file, 'utf8');
  const meta = shareMeta(html);
  tick('shareDocuments');
  if (/name="mj2:card"/.test(html)) fail(route, 'share-card marker left in the output');
  for (const key of required) {
    if (!meta[key]?.length) fail(route, `missing ${key}`);
    else if (meta[key].length > 1) fail(route, `duplicate ${key}`);
    else if (!meta[key][0].trim()) fail(route, `empty ${key}`);
  }
  if (meta['twitter:card']?.[0] !== 'summary_large_image') fail(route, `twitter:card is ${meta['twitter:card']?.[0]}, expected summary_large_image`);
  if (meta['og:image:width']?.[0] !== '1200' || meta['og:image:height']?.[0] !== '630') fail(route, 'og:image:width/height must declare 1200×630');
  const image = meta['og:image']?.[0] || '';
  if (meta['twitter:image']?.[0] !== image) fail(route, 'twitter:image differs from og:image');
  const shareValues = Object.entries(meta).flatMap(([, values]) => values);
  if (shareValues.some(value => /headshot/i.test(value))) { fail(route, 'a share tag references the headshot'); tick('headshotShareImages'); }
  const lang = html.match(/<html\b[^>]*\blang="([^"]+)"/i)?.[1] || '';
  const expectedLocale = lang.startsWith('es') ? 'es_MX' : 'en_US';
  if (meta['og:locale']?.[0] !== expectedLocale) fail(route, `og:locale ${meta['og:locale']?.[0]} does not match <html lang="${lang}">`);
  const canonical = [...headOf(html).matchAll(/<link\b[^>]*rel="canonical"[^>]*>/gi)].map(match => attr(match[0], 'href'))[0];
  const expectedUrl = canonical || `${origin}${route}`;
  if (meta['og:url']?.[0] !== expectedUrl) fail(route, `og:url ${meta['og:url']?.[0]} ≠ ${expectedUrl}`);
  let url;
  try { url = new URL(image); } catch { fail(route, `og:image is not an absolute URL: ${image}`); continue; }
  if (url.origin !== origin) { fail(route, `og:image is not on ${origin}: ${image}`); continue; }
  const file2 = join(dist, decodeURIComponent(url.pathname));
  if (!existsSync(file2) || !statSync(file2).isFile()) { fail(route, `og:image file missing: ${url.pathname}`); continue; }
  const bytes = readFileSync(file2);
  const size = imageSize(bytes);
  if (!size) fail(route, `og:image is not a PNG or JPEG: ${url.pathname}`);
  else if (size.width !== 1200 || size.height !== 630) fail(route, `og:image is ${size.width}×${size.height}, expected 1200×630: ${url.pathname}`);
  if (bytes.length >= 5 * 1024 * 1024) fail(route, `og:image is ${bytes.length} bytes (limit 5 MB)`);
  if (headshotHashes.has(hash(bytes))) { fail(route, 'og:image is the headshot'); tick('headshotShareImages'); }
  cardUse.set(url.pathname, (cardUse.get(url.pathname) || 0) + 1);
  tick('shareCardsOk');
}
for (const [path, uses] of cardUse) if (uses > 1) fail(path, `card shared by ${uses} documents (every page gets its own card)`);

// 2. Themes: pre-paint script and toggle on every shell document; identical dark blocks; dark contrast.
const css = readFileSync(join(root, 'site/styles/standards.css'), 'utf8');
const block = pattern => {
  const start = css.search(pattern);
  if (start < 0) return null;
  const open = css.indexOf('{', start);
  let depth = 0, end = open;
  for (; end < css.length; end++) { if (css[end] === '{') depth++; else if (css[end] === '}' && --depth === 0) break; }
  return css.slice(open + 1, end);
};
const declarations = text => Object.fromEntries([...(text || '').matchAll(/(--[\w-]+|color-scheme)\s*:\s*([^;]+);/g)].map(match => [match[1], match[2].trim()]));
const mediaDark = declarations(block(/:root:not\(\[data-theme="light"\]\)\s*\{/));
const explicitDark = declarations(block(/:root\[data-theme="dark"\]\s*\{/));
if (!Object.keys(mediaDark).length || JSON.stringify(mediaDark) !== JSON.stringify(explicitDark)) fail('standards.css', 'the system-dark and explicit-dark token blocks differ');
else tick('darkTokenBlocksIdentical');
const luminance = hex => { const channel = value => { const c = parseInt(value, 16) / 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; return 0.2126 * channel(hex.slice(1, 3)) + 0.7152 * channel(hex.slice(3, 5)) + 0.0722 * channel(hex.slice(5, 7)); };
const contrast = (a, b) => { const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x); return (l1 + 0.05) / (l2 + 0.05); };
const darkPairs = [];
for (const fg of ['--ag-text', '--ag-heading', '--ag-muted', '--ag-green-text', '--mj-prose-body', '--mj-prose-muted', '--mj-inline-muted', '--mj-inline-blue']) {
  for (const bg of ['--ag-bg', '--ag-surface', '--ag-tint', '--ag-tint-2', '--mj-prose-code-bg']) {
    const [f, b] = [explicitDark[fg], explicitDark[bg]];
    if (!/^#[0-9a-f]{6}$/i.test(f || '') || !/^#[0-9a-f]{6}$/i.test(b || '')) { fail('standards.css', `dark token ${!f ? fg : bg} missing or not #rrggbb`); continue; }
    const ratio = Number(contrast(f, b).toFixed(2));
    darkPairs.push({ fg, bg, ratio });
    if (ratio < 4.5) fail('dark theme', `${fg} ${f} on ${bg} ${b} = ${ratio}:1 < 4.5:1`);
  }
}
const sfc = join(dist, 'case-studies/sfc-surf-school/index.html');
if (existsSync(sfc) && !/localStorage\.getItem\('mj2-theme'\)[\s\S]*setAttribute\('data-theme'/.test(headOf(readFileSync(sfc, 'utf8')))) fail('/case-studies/sfc-surf-school/', 'pre-paint theme script missing (the report follows the stored site theme)');
for (const file of htmlFiles) {
  const route = routeOf(file);
  const html = readFileSync(file, 'utf8');
  if (!/<header class="ag-header">/.test(html)) continue;
  tick('themedDocuments');
  const head = headOf(html);
  if (!/localStorage\.getItem\('mj2-theme'\)[\s\S]*setAttribute\('data-theme'/.test(head)) fail(route, 'pre-paint theme script missing from <head>');
  const toggle = html.match(/<button\b[^>]*data-theme-toggle[^>]*>([\s\S]*?)<\/button>/)?.[0] || '';
  if (!/aria-pressed="(true|false)"/.test(toggle) || !/type="button"/.test(toggle)) fail(route, 'theme toggle button with aria-pressed missing');
  else if (!/class="ag-sr-only">[^<]{3,}</.test(toggle) && !/aria-label="[^"]{3,}"/.test(toggle)) fail(route, 'theme toggle has no accessible name');
}

// 3. Narration for every published post, in every language it is published in.
const narration = readManifest();
const posts = await loadPosts();
const expectedRoutes = new Set();
for (const [lang, list] of Object.entries(posts)) {
  for (const post of list) {
    const route = routeFor(lang, post.slug);
    expectedRoutes.add(route);
    const item = narration.items[route];
    const scope = `${route} (narration)`;
    if (!item) { fail(scope, `no narration; run: npm run narrate -- ${lang === 'es' ? '--lang es ' : ''}${post.slug}`); continue; }
    if (item.src !== audioPathFor(lang, post.slug)) fail(scope, `audio path ${item.src} is not ${audioPathFor(lang, post.slug)}`);
    const file = join(dist, item.src);
    if (!existsSync(file)) { fail(scope, `audio file missing from dist: ${item.src}`); continue; }
    const bytes = readFileSync(file);
    if (bytes.subarray(4, 8).toString('latin1') !== 'ftyp') fail(scope, 'audio is not an MP4/M4A container');
    if (bytes.length !== item.bytes) fail(scope, `audio is ${bytes.length} bytes, record says ${item.bytes}`);
    if (item.channels !== 1 || item.bitRate < 40000 || item.bitRate > 56000) fail(scope, `audio must be mono ~48 kbps (record: ${item.channels} ch, ${item.bitRate} bps)`);
    const text = narrationText({ title: post.title, html: post.html, lang });
    if (item.textSha256 !== sha256(text)) fail(scope, `stale: the post text changed after narration; run: npm run narrate -- ${lang === 'es' ? '--lang es ' : ''}${post.slug}`);
    const page = join(dist, route, 'index.html');
    if (!existsSync(page)) { fail(scope, 'post page missing'); continue; }
    const html = readFileSync(page, 'utf8');
    const audio = html.match(/<audio\b[^>]*>[\s\S]*?<\/audio>/)?.[0] || '';
    const label = decodeHTML(html.match(new RegExp(`<p class="mj-narration-label" id="([^"]+)">([^<]+)</p>`))?.[2] || '');
    const labelId = html.match(/<p class="mj-narration-label" id="([^"]+)">/)?.[1];
    const wantedLabel = lang === 'es' ? `Escuchar este artículo (${item.minutes} min)` : `Listen to this article (${item.minutes} min)`;
    if (!audio) fail(scope, 'no <audio> player on the page');
    else {
      if (!/\scontrols(\s|>|=)/.test(audio) || !/preload="none"/.test(audio)) fail(scope, 'player needs controls and preload="none"');
      if (!audio.includes(`<source src="${item.src}" type="audio/mp4"`)) fail(scope, 'player source does not point at the narration');
      if (!labelId || !audio.includes(`aria-labelledby="${labelId}"`)) fail(scope, 'player is not labelled by the visible label');
    }
    if (label !== wantedLabel) fail(scope, `label "${label}" ≠ "${wantedLabel}"`);
    const firstAudio = html.indexOf('<audio'), body = html.indexOf('class="prose');
    if (firstAudio < 0 || body < 0 || firstAudio > body) fail(scope, 'player is not near the top (before the article body)');
    tick(`narrated_${lang}`);
  }
}
for (const route of Object.keys(narration.items)) if (!expectedRoutes.has(route)) fail(`${route} (narration)`, 'record for a route that is not a published post');

// 4. Languages: hreflang, <html lang>, og:locale:alternate, sitemap alternates, picker, banner.
const manifestJson = JSON.parse(readFileSync(join(root, 'docs/implementation-2026-09-11/route-manifest.json'), 'utf8'));
const spanishOf = new Map(manifestJson.routes.filter(route => route.lang === 'es' && route.translationOf).map(route => [route.translationOf, route.path]));
const englishOf = new Map([...spanishOf].map(([en, es]) => [es, en]));
const expectedSet = route => { const en = englishOf.get(route) || route; const es = spanishOf.get(en); return [['en', en], ...(es ? [['es', es]] : []), ['x-default', en]].map(([lang, path]) => `${lang}=${origin}${path}`).sort(); };
const hreflangOf = html => [...headOf(html).matchAll(/<link\b[^>]*rel="alternate"[^>]*>/gi)].map(match => ({ lang: attr(match[0], 'hreflang'), href: attr(match[0], 'href') })).filter(link => link.lang);
const pageSets = new Map();
for (const file of htmlFiles) {
  const route = routeOf(file);
  const html = readFileSync(file, 'utf8');
  const isEmbed = (manifestJson.embeds || []).some(embed => embed.path === route);
  const lang = html.match(/<html\b[^>]*\blang="([^"]+)"/i)?.[1];
  const wantLang = route.startsWith('/es/') ? 'es' : 'en';
  if (lang !== wantLang) fail(route, `<html lang="${lang}"> should be "${wantLang}"`);
  if (route === '/404.html' || isEmbed) continue; // not canonical pages: no hreflang
  const canonical = [...headOf(html).matchAll(/<link\b[^>]*rel="canonical"[^>]*>/gi)].map(match => attr(match[0], 'href'))[0];
  if (canonical !== `${origin}${route}`) continue; // hreflang belongs on canonical URLs only
  const links = hreflangOf(html);
  const got = links.map(link => `${link.lang}=${link.href}`).sort();
  const want = expectedSet(route);
  pageSets.set(route, got);
  if (JSON.stringify(got) !== JSON.stringify(want)) { fail(route, `hreflang set ${got.join(' ')} ≠ ${want.join(' ')}`); continue; }
  for (const link of links) {
    const target = join(dist, new URL(link.href).pathname, 'index.html');
    if (!existsSync(target)) { fail(route, `hreflang ${link.lang} points to a page that is not built: ${link.href}`); continue; }
    const back = hreflangOf(readFileSync(target, 'utf8')).some(item => item.href === `${origin}${route}`);
    if (!back) fail(route, `hreflang ${link.lang} → ${link.href} does not link back`);
  }
  const counterpart = spanishOf.get(route) || englishOf.get(route);
  const alternate = shareMeta(html)['og:locale:alternate'] || [];
  if (counterpart ? alternate.length !== 1 || alternate[0] !== (wantLang === 'es' ? 'en_US' : 'es_MX') : alternate.length) fail(route, `og:locale:alternate ${alternate.join(',') || 'none'} out of step with the translations`);
  const banner = html.match(/<aside class="ag-lang-banner"[^>]*>/)?.[0];
  if (counterpart && (!banner || !/\shidden(\s|>|=)/.test(banner) || !banner.includes(`data-suggest-lang="${wantLang === 'es' ? 'en' : 'es'}"`))) fail(route, 'translation exists but the hidden suggestion banner is missing or wrong');
  if (!counterpart && banner) fail(route, 'suggestion banner on a page without a translation');
  if (/<header class="ag-header">/.test(html)) {
    const picker = html.match(/<details class="ag-lang"[\s\S]*?<\/details>/)?.[0] || '';
    if (!/class="ag-lang-globe"/.test(picker)) fail(route, 'language picker without the globe icon');
    for (const [code, name] of [['en', 'English'], ['es', 'Español']]) if (!new RegExp(`hreflang="${code}" lang="${code}"[^>]*>${name}`).test(picker)) fail(route, `language picker lacks "${name}" in its own script`);
    if (/[\u{1F1E6}-\u{1F1FF}]|flag/iu.test(picker)) fail(route, 'language picker shows a flag');
    tick('languagePickers');
  }
  tick(`hreflang_${wantLang}`);
}
const sitemapXml = existsSync(join(dist, 'sitemap.xml')) ? readFileSync(join(dist, 'sitemap.xml'), 'utf8') : '';
if (!/xmlns:xhtml="http:\/\/www\.w3\.org\/1999\/xhtml"/.test(sitemapXml)) fail('sitemap', 'xhtml namespace for hreflang alternates missing');
for (const [, entry] of sitemapXml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
  const loc = entry.match(/<loc>([^<]+)<\/loc>/)[1];
  const route = new URL(loc).pathname;
  const got = [...entry.matchAll(/<xhtml:link rel="alternate" hreflang="([^"]+)" href="([^"]+)"\/>/g)].map(match => `${match[1]}=${match[2]}`).sort();
  if (JSON.stringify(got) !== JSON.stringify(pageSets.get(route) || expectedSet(route))) fail('sitemap', `${route} alternates ${got.join(' ')} differ from the page`);
  else tick('sitemapAlternates');
}
const languageScript = readFileSync(join(root, 'site/components/parity/enhance.ts'), 'utf8');
if (/location\.(assign|replace)\s*\(|location(\.href)?\s*=[^=]|window\.location\s*=[^=]/.test(languageScript)) fail('enhance.ts', 'a script changes location: the language banner must suggest, never redirect');

// 5. Brand mark (2026-09-25): the M² icon files replace the old favicon set, none of them is the
//    headshot, and the Organization JSON-LD logo is the 512×512 M² PNG (scripts/brand-icons.mjs).
const icoSizes = bytes => bytes.readUInt16LE(0) === 0 && bytes.readUInt16LE(2) === 1 ? Array.from({ length: bytes.readUInt16LE(4) }, (_, i) => bytes.readUInt8(6 + 16 * i) || 256) : [];
const brandFiles = [['favicon.png', 32], ['apple-touch-icon.png', 180], ['images/brand/m2-logo-512.png', 512]];
for (const [path, size] of brandFiles) {
  const file = join(dist, path);
  if (!existsSync(file)) { fail(path, 'brand icon missing'); continue; }
  const bytes = readFileSync(file), dims = imageSize(bytes);
  if (dims?.type !== 'png' || dims.width !== size || dims.height !== size) fail(path, `expected a ${size}×${size} PNG`);
  else if (headshotHashes.has(hash(bytes))) fail(path, 'brand icon is the headshot');
  else tick('brandIcons');
}
const icoFile = join(dist, 'favicon.ico');
if (!existsSync(icoFile) || JSON.stringify(icoSizes(readFileSync(icoFile))) !== JSON.stringify([16, 32, 48])) fail('favicon.ico', 'expected an ICO with 16, 32 and 48 px images');
else tick('brandIcons');
const homeLd = readFileSync(join(dist, 'index.html'), 'utf8').match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
if (!homeLd.some(script => script.includes('"logo":"https://mj2.pro/images/brand/m2-logo-512.png"'))) fail('/', 'Organization JSON-LD logo is not the M² logo');
else tick('brandIcons');

const report = { passed: failures.length === 0, checks, darkPairs, failures };
if (process.env.STANDARDS_REPORT_PATH) writeFileSync(resolve(root, process.env.STANDARDS_REPORT_PATH), `${JSON.stringify(report, null, 2)}\n`);
const narrated = Object.keys(checks).filter(key => key.startsWith('narrated_')).map(key => `${checks[key]} ${key.slice(9)}`).join(' + ') || '0';
console.log(`Standards verification ${report.passed ? 'passed' : 'FAILED'}: share tags + 1200×630 card on ${checks.shareCardsOk || 0}/${checks.shareDocuments || 0} documents (${checks.headshotShareImages || 0} headshot references), theme script + toggle on ${checks.themedDocuments || 0} shell documents, dark blocks identical ${checks.darkTokenBlocksIdentical ? 'yes' : 'NO'}, ${darkPairs.length} dark text pairs ≥ 4.5:1 (min ${Math.min(...darkPairs.map(pair => pair.ratio))}), narrated posts ${narrated}; M² brand files ${checks.brandIcons || 0}/5; hreflang on ${checks.hreflang_en || 0} en + ${checks.hreflang_es || 0} es pages, ${checks.sitemapAlternates || 0} sitemap entries match, ${checks.languagePickers || 0} pickers.`);
if (failures.length) console.error(failures.map(value => `  - ${value}`).join('\n'));
process.exitCode = report.passed ? 0 : 1;
