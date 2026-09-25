#!/usr/bin/env node
/**
 * Agency redesign verifier (2026-09-14). Runs after scripts/verify-parity.mjs on the
 * built dist/: route count (73 published URLs incl. /services/, the 2026-09-24 post and
 * study notes, the figma-shortest-course note, since site-standards deploy 2 the five Spanish pilot routes under /es/,
 * and since wave 2 (2026-09-24) four more posts with living infographics,
 * whose shell is checked with its Spanish labels), the agency shell on every document except the byte-preserved standalone SFC
 * report and the declared standalone embeds (section 7), template markers
 * (nav, green CTA, marquee fed by site/data/brands.json, footer columns), JSON-LD
 * (ProfessionalService + Person on home; Service + FAQPage on /services/; Article on
 * posts/notes; CreativeWork on cases), FAQ text parity with the JSON-LD, reduced-motion
 * marquee rule, and WCAG contrast for the green/navy tokens in site/styles/agency.css.
 *
 *   node scripts/verify-agency.mjs            (env PARITY_DIST, AGENCY_REPORT_PATH)
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { decodeHTML } from 'entities';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, process.env.PARITY_DIST || 'dist');
const release = process.env.SITE_BUILD_MODE === 'release';
const canonicalOrigin = 'https://mj2.pro';
const read = path => readFileSync(path, 'utf8');
const manifest = JSON.parse(read(join(root, 'docs/implementation-2026-09-11/route-manifest.json')));
const brands = JSON.parse(read(join(root, 'site/data/brands.json')));
const css = read(join(root, 'site/styles/agency.css'));
const failures = [];
const checks = {};
const fail = (scope, message) => failures.push(`${scope}: ${message}`);
const tick = key => { checks[key] = (checks[key] || 0) + 1; };
const tagPattern = /<(?:"[^"]*"|'[^']*'|[^'">])*>/g;
const text = html => decodeHTML(html.replace(/<!--([\s\S]*?)-->/g, '').replace(/<(script|style|noscript)\b[^>]*>[\s\S]*?<\/\1>/gi, '').replace(tagPattern, ' ')).replace(/\s+/gu, ' ').trim();
const body = html => html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? '';
const fileFor = route => { const file = join(dist, route, 'index.html'); return existsSync(file) ? file : null; };
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)]);
const jsonLdOf = html => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => { try { return JSON.parse(match[1]); } catch { return null; } });
const typesOf = html => jsonLdOf(html).flatMap(doc => doc ? (doc['@graph'] || [doc]).map(node => node['@type']) : ['INVALID']);

// 1. Routes: 73 published (53 archived public + lab, workbench, methodology, clients, services, products,
//    since 2026-09-24 one post and four study notes rendered from src/lib, since site-standards
//    deploy 2 five Spanish routes: /es/, /es/services/, /es/contact/, /es/blog/ and the GBP post, and
//    since wave 2 four posts: optimizing-for-ads-in-free-llm-answers, growth-title-market,
//    b2b-vs-b2c-by-vertical, statistician-vs-data-scientist) + 4 placeholders.
const eligible = manifest.routes.filter(route => route.kind !== 'placeholder').map(route => route.path);
if (eligible.length !== 73) fail('manifest', `expected 73 published routes, found ${eligible.length}`);
if (!manifest.routes.some(route => route.path === '/services/' && route.kind === 'added')) fail('manifest', '/services/ missing or not kind "added"');
const sitemap = existsSync(join(dist, 'sitemap.xml')) ? [...read(join(dist, 'sitemap.xml')).matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]) : [];
if (sitemap.length !== 73 || !sitemap.includes(`${canonicalOrigin}/services/`) || !sitemap.includes(`${canonicalOrigin}/es/services/`)) fail('sitemap', `expected 73 URLs including /services/ and /es/services/, found ${sitemap.length}`);
tick('routes');

// 2. Shell on every document except the standalone SFC report (byte-preserved by parity rule).
const standalone = new Set(['/case-studies/sfc-surf-school/']);
// Standalone living infographics declared under "embeds" in the manifest; checked in section 7 instead.
const embeds = manifest.embeds || [];
const embedPaths = new Set(embeds.map(embed => embed.path));
for (const file of walk(dist).filter(file => file.endsWith('.html'))) {
  const route = file === join(dist, '404.html') ? '/404.html' : `${file.slice(dist.length).replace(/index\.html$/, '')}`;
  if (standalone.has(route) || embedPaths.has(route)) continue;
  if (/^\/(review|design|proof|themes|review-assets|artifacts)\//.test(route)) continue; // review-only output, removed in release mode
  const html = read(file), pageBody = body(html);
  const spanish = /^\/es\//.test(route);
  const shellText = spanish
    ? { labels: ['Servicios', 'Productos', 'Portafolio', 'Laboratorio', 'Artículos', 'Acerca de'], cta: /<a class="ag-button ag-button--sm" href="\/es\/contact\/">Hablemos<\/a>/, ctaName: '“Hablemos”' }
    : { labels: ['Services', 'Products', 'Work', 'Lab', 'Writing', 'About'], cta: /<a class="ag-button ag-button--sm" href="\/contact\/">Let’s talk<\/a>/, ctaName: '“Let’s talk”' };
  tick('shellDocuments');
  if (!/<header class="ag-header">/.test(pageBody)) fail(route, 'missing agency header');
  if (!/<footer class="ag-footer">/.test(pageBody)) fail(route, 'missing agency footer');
  if (!/<main id="main-content">/.test(pageBody)) fail(route, 'missing main#main-content');
  if (!/<nav class="ag-nav" aria-label="(Primary|Principal)">/.test(pageBody)) fail(route, 'missing primary navigation');
  for (const label of shellText.labels) if (!new RegExp(`<a href="[^"]+"[^>]*>${label}(<span class="ag-caret"[^>]*></span>)?</a>`).test(pageBody)) fail(route, `primary nav lacks ${label}`);
  if (!shellText.cta.test(pageBody)) fail(route, `missing green ${shellText.ctaName} contact button`);
  if (!/<a class="ag-utility-link" href="https:\/\/linkedin\.com\/in\/mitchelljmillerjr"/.test(pageBody) || !/href="\/clients\/"/.test(pageBody)) fail(route, 'utility links (LinkedIn, Clients) missing');
  // mitchjmiller.com does not serve the personal portfolio yet (see site/lib/agency.ts personalPortfolio).
  if (/href="https?:\/\/(?:www\.)?mitchjmiller\.com\/?"/.test(pageBody)) fail(route, 'links to mitchjmiller.com, which does not serve the personal portfolio yet');
  if (!/<details class="ag-menu">/.test(pageBody)) fail(route, 'missing mobile menu');
  // M² mark (2026-09-25): the brand link carries the inline mark, never a photo.
  const brandLink = pageBody.match(/<a class="ag-brand"[^>]*>([\s\S]*?)<\/a>/)?.[1] || '';
  if (!/^\s*<svg class="m2-mark"[^>]*aria-hidden="true"/.test(brandLink) || /<img\b/.test(brandLink)) fail(route, 'header brand lacks the inline M² mark or still carries an image');
  if (/<dialog id="resume-chooser"|data-resume-open|resume-download-dialog/.test(pageBody)) fail(route, 'retired resume chooser is still present');
  if ((pageBody.match(/<h1\b/gi) || []).length !== 1) fail(route, 'expected exactly one h1');
  // TODO/TBD are uppercase developer markers; case-insensitive matching would flag the Spanish word "todo".
  if (/lorem ipsum|\[insert|Design review|THEME UNDER REVIEW/i.test(text(pageBody)) || /\bTODO\b|\bTBD\b/.test(text(pageBody))) fail(route, 'placeholder or review wording');
}

if (!manifest.routes.some(route => route.path === '/products/' && route.kind === 'added')) fail('manifest', '/products/ missing or not kind added');

// 3. Marquee on home and services (and their Spanish versions), fed by brands.json.
for (const route of ['/', '/services/', '/es/', '/es/services/']) {
  const file = fileFor(route);
  if (!file) { fail(route, 'missing document'); continue; }
  const html = read(file);
  const marquees = html.match(/<section class="ag-marquee"[\s\S]*?<\/section>/g) || [];
  if (marquees.length !== 1) { fail(route, `expected one marquee, found ${marquees.length}`); continue; }
  const marquee = marquees[0];
  if (!/aria-labelledby="[^"]+-label"/.test(marquee)) fail(route, 'marquee lacks aria-labelledby');
  const lists = marquee.match(/<ul[^>]*>/g) || [];
  if (lists.length !== 2 || !lists[1].includes('aria-hidden="true"')) fail(route, 'marquee needs two lists with the duplicate aria-hidden');
  const items = (marquee.match(/<li /g) || []).length;
  if (items !== brands.brands.filter(b => b.logo).length * 2) fail(route, `marquee items ${items} != 2 × ${brands.brands.filter(b => b.logo).length} brands`);
  for (const brand of brands.brands.filter(b => b.logo)) if (!marquee.includes(brand.logo ? `alt="${brand.name}"` : `<span>${brand.name}</span>`)) fail(route, `brand ${brand.name} missing`);
  if (!text(marquee).includes(route.startsWith('/es/') ? 'Experiencia en' : brands.label)) fail(route, 'marquee label text missing');
  tick('marquees');
}
const stripComments = value => value.replace(/\/\*[\s\S]*?\*\//g, '');
if (/teal|#0ea5e9|199 89% 48%/i.test(stripComments(css + read(join(root, 'baseline/src/index.css'))))) fail('css', 'teal accent token found in the shell or the shared tokens');
if (!/@media\(prefers-reduced-motion:reduce\)\{[\s\S]*?\.ag-marquee-track\{animation:none/.test(css)) fail('css', 'marquee lacks a prefers-reduced-motion static fallback');
if (!/\.ag-marquee:hover \.ag-marquee-track[^{]*\{animation-play-state:paused\}/.test(css)) fail('css', 'marquee does not pause on hover');

// 4. JSON-LD.
const home = read(fileFor('/'));
const homeTypes = typesOf(home);
if (!homeTypes.includes('ProfessionalService') || !homeTypes.includes('Person')) fail('/', `home JSON-LD types ${homeTypes.join(',')} lack ProfessionalService + Person`);
const services = read(fileFor('/services/'));
for (const servicesRoute of ['/services/', '/es/services/']) {
  const page = read(fileFor(servicesRoute));
  const serviceTypes = typesOf(page);
  if (!serviceTypes.includes('Service') || !serviceTypes.includes('FAQPage')) fail(servicesRoute, `services JSON-LD types ${serviceTypes.join(',')} lack Service + FAQPage`);
  const faqDoc = jsonLdOf(page).flatMap(doc => doc?.['@graph'] || []).find(node => node['@type'] === 'FAQPage');
  const faqBlock = page.match(/<section[^>]*aria-labelledby="faq-heading"[^>]*>([\s\S]*?)<\/section>/)?.[1] || "";
  const visibleQuestions = [...faqBlock.matchAll(/<h3>([\s\S]*?)<\/h3>/g)].map(m => text(m[1]));
  if (!faqDoc || faqDoc.mainEntity.length < 4 || faqDoc.mainEntity.length > 6) fail(servicesRoute, 'FAQPage needs 4–6 questions');
  else for (const question of faqDoc.mainEntity) {
    if (!visibleQuestions.includes(question.name)) fail(servicesRoute, `FAQ question not visible on the page: ${question.name}`);
    if (!text(page).includes(text(question.acceptedAnswer.text))) fail(servicesRoute, `FAQ answer text differs from the page: ${question.name}`);
    tick('faqQuestions');
  }
}
for (const route of manifest.routes) {
  const file = fileFor(route.path); if (!file) continue;
  const types = typesOf(read(file));
  if (['article', 'note'].includes(route.kind) && !types.includes('Article')) fail(route.path, 'missing Article JSON-LD');
  if (route.kind === 'case' && !standalone.has(route.path) && !types.includes('CreativeWork')) fail(route.path, 'missing CreativeWork JSON-LD');
  if (types.includes('INVALID')) fail(route.path, 'invalid JSON-LD');
  if (types.length) tick('jsonLdDocuments');
}
if (release && !home.includes('G-HCKYWCZQ8E')) fail('/', 'GA4 missing in release mode');

// 5. Services content and home hero image.
const servicesText = text(body(services).match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || '');
if (servicesText.length < 1500) fail('/services/', `main text too short (${servicesText.length})`);
for (const id of ['understand', 'design', 'build', 'grow', 'process']) if (!new RegExp(`id="${id}"`).test(services)) fail('/services/', `missing section anchor #${id}`);
if (!/href="\/case-studies\//.test(services)) fail('/services/', 'no evidence links to case studies');
// The approved refinement uses a quiet text-only hero; supporting imagery stays in products/work.
for (const [route, html] of [['/', home], ['/services/', services], ['/es/', read(fileFor('/es/'))], ['/es/services/', read(fileFor('/es/services/'))]]) {
  const hero = html.match(/<section class="ag-hero[^>]*>[\s\S]*?<\/section>/)?.[0] || '';
  if ((hero.match(/class="ag-button(?:\s|"|$)/g) || []).length !== 1) fail(route, 'hero needs exactly one CTA button');
  if (html.indexOf('data-marquee') > html.indexOf('class="ag-lifecycle"')) fail(route, 'brand logos must precede strategy through delivery');
  const marquee = html.match(/<section class="ag-marquee"[\s\S]*?<\/section>/)?.[0] || '';
  if (/employer|<abbr|<li[^>]*>\s*<span/i.test(marquee)) fail(route, 'marquee must render only logo art without relationship badges');
}
if (!/<section class="ag-lifecycle"/.test(home)) fail('/', 'lifecycle strip missing');
for (const [route, page] of [['/', home], ['/es/', read(fileFor('/es/'))]]) for (const section of ['objectives-heading', 'services-heading', 'products-heading', 'industries-heading', 'work-heading', 'lab-heading', 'writing-heading', 'cta-heading']) if (!page.includes(`id="${section}"`)) fail(route, `home section ${section} missing`);
if (!/href="\/work\/"/.test(home)) fail('/', 'home lacks the portfolio link');

// 6. Contrast of the tokens (WCAG 2.x relative luminance).
const tokens = Object.fromEntries([...css.matchAll(/--(ag-[a-z-]+):(#[0-9a-f]{6})/gi)].map(match => [match[1], match[2].toLowerCase()]));
const luminance = hex => { const channel = value => { const c = parseInt(value, 16) / 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; return 0.2126 * channel(hex.slice(1, 3)) + 0.7152 * channel(hex.slice(3, 5)) + 0.0722 * channel(hex.slice(5, 7)); };
const contrast = (a, b) => { const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x); return (l1 + 0.05) / (l2 + 0.05); };
const pairs = [
  ['white text on green button', '#ffffff', tokens['ag-green'], 4.5], ['white text on green hover', '#ffffff', tokens['ag-green-hover'], 4.5],
  ['green text on white', tokens['ag-green'], '#ffffff', 4.5], ['green button against navy hero (non-text)', tokens['ag-green'], tokens['ag-navy'], 3],
  ['white text on navy', '#ffffff', tokens['ag-navy'], 4.5], ['deck text on navy', tokens['ag-on-navy'], tokens['ag-navy'], 4.5], ['eyebrow on navy', tokens['ag-green-on-navy'], tokens['ag-navy'], 4.5],
  ['M² mark M and ring on the white header (non-text)', tokens['ag-heading'], tokens['ag-surface'], 3], ['M² mark 2 on the white header (non-text)', tokens['ag-green-text'], tokens['ag-surface'], 3],
  ['muted text on white', tokens['ag-muted'], '#ffffff', 4.5], ['muted text on tint', tokens['ag-muted'], tokens['ag-tint'], 4.5], ['marquee wordmark on white', tokens['ag-mark'], '#ffffff', 4.5], ['body text on white', tokens['ag-text'], '#ffffff', 4.5],
];
const contrastReport = pairs.map(([label, fg, bg, minimum]) => { const ratio = Number(contrast(fg, bg).toFixed(2)); if (ratio < minimum) fail('contrast', `${label} ${fg} on ${bg} = ${ratio}:1 < ${minimum}:1`); return { label, fg, bg, ratio, minimum }; });
if (tokens['ag-green'] !== '#14804a') fail('tokens', `green token changed to ${tokens['ag-green']}; re-verify contrast and update docs/redesign-2026-09-14/README.md`);

// 7. Content published after the snapshot (2026-09-24): every /blog/ document is declared, added
//    posts/notes carry Article JSON-LD, the post's FAQ JSON-LD mirrors the visible FAQ, its jump
//    anchors, embeds, noscript posters and rendered images resolve, and every /viz/ document is a
//    declared standalone embed (noindex, no analytics, no network, declared files present).
const pngSize = bytes => bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) ? [bytes.readUInt32BE(16), bytes.readUInt32BE(20)] : null;
const routePaths = new Set(manifest.routes.map(route => route.path));
const htmlUnder = dir => existsSync(join(dist, dir)) ? walk(join(dist, dir)).filter(file => file.endsWith('.html')).map(file => file.slice(dist.length).replace(/index\.html$/, '')) : [];
for (const route of htmlUnder('blog')) if (!routePaths.has(route)) fail(route, 'blog document is not declared in the route manifest');
for (const route of htmlUnder('viz')) if (!embedPaths.has(route)) fail(route, 'viz document is not a declared embed');
for (const route of manifest.routes.filter(route => route.kind === 'added' && /^\/blog\/.+/.test(route.path))) {
  const file = fileFor(route.path);
  if (!file) { fail(route.path, 'missing document'); continue; }
  const html = read(file);
  const article = jsonLdOf(html).flatMap(doc => doc ? (doc['@graph'] || [doc]) : []).find(node => node['@type'] === 'Article');
  if (!article) { fail(route.path, 'missing Article JSON-LD'); continue; }
  if (article.headline !== route.title) fail(route.path, `Article headline ${article.headline} != ${route.title}`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(article.datePublished || '')) fail(route.path, `Article datePublished not a full date: ${article.datePublished}`);
  if (article.mainEntityOfPage !== `${canonicalOrigin}${route.path}`) fail(route.path, 'Article mainEntityOfPage is not the canonical URL');
  tick('addedArticles');
}
for (const host of [...new Set(embeds.map(embed => embed.embeddedIn))]) {
  const file = fileFor(host);
  if (!file) { fail(host, 'embedding post missing'); continue; }
  const html = read(file);
  const prose = html.match(/<div class="prose[^"]*">([\s\S]*?)<\/div>\s*<\/article>/)?.[1] || '';
  if (!prose) { fail(host, 'post body not found'); continue; }
  if (/<!--|Draft notes|content-studio|mitchjmiller\.com|\[\[NEEDS|this session/i.test(prose)) fail(host, 'internal note, draft marker or retired host in the post body');
  const faq = jsonLdOf(prose).find(doc => doc && doc['@type'] === 'FAQPage');
  const questions = [...prose.matchAll(/<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g)].map(match => ({ q: text(match[1]), a: text(match[2]) }));
  if (!faq || faq.mainEntity.length !== questions.length || questions.length < 3) fail(host, `FAQPage JSON-LD must mirror the ${questions.length} visible questions`);
  else faq.mainEntity.forEach((item, index) => {
    if (item.name !== questions[index].q) fail(host, `FAQ question ${index + 1} differs from the page: ${item.name}`);
    if (text(item.acceptedAnswer.text) !== questions[index].a) fail(host, `FAQ answer ${index + 1} differs from the page`);
    tick('postFaqQuestions');
  });
  // Every section an embed can jump to (its manifest "anchors") exists exactly once in the post.
  for (const embed of embeds.filter(item => item.embeddedIn === host)) {
    if (!Array.isArray(embed.anchors) || !embed.anchors.length) fail(embed.path, 'embed declares no jump anchors');
    for (const anchor of embed.anchors || []) if ((prose.match(new RegExp(`id="${anchor}"`, 'g')) || []).length !== 1) fail(host, `jump anchor #${anchor} (${embed.path}) missing or duplicated`);
  }
  for (const embed of embeds.filter(item => item.embeddedIn === host)) {
    const src = `${embed.path}?parent=${encodeURIComponent(`${canonicalOrigin}${host}`)}`;
    const frames = [...prose.matchAll(/<iframe\b[^>]*>/g)].map(match => match[0]).filter(tag => tag.includes(`src="${src}"`));
    if (frames.length !== 1 || !/\stitle="[^"]+"/.test(frames[0] || '')) fail(host, `expected one titled iframe with src ${src}`);
    if (!new RegExp(`<noscript>\\s*<img src="${embed.path}poster-1080x1350\\.png"[^>]*alt="[^"]{20,}"`).test(prose)) fail(host, `noscript poster fallback for ${embed.path} missing`);
    if (!prose.includes(`<a href="${embed.path}">Open the full-screen version</a>`)) fail(host, `full-screen link to ${embed.path} missing`);
    tick('postEmbeds');
  }
  for (const [, srcPath] of prose.matchAll(/<img src="(\/images\/blog\/[^"]+)"/g)) {
    const bytes = existsSync(join(dist, srcPath)) ? readFileSync(join(dist, srcPath)) : null;
    const size = bytes && pngSize(bytes);
    if (!size || size[0] !== 1200) fail(host, `${srcPath} missing, not a PNG or not 1200 px wide`);
    else tick('postImages');
  }
}
for (const embed of embeds) {
  const file = fileFor(embed.path);
  if (!file) { fail(embed.path, 'declared embed missing'); continue; }
  const html = read(file);
  const robots = [...html.matchAll(/<meta\s+name="robots"\s+content="([^"]*)"/g)].map(match => match[1]);
  if (robots.length !== 1 || !/noindex/.test(robots[0])) fail(embed.path, `embed must carry exactly one noindex robots tag (${robots.join(' | ')})`);
  if (/googletagmanager|google-analytics|gtag\(/.test(html)) fail(embed.path, 'analytics in an embedded document');
  if (/\b(?:src|href)=["']https?:\/\//i.test(html) || /\bfetch\(|XMLHttpRequest|@import|url\(\s*["']?https?:/i.test(html)) fail(embed.path, 'embed must be self-contained (no network)');
  if (/content-studio|\.\.\/\.\.\/\.\.\/research|mitchjmiller\.com'/.test(html)) fail(embed.path, 'internal path or retired signature in the published copy');
  if (!(html.match(/<title>[^<]+<\/title>/g) || []).length) fail(embed.path, 'missing title');
  if (!/postMessage\(\{ type: 'viz-intent', intent: /.test(html)) fail(embed.path, 'viz-intent jump contract missing');
  if (!/p\.location\.origin === location\.origin/.test(html) || !/u\.origin === location\.origin/.test(html)) fail(embed.path, 'jump fallback is not restricted to same-origin targets');
  for (const name of embed.files) {
    const path = join(dist, embed.path, name);
    const bytes = existsSync(path) ? readFileSync(path) : null;
    const magicOk = bytes && (name.endsWith('.png') ? pngSize(bytes) : bytes.subarray(0, 6).toString('latin1') === 'GIF89a');
    if (!magicOk || bytes.length < 50000) fail(embed.path, `declared file ${name} missing, wrong type or unexpectedly small`);
    else tick('embedFiles');
  }
  tick('embeds');
}

const report = { mode: release ? 'local-release-candidate' : 'private-staging', passed: failures.length === 0, publishedRoutes: eligible.length, sitemapUrls: sitemap.length, checks, tokens, contrast: contrastReport, failures };
if (process.env.AGENCY_REPORT_PATH) writeFileSync(resolve(root, process.env.AGENCY_REPORT_PATH), `${JSON.stringify(report, null, 2)}\n`);
console.log(`Agency verification ${report.passed ? 'passed' : 'FAILED'} (${report.mode}): ${eligible.length} published routes, ${sitemap.length} sitemap URLs, ${checks.shellDocuments || 0} documents in the agency shell, ${checks.marquees || 0} marquees, ${checks.faqQuestions || 0} FAQ questions mirrored in JSON-LD, ${checks.jsonLdDocuments || 0} documents with JSON-LD, ${checks.addedArticles || 0} added posts/notes with Article JSON-LD, ${checks.embeds || 0} embeds (${checks.embedFiles || 0} files), post FAQ ${checks.postFaqQuestions || 0} mirrored, ${checks.postImages || 0} post images; contrast ${contrastReport.map(pair => `${pair.ratio}`).join('/')}.`);
if (failures.length) console.error(failures.map(value => `  - ${value}`).join('\n'));
process.exitCode = report.passed ? 0 : 1;
