#!/usr/bin/env node
/**
 * Independent JavaScript-off crawl of the release candidate.
 * Reads every route in docs/implementation-2026-09-11/route-manifest.json from the
 * built files AND over HTTP from a local static server (scripts/qa/serve.mjs).
 *
 *   node scripts/qa/crawl.mjs [--base http://127.0.0.1:5193] [--dist dist] [--out docs/redesign-2026-09-14/qa/crawl.json]
 *
 * Checks: HTTP 200, exactly one h1, main text length above a per-template threshold,
 * canonical present/correct, meta description present and unique, robots policy,
 * GA4 tag once per indexable page, internal links/assets resolve, images have alt,
 * the retired resume PDFs (manifest "retired") return 404, declared standalone embeds (manifest
 * "embeds") serve 200 with their files and stay noindex, unknown routes return the 404
 * document, former missing routes now carry full content, sitemap/robots/CNAME/.nojekyll,
 * and no review/staging/draft output or source maps in the artifact.
 */
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { decodeHTML } from 'entities';

const args = Object.fromEntries(process.argv.slice(2).map((value, index, list) => value.startsWith('--') ? [value.slice(2), list[index + 1]] : []).filter(Boolean));
const base = args.base || 'http://127.0.0.1:5193';
const dist = resolve(args.dist || 'dist');
const out = resolve(args.out || 'docs/redesign-2026-09-14/qa/crawl.json');
const manifest = JSON.parse(readFileSync('docs/implementation-2026-09-11/route-manifest.json', 'utf8'));
const GA = 'G-HCKYWCZQ8E';
const canonicalOrigin = 'https://mj2.pro';
const minText = { general: 300, case: 700, article: 1500, note: 1500, placeholder: 40, added: 400 };

const results = [];
const record = (scope, check, pass, detail = '') => results.push({ scope, check, pass, detail });
const tagPattern = /<(?:"[^"]*"|'[^']*'|[^'">])*>/g;
const text = html => decodeHTML(html.replace(/<!--([\s\S]*?)-->/g, '').replace(/<(script|style|noscript)\b[^>]*>[\s\S]*?<\/\1>/gi, '').replace(tagPattern, ' ')).replace(/\s+/gu, ' ').trim();
const attrs = tag => {
  const parsed = Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)].map(m => [m[1].toLowerCase(), decodeHTML(m[2] ?? m[3] ?? m[4])]));
  // Astro serializes an empty alt="" as a boolean `alt`; it is still a valid alt attribute.
  if (/\balt(?:\s|>)/i.test(tag) && !Object.prototype.hasOwnProperty.call(parsed, 'alt')) parsed.alt = '';
  return parsed;
};
const tags = (html, name) => [...html.matchAll(tagPattern)].map(m => m[0]).filter(t => new RegExp(`^<${name}\\b`, 'i').test(t));
const mainOf = html => html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? '';
const fileFor = route => { const dir = join(dist, route); return existsSync(join(dir, 'index.html')) ? join(dir, 'index.html') : null; };
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]);

const fetchStatus = async (url, method = 'GET') => {
  try { const r = await fetch(url, { method, redirect: 'manual' }); return { status: r.status, location: r.headers.get('location'), type: r.headers.get('content-type') || '', body: method === 'GET' ? Buffer.from(await r.arrayBuffer()) : null }; }
  catch (error) { return { status: 0, error: String(error) }; }
};

