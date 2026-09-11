import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { resolve, dirname, join } from 'node:path';
import { decodeHTML } from 'entities';
import { exportParityReference } from './export-parity-reference.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, process.env.PARITY_DIST || 'dist');
const release = process.env.SITE_BUILD_MODE === 'release';
const read = path => readFileSync(path, 'utf8');
const manifest = JSON.parse(read(join(root, 'docs/implementation-2026-09-11/route-manifest.json')));
const production = JSON.parse(read(join(root, 'docs/implementation-2026-09-11/production-files.json')));
const reference = await exportParityReference();
const failures = [];
const historicalBrokenAnchors = [];
const checks = { routes: 0, fullBodies: 0, caseFields: 0, pdfs: 0, htmlDocuments: 0, localLinksAndAssets: 0, anchorLinks: 0 };
const fail = (scope, message) => failures.push(`${scope}: ${message}`);
const normalizePath = value => value === '/' ? '/' : `/${value.replace(/^\/+|\/+$/g, '')}/`;
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const body = html => html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? '';
const tagPattern = /<(?:"[^"]*"|'[^']*'|[^'">])*>/g;
const text = html => decodeHTML(html
  .replace(/<!--([\s\S]*?)-->/g, '')
  .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
  .replace(tagPattern, ' ')).replace(/\s+/gu, ' ').trim();
const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)].map(match => [match[1].toLowerCase(), decodeHTML(match[2] ?? match[3] ?? match[4])]));
const tags = html => [...html.matchAll(tagPattern)].map(match => match[0]);
const attrTags = (html, name) => tags(html).filter(tag => new RegExp(`^<${name}\\b`, 'i').test(tag)).map(attributes);
const localFile = pathname => {
  let decoded;
  try { decoded = decodeURIComponent(pathname); } catch { return null; }
  const path = resolve(dist, `.${decoded}`);
  if (path !== dist && !path.startsWith(`${dist}/`)) return null;
  if (existsSync(path) && statSync(path).isFile()) return path;
  if (existsSync(join(path, 'index.html'))) return join(path, 'index.html');
  return null;
};
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)]);
const expectedRoutes = new Map(reference.routes.map(route => [route.path, route]));
const declaredRoutes = new Map(manifest.routes.map(route => [route.path, route]));
if (manifest.source !== reference.source) fail('manifest', `source ${manifest.source} does not match archived ${reference.source}`);
if (expectedRoutes.size !== 57 || declaredRoutes.size !== 57 || manifest.routes.length !== 57) fail('manifest', `expected 57 unique routes; source=${expectedRoutes.size}, manifest=${declaredRoutes.size}, rows=${manifest.routes.length}`);
for (const [path, source] of expectedRoutes) {
  if (!declaredRoutes.has(path)) fail('manifest', `missing production route ${path}`);
  else if (declaredRoutes.get(path).kind !== source.kind) fail(path, `manifest kind ${declaredRoutes.get(path).kind} != source ${source.kind}`);
}
for (const path of declaredRoutes.keys()) if (!expectedRoutes.has(path)) fail('manifest', `unexplained route ${path}`);

