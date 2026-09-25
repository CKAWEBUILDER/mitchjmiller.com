// Small HTML helpers shared by the build-time share-card step and the standards verifier.
import { decodeHTML } from 'entities';

export const metaTags = html => [...html.matchAll(/<meta\b[^>]*>/gi)].map(match => match[0]);
export const attr = (tag, name) => { const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*"([^"]*)"`, 'i')); return m ? decodeHTML(m[1]) : undefined; };
export const headOf = html => html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] || '';

/** {"og:title": ["…"], "twitter:card": ["summary_large_image"], …} from the document head. */
export function shareMeta(html) {
  const out = {};
  for (const tag of metaTags(headOf(html))) {
    const key = attr(tag, 'property') || attr(tag, 'name');
    if (!key || !/^(og|twitter):/.test(key)) continue;
    (out[key] ||= []).push(attr(tag, 'content') ?? '');
  }
  return out;
}
