#!/usr/bin/env node
/**
 * Live probe of the site standards on the deployed host (docs/site-standards.md). Re-crawls the
 * live sitemap and, for every URL (plus the declared /viz/ embeds):
 *  - share tags: the full Open Graph + summary_large_image set, og:image fetched (200, image/png
 *    or image/jpeg, 1200×630, under 5 MB), and a count of share images that are the headshot
 *    (by URL and by bytes);
 *  - narration: every post in site/data/narration.json has its player and its audio serves 200
 *    audio/mp4 with the recorded byte size;
 *  - hreflang: self-reference, reciprocity, x-default to English, every target 200, and the
 *    sitemap alternates match the page tags.
 *
 *   node scripts/qa/live-standards.mjs [--origin https://mj2.pro] [--out docs/…/live-standards.json]
 */
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { decodeHTML } from 'entities';

const args = Object.fromEntries(process.argv.slice(2).map((value, index, list) => value.startsWith('--') ? [value.slice(2), list[index + 1]] : []).filter(Boolean));
const origin = args.origin || 'https://mj2.pro';
const out = args.out ? resolve(args.out) : null;
const manifest = JSON.parse(readFileSync('docs/implementation-2026-09-11/route-manifest.json', 'utf8'));
const narration = JSON.parse(readFileSync('site/data/narration.json', 'utf8'));
const headshot = createHash('sha256').update(readFileSync('public/images/headshot.png')).digest('hex');
const required = ['og:title', 'og:description', 'og:url', 'og:type', 'og:locale', 'og:image', 'og:image:alt', 'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image', 'twitter:image:alt'];
const results = [];
const record = (scope, check, pass, detail = '') => { results.push({ scope, check, pass, detail }); if (!pass) console.log(`FAIL ${scope} — ${check}${detail ? ` (${detail})` : ''}`); };
const canonical = 'https://mj2.pro';
// Pages and sitemaps carry canonical https://mj2.pro URLs; fetch them from --origin (for a local dry run).
const local = url => url.startsWith(canonical) ? `${origin}${url.slice(canonical.length)}` : url;
const bust = url => `${local(url)}${url.includes('?') ? '&' : '?'}probe=${Date.now()}`;
const get = async (url, method = 'GET') => { try { const r = await fetch(bust(url), { method, redirect: 'manual', headers: { 'cache-control': 'no-cache' } }); return { status: r.status, type: r.headers.get('content-type') || '', length: Number(r.headers.get('content-length') || 0), body: method === 'GET' ? Buffer.from(await r.arrayBuffer()) : null }; } catch (error) { return { status: 0, type: '', body: null, error: String(error) }; } };
const meta = html => {
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] || '';
  const map = {};
  for (const tag of head.match(/<meta\b[^>]*>/gi) || []) {
    const key = tag.match(/\s(?:property|name)="([^"]+)"/i)?.[1];
    const content = tag.match(/\scontent="([^"]*)"/i)?.[1];
    if (key && /^(og|twitter):/.test(key)) (map[key] ||= []).push(decodeHTML(content ?? ''));
  }
  return map;
};
const alternates = html => [...(html.match(/<link\b[^>]*rel="alternate"[^>]*hreflang="[^"]+"[^>]*>/gi) || [])].map(tag => ({ lang: tag.match(/hreflang="([^"]+)"/)[1], href: decodeHTML(tag.match(/href="([^"]+)"/)[1]) }));

const sitemapXml = (await get(`${origin}/sitemap.xml`)).body?.toString('utf8') || '';
const urls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => decodeHTML(match[1]));
record('sitemap', 'sitemap lists URLs', urls.length > 0, `${urls.length} URLs`);
const sitemapAlternates = new Map([...sitemapXml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(match => [decodeHTML(match[1].match(/<loc>([^<]+)<\/loc>/)[1]), [...match[1].matchAll(/<xhtml:link rel="alternate" hreflang="([^"]+)" href="([^"]+)"\s*\/>/g)].map(m => ({ lang: m[1], href: decodeHTML(m[2]) }))]));
const targets = [...urls, ...(manifest.embeds || []).map(embed => `${canonical}${embed.path}`)];
const pages = new Map();
let headshots = 0, withAllTags = 0;
const cardCache = new Map();
for (const url of targets) {
  const response = await get(url);
  const html = response.body?.toString('utf8') || '';
  pages.set(url, html);
  record(url, 'HTTP 200', response.status === 200, `status ${response.status}`);
  const tags = meta(html);
  const missing = required.filter(key => !tags[key]?.[0]);
  if (!missing.length && tags['twitter:card'][0] === 'summary_large_image') withAllTags++;
  record(url, 'full share tag set, twitter:card summary_large_image', !missing.length && tags['twitter:card']?.[0] === 'summary_large_image', missing.join(', '));
  const image = tags['og:image']?.[0];
  if (!image) continue;
  if (!cardCache.has(image)) {
    const card = await get(image);
    const b = card.body;
    const png = b && b.subarray(1, 4).toString('latin1') === 'PNG';
    cardCache.set(image, { status: card.status, type: card.type, size: png ? [b.readUInt32BE(16), b.readUInt32BE(20)] : null, bytes: b?.length || 0, headshot: b ? createHash('sha256').update(b).digest('hex') === headshot : false });
  }
  const card = cardCache.get(image);
  const isHeadshot = /headshot/i.test(image) || card.headshot;
  if (isHeadshot) headshots++;
  record(url, 'og:image is a 1200×630 card under 5 MB, not the headshot', card.status === 200 && /image\/(png|jpeg)/.test(card.type) && card.size?.[0] === 1200 && card.size?.[1] === 630 && card.bytes < 5 * 1024 * 1024 && !isHeadshot, `${image} → ${card.status} ${card.type} ${card.size?.join('×')} ${card.bytes} B${isHeadshot ? ' HEADSHOT' : ''}`);
}

// Narration on every narrated post.
let narrated = 0;
for (const [route, item] of Object.entries(narration.items)) {
  const html = pages.get(`${canonical}${route}`) ?? (await get(`${canonical}${route}`)).body?.toString('utf8') ?? '';
  const player = /<audio\b[^>]*preload="none"[^>]*>/.test(html) && html.includes(`<source src="${item.src}" type="audio/mp4"`);
  const audio = await get(`${canonical}${item.src}`, 'HEAD');
  const ok = player && audio.status === 200 && /audio\/(mp4|x-m4a|aac)/.test(audio.type) && (!audio.length || audio.length === item.bytes);
  if (ok) narrated++;
  record(route, 'narration player present; audio 200 audio/mp4 with the recorded size', ok, `player ${player}, ${audio.status} ${audio.type} ${audio.length}/${item.bytes}`);
}

// hreflang: self, reciprocal, x-default to English, targets 200, sitemap alternates match.
let hreflangPages = 0, reciprocal = 0;
for (const url of urls) {
  const links = alternates(pages.get(url) || '');
  if (!links.length) continue;
  hreflangPages++;
  const self = links.some(link => link.href === url);
  const xDefault = links.find(link => link.lang === 'x-default');
  let ok = self && xDefault && !new URL(xDefault.href).pathname.startsWith('/es/');
  for (const link of links.filter(item => item.href !== url && item.lang !== 'x-default')) {
    const other = pages.get(link.href) ?? (await get(link.href)).body?.toString('utf8') ?? '';
    const back = alternates(other).some(item => item.href === url);
    if (!back) { ok = false; record(url, `hreflang ${link.lang} → ${link.href} links back`, false, ''); }
  }
  const mapped = sitemapAlternates.get(url) || [];
  const same = mapped.length === links.length && links.every(link => mapped.some(item => item.lang === link.lang && item.href === link.href));
  if (ok && same) reciprocal++;
  record(url, 'hreflang self-referencing, reciprocal, x-default to English, matches the sitemap', ok && same, `${links.map(link => `${link.lang}=${new URL(link.href).pathname}`).join(' ')}${same ? '' : ' (sitemap differs)'}`);
}

const failures = results.filter(r => !r.pass);
const summary = { generated: new Date().toISOString(), origin, sitemapUrls: urls.length, documents: targets.length, withAllShareTags: withAllTags, headshotShareImages: headshots, narratedPostsOk: `${narrated}/${Object.keys(narration.items).length}`, hreflangPages, hreflangReciprocal: reciprocal, checks: results.length, passed: results.length - failures.length, failed: failures.length, failures, results };
if (out) { mkdirSync(dirname(out), { recursive: true }); writeFileSync(out, `${JSON.stringify(summary, null, 2)}\n`); }
console.log(`Live standards @ ${origin}: ${summary.passed}/${summary.checks} checks; ${urls.length} sitemap URLs + ${targets.length - urls.length} embeds; full share tags ${withAllTags}/${targets.length}; headshot share images ${headshots}; narration ${summary.narratedPostsOk}; hreflang pages ${hreflangPages}, reciprocal ${reciprocal}.`);
process.exitCode = failures.length ? 1 : 0;