const rendered = new Map();
const historicalAnchors = new Set();
for (const source of reference.routes) {
  if (source.bodyHtml) for (const { href } of attrTags(source.bodyHtml, 'a')) {
    if (!href) continue;
    try { const url = new URL(href, `https://mitchjmiller.com${source.path}`); if (url.hash) historicalAnchors.add(`${source.path}|${url.href}`); } catch {}
  }
  const file = localFile(source.path);
  if (!file) { fail(source.path, 'missing generated HTML'); continue; }
  checks.routes++;
  const html = read(file), pageBody = body(html), normalized = text(pageBody);
  rendered.set(source.path, html);
  if (!/<h1\b/i.test(pageBody)) fail(source.path, 'missing server-rendered h1');
  if (!attrTags(pageBody, 'a').some(anchor => anchor.href && !anchor.href.startsWith('#'))) fail(source.path, 'missing native destination links');
  if (/<astro-island\b/i.test(pageBody) || /<div\b[^>]*id=["']root["'][^>]*>\s*<\/div>/i.test(pageBody)) fail(source.path, 'whole-page hydration/client shell found');
  if (normalized.length < 200) fail(source.path, `body too short (${normalized.length} characters)`);
  if (source.standalone) continue; // Its entire original body is checked below.
  for (const expected of declaredRoutes.get(source.path)?.expected || []) if (!normalized.includes(text(expected))) fail(source.path, `missing manifest content: ${expected.slice(0, 100)}`);
  if (source.kind === 'case') for (const [field, expected] of Object.entries(source.fields)) {
    if (!expected || !normalized.includes(text(expected))) fail(source.path, `missing original case field ${field}`);
    checks.caseFields++;
  }
  if (['article', 'note'].includes(source.kind)) {
    const expected = text(source.bodyHtml);
    if (expected.length < 100) fail(source.path, 'source body unexpectedly empty');
    else if (!normalized.includes(expected)) {
      // Identify the first missing paragraph without dumping the entire article.
      const blocks = source.bodyHtml.split(/<\/(?:p|li|h[1-6]|pre|table)>/i).map(text).filter(value => value.length > 40);
      const missing = blocks.find(block => !normalized.includes(block));
      fail(source.path, `full ${source.kind} body differs from source${missing ? `; first missing text: ${missing.slice(0, 180)}` : '; text order or boundaries differ'}`);
    }
    checks.fullBodies++;
  }
  if (source.kind === 'placeholder' && !normalized.includes('This content is currently being written.')) fail(source.path, 'original Coming Soon notice missing');
}

const sfcPath = '/case-studies/sfc-surf-school/';
const originalSfc = read(join(root, 'baseline/public/case-studies/sfc-surf-school/index.html'));
const originalSfcBody = body(originalSfc);
if (!originalSfcBody || body(rendered.get(sfcPath) || '') !== originalSfcBody) fail(sfcPath, 'standalone report body differs from archived production bytes');
for (const { href } of attrTags(originalSfcBody, 'a')) {
  try { const url = new URL(href, `https://mitchjmiller.com${sfcPath}`); if (url.hash) historicalAnchors.add(`${sfcPath}|${url.href}`); } catch {}
}
for (const pdf of production.pdfs) {
  const file = localFile(pdf.path);
  if (!file) fail(pdf.path, 'missing preserved PDF');
  else {
    const bytes = readFileSync(file);
    if (hash(bytes) !== pdf.sha256 || bytes.length !== pdf.bytes) fail(pdf.path, 'bytes differ from verified gh-pages PDF');
    if (bytes.subarray(0, 5).toString() !== '%PDF-') fail(pdf.path, 'not a PDF file');
  }
  checks.pdfs++;
}

const eligible = new Set(reference.routes.filter(route => route.kind !== 'placeholder').map(route => route.path));
let indexableDocuments = 0;
const htmlFiles = existsSync(dist) ? walk(dist).filter(file => file.endsWith('.html')) : [];
const anchorCache = new Map();
const idsForFile = file => {
  if (!anchorCache.has(file)) anchorCache.set(file, new Set(tags(read(file)).flatMap(tag => { const attr = attributes(tag); return [attr.id, /^<a\b/i.test(tag) ? attr.name : undefined].filter(Boolean); })));
  return anchorCache.get(file);
};
for (const file of htmlFiles) {
  checks.htmlDocuments++;
  const html = read(file);
  const relative = file.slice(dist.length).replace(/index\.html$/, '');
  const route = relative === '' ? '/' : relative;
  const robots = attrTags(html, 'meta').filter(meta => meta.name?.toLowerCase() === 'robots');
  const indexable = release && eligible.has(route);
  if (robots.length !== 1) fail(route, `expected one robots tag, found ${robots.length}`);
  else {
    const directives = (robots[0].content || '').split(',').map(value => value.trim().toLowerCase());
    if (indexable ? !directives.includes('index') || directives.includes('noindex') : !directives.includes('noindex')) fail(route, `incorrect ${release ? 'release' : 'staging'} robots policy`);
    if (directives.includes('index') && !directives.includes('noindex')) indexableDocuments++;
  }
  const analytics = /googletagmanager\.com\/gtag|google-analytics\.com|gtag\s*\(\s*['"]config/i.test(html);
  if (!release && analytics) fail(route, 'analytics would send unwanted staging traffic');
  if (indexable && !html.includes('G-HCKYWCZQ8E')) fail(route, 'production analytics ID missing from local release candidate');
  if (indexable && [...html.matchAll(/googletagmanager\.com\/gtag/g)].length !== 1) fail(route, 'expected exactly one analytics loader');
  if (expectedRoutes.has(route)) {
    const canonical = attrTags(html, 'link').filter(link => link.rel === 'canonical');
    if (canonical.length !== 1 || canonical[0].href !== `https://mitchjmiller.com${route}`) fail(route, 'canonical missing, duplicate or inconsistent with retained URL');
  }
  // Assets/destinations from all documents; anchor checks from production pages.
  // Ignore text examples and scripts: inspect actual opening HTML tags only.
  const markup = html.replace(/<!--([\s\S]*?)-->/g, '').replace(/<(script|style)\b([^>]*)>[\s\S]*?<\/\1>/gi, '<$1$2></$1>');
  for (const tag of tags(markup)) {
    if (!/^<(?:a|img|source|link|iframe|script|video|audio)\b/i.test(tag)) continue;
    const attrs = attributes(tag);
    for (const name of ['href', 'src', 'poster']) {
      const value = attrs[name];
      if (!value || /^(?:mailto:|tel:|data:|blob:|javascript:)/i.test(value)) continue;
      let url;
      try { url = new URL(value, `https://mitchjmiller.com${route}`); } catch { fail(route, `invalid ${name}: ${value.slice(0, 100)}`); continue; }
      if (!['mitchjmiller.com', 'www.mitchjmiller.com'].includes(url.hostname)) continue;
      checks.localLinksAndAssets++;
      const target = localFile(url.pathname);
      if (!target) { fail(route, `missing internal ${name}: ${value}`); continue; }
      if (!url.hash || !target.endsWith('.html') || !expectedRoutes.has(route)) continue;
      checks.anchorLinks++;
      let id; try { id = decodeURIComponent(url.hash.slice(1)); } catch { id = url.hash.slice(1); }
      if (!id || idsForFile(target).has(id)) continue;
      const problem = `${route}: ${value}`;
      if (historicalAnchors.has(`${route}|${url.href}`)) historicalBrokenAnchors.push(problem);
      else fail(route, `new missing anchor target: ${value}`);
    }
  }
}
if (indexableDocuments !== (release ? 53 : 0)) fail('indexing', `expected ${release ? 53 : 0} indexable documents; found ${indexableDocuments}`);
const sitemapFile = join(dist, 'sitemap.xml');
if (!existsSync(sitemapFile)) fail('sitemap', 'missing sitemap.xml');
else {
  const urls = [...read(sitemapFile).matchAll(/<loc>([\s\S]*?)<\/loc>/g)].map(match => decodeHTML(match[1]));
  const expected = new Set([...eligible].map(path => `https://mitchjmiller.com${path}`));
  if (urls.length !== 53 || new Set(urls).size !== 53) fail('sitemap', `expected 53 unique published URLs; found ${urls.length}`);
  for (const url of urls) if (!expected.has(url)) fail('sitemap', `unexpected URL ${url}`);
  for (const url of expected) if (!urls.includes(url)) fail('sitemap', `missing URL ${url}`);
}
if (!existsSync(join(dist, '404.html'))) fail('404', 'missing static 404 document (HTTP behavior verified separately)');
const robotsFile = join(dist, 'robots.txt');
if (!existsSync(robotsFile) || !read(robotsFile).includes('Sitemap: https://mitchjmiller.com/sitemap.xml')) fail('robots.txt', 'missing sitemap reference');
if (release && existsSync(join(dist, '_headers'))) fail('release', 'staging noindex headers survived into release candidate');
if (!release && (!existsSync(join(dist, '_headers')) || !/X-Robots-Tag:\s*noindex/i.test(read(join(dist, '_headers'))))) fail('staging', 'missing noindex response-header configuration');
const report = {
  mode: release ? 'local-release-candidate' : 'private-staging', passed: failures.length === 0,
  source: reference.source, productionDeployment: production.deployed, checks,
  indexableDocuments, preservedStandaloneBodySha256: hash(originalSfcBody),
  duplicatePublishedSlugsDeduplicated: reference.duplicateSlugs,
  historicalBrokenAnchors: [...new Set(historicalBrokenAnchors)], failures: [...new Set(failures)],
  limits: ['HTTP 200/404 behavior, visual parity, responsive layout and interaction behavior require separate local/browser verification.', 'Local or private-staging checks do not establish production indexing.'],
};
if (process.env.PARITY_REPORT_PATH) writeFileSync(resolve(root, process.env.PARITY_REPORT_PATH), `${JSON.stringify(report, null, 2)}\n`);
console.log(`Parity verification ${report.passed ? 'passed' : 'FAILED'} (${report.mode}): ${checks.routes}/57 routes, ${checks.fullBodies}/25 complete articles/notes, ${checks.caseFields} original case fields, ${checks.pdfs}/4 exact PDFs.`);
if (report.historicalBrokenAnchors.length) console.log(`Historical broken anchors retained (${report.historicalBrokenAnchors.length}):\n${report.historicalBrokenAnchors.map(value => `  - ${value}`).join('\n')}`);
if (report.failures.length) console.error(report.failures.map(value => `  - ${value}`).join('\n'));
process.exitCode = report.passed ? 0 : 1;
