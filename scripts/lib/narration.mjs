// Narration text for posts (docs/site-standards.md "Accessibility"): the title and the body
// prose, code blocks skipped, each table summarized in one sentence, embeds and figures left
// to the page. Shared by scripts/narrate.mjs (renders audio) and scripts/verify-standards.mjs
// (fails when a post's text no longer matches the text its audio was rendered from).
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { decodeHTML } from 'entities';
import { loadTs, root } from './load-ts.mjs';

export const manifestPath = join(root, 'site/data/narration.json');
export const readManifest = () => JSON.parse(readFileSync(manifestPath, 'utf8'));
export const audioPathFor = (lang, slug) => `/audio/${lang === 'es' ? 'es/' : ''}blog/${slug}.m4a`;
export const routeFor = (lang, slug) => `${lang === 'es' ? '/es' : ''}/blog/${slug}/`;
export const sha256 = text => createHash('sha256').update(text).digest('hex');

/** Published posts by language: English from the merged archive + src/lib list, Spanish translations. */
export async function loadPosts() {
  const spanish = existsSync(join(root, 'site/i18n/es-posts.ts'));
  const mod = await loadTs(`export { publishedBlogPosts } from './baseline/src/lib/published.ts';${spanish ? ` export { esPosts } from './site/i18n/es-posts.ts';` : ''}`);
  return {
    en: mod.publishedBlogPosts.map(post => ({ slug: post.slug, title: post.title, html: postHtml(post) })),
    es: (mod.esPosts || []).map(post => ({ slug: post.slug, title: post.title, html: post.contentHtml })),
  };
}

/** The same markup the post page renders (baseline/src/pages/blog-post.tsx). */
function postHtml(post) {
  if (post.contentHtml) return post.contentHtml;
  return `<p>${(post.content || '').replace(/\n\n/g, '</p><p>').replace(/### (.*?)\n/g, '<h3>$1</h3>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')}</p>`;
}

const strip = html => decodeHTML(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const list = (items, lang) => items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} ${lang === 'es' ? 'y' : 'and'} ${items.at(-1)}`;

function tableSentence(table, lang) {
  const rows = [...table.matchAll(/<tr\b[\s\S]*?<\/tr>/gi)].map(match => match[0]);
  const headerRow = rows.find(row => /<th\b/i.test(row));
  const headers = headerRow ? [...headerRow.matchAll(/<th\b[^>]*>([\s\S]*?)<\/th>/gi)].map(match => strip(match[1])).filter(Boolean) : [];
  const bodyRows = rows.filter(row => row !== headerRow).length;
  const caption = strip(table.match(/<caption\b[^>]*>([\s\S]*?)<\/caption>/i)?.[1] || '');
  const quoted = headers.map(header => lang === 'es' ? `«${header}»` : `“${header}”`);
  if (lang === 'es') return `El artículo incluye una tabla${caption ? `, ${caption},` : ''} de ${bodyRows} filas${quoted.length ? ` con las columnas ${list(quoted, lang)}` : ''}.`;
  return `The article includes a table${caption ? `, ${caption},` : ''} of ${bodyRows} rows${quoted.length ? ` with the columns ${list(quoted, lang)}` : ''}.`;
}

// Inline code is read as words; symbols a speech engine would skip or mangle are spelled out.
const speakCode = (code, lang) => code
  .replace(/\.md\b/g, lang === 'es' ? ' punto M D' : ' dot M D')
  .replace(/_/g, ' ')
  .replace(/(^|\s)-(\w)/g, lang === 'es' ? '$1guion $2' : '$1dash $2')
  .replace(/\//g, ' slash ');

const lexicon = {
  en: [[/\bTL;DR\b/g, 'T L D R'], [/[~≈]\s?/g, 'about '], [/\bvs\.?(?=\s)/g, 'versus'], [/\be\.g\.,?/g, 'for example,'], [/\bi\.e\.,?/g, 'that is,'], [/\s&\s/g, ' and '], [/\s?→\s?/g, ' to '], [/\s·\s/g, ', '], [/(\d)\s?×/g, '$1 times'], [/\bmj2\.pro\b/g, 'M J 2 dot pro']],
  es: [[/\bTL;DR\b/g, 'En resumen'], [/~\s?/g, 'unos '], [/≈\s?/g, 'aproximadamente '], [/\bvs\.?(?=\s)/g, 'frente a'], [/\bp\.\s?ej\.,?/g, 'por ejemplo,'], [/\s&\s/g, ' y '], [/\s?→\s?/g, ' a '], [/\s·\s/g, ', '], [/(\d)\s?×/g, '$1 veces'], [/\bmj2\.pro\b/g, 'M J 2 punto pro']],
};

export function narrationText({ title, html, lang = 'en' }) {
  let h = html
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(script|style|noscript|iframe|svg|pre|figure|button|form|template)\b[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<table\b[\s\S]*?<\/table>/gi, table => `<p>${tableSentence(table, lang)}</p>`)
    .replace(/<img\b[^>]*>/gi, ' ')
    .replace(/<code\b[^>]*>([\s\S]*?)<\/code>/gi, (_, code) => speakCode(strip(code), lang))
    .replace(/<a\b[^>]*>([\s\S]*?)<\/a>/gi, '$1')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|h[1-6]|li|blockquote|dt|dd|div|section|tr|summary|details|ul|ol)>/gi, '\n')
    .replace(/<(h[1-6]|li|p|blockquote|dt|dd)\b[^>]*>/gi, '\n');
  // Block boundaries are newlines by now, so the remaining tags are inline and vanish without a space.
  const lines = decodeHTML(h.replace(/<[^>]+>/g, ''))
    .split('\n').map(line => line.replace(/\s+/g, ' ').replace(/\s+([,.;:!?])/g, '$1').trim()).filter(Boolean)
    .map(line => /[.!?:;…]["”»’)]?$/.test(line) ? line : `${line}.`);
  let text = [`${title.trim()}${/[.!?]$/.test(title.trim()) ? '' : '.'}`, ...lines].join('\n');
  for (const [pattern, replacement] of lexicon[lang] || lexicon.en) text = text.replace(pattern, replacement);
  text = text.replace(/https?:\/\/\S+/g, lang === 'es' ? 'el enlace del artículo' : 'the link in the article');
  return `${text.replace(/[ \t]+/g, ' ').trim()}\n`;
}