const descriptions = new Map();
const titles = new Map();
const internal = new Set();
for (const route of manifest.routes) {
  const scope = route.path;
  const kind = route.kind;
  const indexable = kind !== 'placeholder';
  const file = fileFor(route.path);
  record(scope, 'built file exists', Boolean(file), file || 'missing');
  if (!file) continue;
  const html = readFileSync(file, 'utf8');
  const main = mainOf(html);
  const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? '';
  const h1s = tags(body, 'h1');
  record(scope, 'exactly one h1', h1s.length === 1, `${h1s.length} h1 · ${text(body.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || '').slice(0, 80)}`);
  const length = text(main).length;
  const floor = route.minText || minText[kind];
  record(scope, `main text ≥ ${floor} chars (${kind})`, length >= floor, `${length} chars`);
  const canonical = tags(html, 'link').map(attrs).filter(l => l.rel === 'canonical');
  record(scope, 'one correct canonical', canonical.length === 1 && canonical[0].href === `${canonicalOrigin}${route.path}`, canonical.map(c => c.href).join(', ') || 'none');
  const description = tags(html, 'meta').map(attrs).find(m => m.name === 'description')?.content?.trim();
  record(scope, 'meta description present', Boolean(description), (description || '').slice(0, 90));
  if (description) descriptions.set(route.path, description);
  const title = text(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '');
  record(scope, 'title present', Boolean(title), title.slice(0, 90));
  if (title) titles.set(route.path, title);
  const robots = tags(html, 'meta').map(attrs).filter(m => m.name?.toLowerCase() === 'robots');
  const policy = robots.map(r => r.content?.toLowerCase()).join(' | ');
  record(scope, indexable ? 'robots index,follow (no noindex)' : 'robots noindex (placeholder)', robots.length === 1 && (indexable ? /\bindex\b/.test(policy) && !/noindex/.test(policy) : /noindex/.test(policy)), policy);
  const gaLoaders = (html.match(/googletagmanager\.com\/gtag\/js\?id=G-HCKYWCZQ8E/g) || []).length;
  record(scope, indexable ? 'GA4 loader exactly once' : 'GA4 loader absent on noindex page', indexable ? gaLoaders === 1 : gaLoaders === 0, `${gaLoaders} loader(s), id present: ${html.includes(GA)}`);
  const images = tags(body, 'img').map(attrs);
  const missingAlt = images.filter(img => !('alt' in img));
  record(scope, 'images have alt attributes', missingAlt.length === 0, `${images.length} images, ${missingAlt.length} without alt${missingAlt.length ? ': ' + missingAlt.map(i => i.src).slice(0, 3).join(', ') : ''}`);
  record(scope, 'no whole-page client shell', !/<div\b[^>]*id=["']root["'][^>]*>\s*<\/div>/i.test(body), '');
  record(scope, 'no staging/review wording', !/THEME UNDER REVIEW|NOT PRODUCTION|Design review/.test(body), '');
  // Spanish pilot pages (site standards deploy 2) carry the same shell with Spanish labels.
  const es = route.path.startsWith('/es/');
  record(scope, 'agency shell (header, primary nav, green contact button, footer)', /<header class="ag-header">/.test(body) && (es ? /aria-label="Principal"/ : /aria-label="Primary"/).test(body) && (es ? /class="ag-button ag-button--sm" href="\/es\/contact\/"/ : /class="ag-button ag-button--sm" href="\/contact\/"/).test(body) && /<footer class="ag-footer">/.test(body) || route.path === '/case-studies/sfc-surf-school/', route.path === '/case-studies/sfc-surf-school/' ? 'standalone report keeps its archived body by parity rule' : '');
  for (const tag of [...tags(body, 'a'), ...tags(body, 'img'), ...tags(body, 'source'), ...tags(html, 'link'), ...tags(html, 'script')]) {
    const a = attrs(tag);
    for (const name of ['href', 'src']) {
      const value = a[name];
      if (!value || /^(?:mailto:|tel:|data:|javascript:|#)/i.test(value)) continue;
      let url; try { url = new URL(value, `${canonicalOrigin}${route.path}`); } catch { record(scope, 'valid URL', false, value); continue; }
      if (url.hostname === 'mj2.pro' || url.hostname === 'www.mj2.pro') internal.add(url.pathname);
    }
  }
}
// Uniqueness across all manifest routes.
const dupDescriptions = [...descriptions.entries()].filter(([path, d]) => [...descriptions.values()].filter(v => v === d).length > 1);
record('site', 'meta descriptions unique across routes', dupDescriptions.length === 0, dupDescriptions.map(([p, d]) => `${p}: ${d.slice(0, 50)}`).slice(0, 6).join(' | '));
const dupTitles = [...titles.entries()].filter(([path, t]) => [...titles.values()].filter(v => v === t).length > 1);
record('site', 'titles unique across routes', dupTitles.length === 0, dupTitles.map(([p, t]) => `${p}: ${t.slice(0, 50)}`).slice(0, 6).join(' | '));

// HTTP crawl via the local static server.
const health = await fetchStatus(`${base}/`);
record('server', `static server reachable at ${base}`, health.status === 200, `status ${health.status}${health.error ? ' ' + health.error : ''}`);
if (health.status === 200) {
  for (const route of manifest.routes) {
    const r = await fetchStatus(`${base}${route.path}`);
    const built = fileFor(route.path);
    record(route.path, 'HTTP 200 and body equals built file', r.status === 200 && built && r.body.equals(readFileSync(built)), `status ${r.status}`);
  }
  let broken = [];
  for (const pathname of [...internal].sort()) {
    const r = await fetchStatus(`${base}${pathname}`, 'HEAD');
    const ok = r.status === 200 || (r.status === 301 && r.location && (await fetchStatus(`${base}${r.location}`, 'HEAD')).status === 200);
    if (!ok) broken.push(`${pathname} → ${r.status}`);
  }
  record('site', `internal links and assets resolve (${internal.size} unique paths)`, broken.length === 0, broken.slice(0, 10).join(', '));
  // Declared standalone embeds (living infographics iframed by a post) and the post's rendered images.
  for (const embed of manifest.embeds || []) {
    const r = await fetchStatus(`${base}${embed.path}`);
    const html = r.body ? r.body.toString('utf8') : '';
    record(embed.path, 'embed serves 200 as HTML, noindex, without analytics', r.status === 200 && /text\/html/.test(r.type) && /name="robots" content="noindex/.test(html) && !/googletagmanager/.test(html), `status ${r.status}`);
    for (const name of embed.files) {
      const f = await fetchStatus(`${base}${embed.path}${name}`);
      const type = name.endsWith('.gif') ? 'image/gif' : 'image/png';
      record(`${embed.path}${name}`, `serves 200 as ${type}`, f.status === 200 && f.type.startsWith(type) && f.body?.length > 50000, `status ${f.status}, ${f.type}, ${f.body?.length} bytes`);
    }
    const host = await fetchStatus(`${base}${embed.embeddedIn}`);
    const hostHtml = host.body ? host.body.toString('utf8') : '';
    record(embed.embeddedIn, `iframes ${embed.path} with the canonical ?parent=`, hostHtml.includes(`<iframe src="${embed.path}?parent=${encodeURIComponent(`${canonicalOrigin}${embed.embeddedIn}`)}"`), '');
  }
  for (const item of manifest.retired || []) {
    const r = await fetchStatus(`${base}${item.path}`, 'HEAD');
    record(item.path, `retired ${item.kind} returns 404 (${item.decidedBy}, ${item.date})`, r.status === 404, `status ${r.status}`);
  }
  for (const unknown of ['/no-such-page/', '/blog/does-not-exist/', '/case-studies/nope/', '/lab/missing/']) {
    const r = await fetchStatus(`${base}${unknown}`);
    const bodyText = r.body ? text(r.body.toString('utf8')) : '';
    record(unknown, 'unknown route returns HTTP 404 with the 404 document', r.status === 404 && /Page not found/.test(bodyText) && r.body.equals(readFileSync(join(dist, '404.html'))), `status ${r.status}`);
  }
  for (const former of ['/blog/gbp-2026-ai-grounding/', '/blog/studying/hermes-concepts-field-guide/']) {
    const r = await fetchStatus(`${base}${former}`);
    const html = r.body ? r.body.toString('utf8') : '';
    const length = text(mainOf(html)).length;
    record(former, 'former missing route now returns full content (200, one h1, ≥1500 chars)', r.status === 200 && tags(html, 'h1').length === 1 && length >= 1500, `status ${r.status}, ${length} chars`);
  }
  const home = await fetchStatus(`${base}/work`);
  record('/work', 'extensionless path redirects to trailing slash (GitHub Pages behavior emulated)', home.status === 301 && home.location === '/work/', `status ${home.status} → ${home.location}`);
}

// Artifact-level checks.
const sitemap = existsSync(join(dist, 'sitemap.xml')) ? readFileSync(join(dist, 'sitemap.xml'), 'utf8') : '';
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => decodeHTML(m[1]));
const expectedLocs = manifest.routes.filter(r => r.kind !== 'placeholder').map(r => `${canonicalOrigin}${r.path}`);
record('sitemap.xml', `lists exactly the ${expectedLocs.length} indexable URLs`, locs.length === expectedLocs.length && expectedLocs.every(u => locs.includes(u)) && new Set(locs).size === locs.length, `${locs.length} URLs`);
const robotsTxt = existsSync(join(dist, 'robots.txt')) ? readFileSync(join(dist, 'robots.txt'), 'utf8') : '';
record('robots.txt', 'allows all and declares the sitemap', /User-agent:\s*\*/.test(robotsTxt) && /Allow:\s*\//.test(robotsTxt) && !/Disallow:\s*\/\s*$/m.test(robotsTxt) && robotsTxt.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`), robotsTxt.replace(/\n/g, ' / '));
record('CNAME', 'contains mj2.pro', existsSync(join(dist, 'CNAME')) && readFileSync(join(dist, 'CNAME'), 'utf8').trim() === 'mj2.pro', '');
record('.nojekyll', 'present', existsSync(join(dist, '.nojekyll')), '');
record('404.html', 'present with public copy', existsSync(join(dist, '404.html')) && /Page not found/.test(readFileSync(join(dist, '404.html'), 'utf8')) && !/forget to add the page to the router/.test(readFileSync(join(dist, '404.html'), 'utf8')), '');
const allFiles = walk(dist);
const htmlFiles = allFiles.filter(f => f.endsWith('.html'));
const noindexHtml = htmlFiles.filter(f => /name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(readFileSync(f, 'utf8')) || /content=["'][^"']*noindex[^"']*["'][^>]*name=["']robots["']/i.test(readFileSync(f, 'utf8')));
const embeds = manifest.embeds || [];
const embedFiles = new Set(embeds.map(e => join(dist, e.path, 'index.html')));
const allowedNoindex = new Set([join(dist, '404.html'), ...manifest.routes.filter(r => r.kind === 'placeholder').map(r => join(dist, r.path, 'index.html')), ...embedFiles]);
const unexpectedNoindex = noindexHtml.filter(f => !allowedNoindex.has(f));
record('artifact', 'noindex only on 404.html, the four retained Coming Soon placeholders and the declared embeds', unexpectedNoindex.length === 0 && [...embedFiles].every(f => noindexHtml.includes(f)), `${noindexHtml.length} noindex documents: ${noindexHtml.map(f => f.slice(dist.length)).join(', ')}`);
const stray = allFiles.filter(f => /\/(review|design|proof|themes|review-assets|artifacts)\//.test(f.slice(dist.length)) || /_headers$|_redirects$|\.map$/.test(f));
record('artifact', 'no review/design/proof/theme/staging output or source maps', stray.length === 0, stray.slice(0, 8).map(f => f.slice(dist.length)).join(', '));
const orphanHtml = htmlFiles.filter(f => f !== join(dist, '404.html') && !embedFiles.has(f) && !manifest.routes.some(r => join(dist, r.path, 'index.html') === f));
record('artifact', 'every HTML document is a manifest route, a declared embed or 404.html', orphanHtml.length === 0, orphanHtml.map(f => f.slice(dist.length)).join(', '));
const secretHits = allFiles.filter(f => /\.(html|js|css|json|txt|xml)$/.test(f)).filter(f => /(sk_live_|AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY-----|ghp_[A-Za-z0-9]{36})/.test(readFileSync(f, 'utf8')));
record('artifact', 'no credential-shaped strings in text output', secretHits.length === 0, secretHits.map(f => f.slice(dist.length)).join(', '));
const draftHits = htmlFiles.filter(f => /content-drafts|content-studio/.test(readFileSync(f, 'utf8')));
record('artifact', 'no references to content-drafts/content-studio in output', draftHits.length === 0, draftHits.map(f => f.slice(dist.length)).join(', '));

const failures = results.filter(r => !r.pass);
const summary = { generated: new Date().toISOString(), base, dist, routes: manifest.routes.length, checks: results.length, passed: results.length - failures.length, failed: failures.length, failures, results };
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, `${JSON.stringify(summary, null, 2)}\n`);
console.log(`Crawl: ${summary.passed}/${summary.checks} checks passed across ${manifest.routes.length} routes${failures.length ? `\n${failures.map(f => `  FAIL ${f.scope} — ${f.check}${f.detail ? ` (${f.detail})` : ''}`).join('\n')}` : ''}`);
process.exitCode = failures.length ? 1 : 0;
