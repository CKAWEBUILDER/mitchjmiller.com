#!/usr/bin/env node
/**
 * Agency redesign verifier (2026-09-14). Runs after scripts/verify-parity.mjs on the
 * built dist/: route count (58 published URLs incl. /services/), the agency shell on
 * every document except the byte-preserved standalone SFC report, template markers
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

// 1. Routes: 58 published (53 archived public + lab, workbench, methodology, clients, services) + 4 placeholders.
const eligible = manifest.routes.filter(route => route.kind !== 'placeholder').map(route => route.path);
if (eligible.length !== 59) fail('manifest', `expected 59 published routes, found ${eligible.length}`);
if (!manifest.routes.some(route => route.path === '/services/' && route.kind === 'added')) fail('manifest', '/services/ missing or not kind "added"');
const sitemap = existsSync(join(dist, 'sitemap.xml')) ? [...read(join(dist, 'sitemap.xml')).matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]) : [];
if (sitemap.length !== 59 || !sitemap.includes('https://mitchjmiller.com/services/')) fail('sitemap', `expected 59 URLs including /services/, found ${sitemap.length}`);
tick('routes');

// 2. Shell on every document except the standalone SFC report (byte-preserved by parity rule).
const standalone = new Set(['/case-studies/sfc-surf-school/']);
for (const file of walk(dist).filter(file => file.endsWith('.html'))) {
  const route = file === join(dist, '404.html') ? '/404.html' : `${file.slice(dist.length).replace(/index\.html$/, '')}`;
  if (standalone.has(route)) continue;
  if (/^\/(review|design|proof|themes|review-assets|artifacts)\//.test(route)) continue; // review-only output, removed in release mode
  const html = read(file), pageBody = body(html);
  tick('shellDocuments');
  if (!/<header class="ag-header">/.test(pageBody)) fail(route, 'missing agency header');
  if (!/<footer class="ag-footer">/.test(pageBody)) fail(route, 'missing agency footer');
  if (!/<main id="main-content">/.test(pageBody)) fail(route, 'missing main#main-content');
  if (!/<nav class="ag-nav" aria-label="Primary">/.test(pageBody)) fail(route, 'missing primary navigation');
  for (const label of ['Services', 'Products', 'Work', 'Lab', 'Writing', 'About']) if (!new RegExp(`<a href="[^"]+"[^>]*>${label}(<span class="ag-caret"[^>]*></span>)?</a>`).test(pageBody)) fail(route, `primary nav lacks ${label}`);
  if (!/<a class="ag-button ag-button--sm" href="\/contact\/">Let’s talk<\/a>/.test(pageBody)) fail(route, 'missing green “Let’s talk” contact button');
  if (!/href="\/resume\/"/.test(pageBody) || !/href="\/clients\/"/.test(pageBody)) fail(route, 'utility links (Resumes, Clients) missing');
  if (!/<details class="ag-menu">/.test(pageBody)) fail(route, 'missing mobile menu');
  if (!/<dialog id="resume-chooser"/.test(pageBody)) fail(route, 'missing resume chooser dialog');
  if ((pageBody.match(/<h1\b/gi) || []).length !== 1) fail(route, 'expected exactly one h1');
  if (/lorem ipsum|\bTODO\b|\bTBD\b|\[insert|Design review|THEME UNDER REVIEW/i.test(text(pageBody))) fail(route, 'placeholder or review wording');
}

if (!manifest.routes.some(route => route.path === '/products/' && route.kind === 'added')) fail('manifest', '/products/ missing or not kind added');

// 3. Marquee on home and services, fed by brands.json.
for (const route of ['/', '/services/']) {
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
  if (items !== brands.brands.length * 2) fail(route, `marquee items ${items} != 2 × ${brands.brands.length} brands`);
  for (const brand of brands.brands) if (!marquee.includes(brand.logo ? `alt="${brand.name}"` : `<span>${brand.name}</span>`)) fail(route, `brand ${brand.name} missing`);
  if (!text(marquee).includes(brands.label)) fail(route, 'marquee label text missing');
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
const serviceTypes = typesOf(services);
if (!serviceTypes.includes('Service') || !serviceTypes.includes('FAQPage')) fail('/services/', `services JSON-LD types ${serviceTypes.join(',')} lack Service + FAQPage`);
const faqDoc = jsonLdOf(services).flatMap(doc => doc?.['@graph'] || []).find(node => node['@type'] === 'FAQPage');
const faqBlock = services.match(/<section[^>]*aria-labelledby="faq-heading"[^>]*>([\s\S]*?)<\/section>/)?.[1] || "";
const visibleQuestions = [...faqBlock.matchAll(/<h3>([\s\S]*?)<\/h3>/g)].map(m => text(m[1]));
if (!faqDoc || faqDoc.mainEntity.length < 4 || faqDoc.mainEntity.length > 6) fail('/services/', 'FAQPage needs 4–6 questions');
else for (const question of faqDoc.mainEntity) {
  if (!visibleQuestions.includes(question.name)) fail('/services/', `FAQ question not visible on the page: ${question.name}`);
  if (!text(services).includes(text(question.acceptedAnswer.text))) fail('/services/', `FAQ answer text differs from the page: ${question.name}`);
  tick('faqQuestions');
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
const heroImage = home.match(/<div class="ag-showcase"[\s\S]*?<img src="([^"]+)"/)?.[1];
if (!heroImage || !existsSync(join(dist, heroImage))) fail('/', `hero image missing: ${heroImage}`);
if (!/<section class="ag-lifecycle"/.test(home)) fail('/', 'lifecycle strip missing');
for (const section of ['objectives-heading', 'services-heading', 'products-heading', 'industries-heading', 'work-heading', 'lab-heading', 'writing-heading', 'cta-heading']) if (!home.includes(`id="${section}"`)) fail('/', `home section ${section} missing`);
if (!/href="\/work\/"/.test(home)) fail('/', 'home lacks the portfolio link');

// 6. Contrast of the tokens (WCAG 2.x relative luminance).
const tokens = Object.fromEntries([...css.matchAll(/--(ag-[a-z-]+):(#[0-9a-f]{6})/gi)].map(match => [match[1], match[2].toLowerCase()]));
const luminance = hex => { const channel = value => { const c = parseInt(value, 16) / 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; return 0.2126 * channel(hex.slice(1, 3)) + 0.7152 * channel(hex.slice(3, 5)) + 0.0722 * channel(hex.slice(5, 7)); };
const contrast = (a, b) => { const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x); return (l1 + 0.05) / (l2 + 0.05); };
const pairs = [
  ['white text on green button', '#ffffff', tokens['ag-green'], 4.5], ['white text on green hover', '#ffffff', tokens['ag-green-hover'], 4.5],
  ['green text on white', tokens['ag-green'], '#ffffff', 4.5], ['green button against navy hero (non-text)', tokens['ag-green'], tokens['ag-navy'], 3],
  ['white text on navy', '#ffffff', tokens['ag-navy'], 4.5], ['deck text on navy', tokens['ag-on-navy'], tokens['ag-navy'], 4.5], ['eyebrow on navy', tokens['ag-green-on-navy'], tokens['ag-navy'], 4.5],
  ['muted text on white', tokens['ag-muted'], '#ffffff', 4.5], ['muted text on tint', tokens['ag-muted'], tokens['ag-tint'], 4.5], ['marquee wordmark on white', tokens['ag-mark'], '#ffffff', 4.5], ['body text on white', tokens['ag-text'], '#ffffff', 4.5],
];
const contrastReport = pairs.map(([label, fg, bg, minimum]) => { const ratio = Number(contrast(fg, bg).toFixed(2)); if (ratio < minimum) fail('contrast', `${label} ${fg} on ${bg} = ${ratio}:1 < ${minimum}:1`); return { label, fg, bg, ratio, minimum }; });
if (tokens['ag-green'] !== '#14804a') fail('tokens', `green token changed to ${tokens['ag-green']}; re-verify contrast and update docs/redesign-2026-09-14/README.md`);

const report = { mode: release ? 'local-release-candidate' : 'private-staging', passed: failures.length === 0, publishedRoutes: eligible.length, sitemapUrls: sitemap.length, checks, tokens, contrast: contrastReport, failures };
if (process.env.AGENCY_REPORT_PATH) writeFileSync(resolve(root, process.env.AGENCY_REPORT_PATH), `${JSON.stringify(report, null, 2)}\n`);
console.log(`Agency verification ${report.passed ? 'passed' : 'FAILED'} (${report.mode}): ${eligible.length} published routes, ${sitemap.length} sitemap URLs, ${checks.shellDocuments || 0} documents in the agency shell, ${checks.marquees || 0} marquees, ${checks.faqQuestions || 0} FAQ questions mirrored in JSON-LD, ${checks.jsonLdDocuments || 0} documents with JSON-LD; contrast ${contrastReport.map(pair => `${pair.ratio}`).join('/')}.`);
if (failures.length) console.error(failures.map(value => `  - ${value}`).join('\n'));
process.exitCode = report.passed ? 0 : 1;
