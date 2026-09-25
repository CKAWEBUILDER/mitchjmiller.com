// Share cards (docs/site-standards.md "Share cards"): every page gets a generated 1200×630
// M² brand card at /og/<route>.png. AgencyLayout.astro emits the tags plus a transient
// <meta name="mj2:card"> marker; scripts/share-cards.mjs renders the PNG from
// scripts/share-card.html, removes the marker and adds the same tags to the standalone
// documents (the SFC report and the /viz/ embeds). Never Mitch's photo.
import manifest from '../../docs/implementation-2026-09-11/route-manifest.json';

export type Lang = 'en' | 'es';
export const origin = 'https://mj2.pro';
export const cardSize = { width: 1200, height: 630 } as const;
export const ogLocale: Record<Lang, string> = { en: 'en_US', es: 'es_MX' };

const sections: [RegExp, Record<Lang, string>][] = [
  [/^\/viz\//, { en: 'Interactive infographic', es: 'Infografía interactiva' }],
  [/^\/blog\/studying\//, { en: 'Study notes', es: 'Notas de estudio' }],
  [/^\/blog\/.+/, { en: 'Signals & Systems', es: 'Signals & Systems' }],
  [/^\/blog\/$/, { en: 'Writing', es: 'Artículos' }],
  [/^\/case-studies\/.+/, { en: 'Case study', es: 'Caso de estudio' }],
  [/^\/case-studies\/$/, { en: 'Case studies', es: 'Casos de estudio' }],
  [/^\/(work|selected-builds|systems|aeo-geo|collab-ideas)\//, { en: 'Work', es: 'Trabajo' }],
  [/^\/services\//, { en: 'Services', es: 'Servicios' }],
  [/^\/products\//, { en: 'Software & tools', es: 'Software y herramientas' }],
  [/^\/lab\//, { en: 'Lab', es: 'Laboratorio' }],
  [/^\/about\//, { en: 'About', es: 'Acerca de' }],
  [/^\/contact\//, { en: 'Contact', es: 'Contacto' }],
  [/^\/resume\//, { en: 'Resumes', es: 'Currículums' }],
  [/^\/clients\//, { en: 'Clients', es: 'Clientes' }],
];

/** Route without the /es prefix, always with a trailing slash ("/" for the home page). */
export function basePath(route: string) {
  const clean = route === '/404.html' ? '/404/' : route;
  const stripped = clean.replace(/^\/es(?=\/|$)/, '') || '/';
  return stripped.endsWith('/') ? stripped : `${stripped}/`;
}
export const langOf = (route: string): Lang => /^\/es(\/|$)/.test(route) ? 'es' : 'en';

export function sectionFor(route: string, lang: Lang = langOf(route)) {
  const path = basePath(route);
  const hit = sections.find(([pattern]) => pattern.test(path));
  return hit ? hit[1][lang] : 'Mitchell Miller';
}

/** The page title without the site-name suffixes the <title> carries for search results. */
export function cardTitleFor(title: string) {
  return title
    .replace(/\s+\|\s+(Signals & Systems|Mitchell Miller|Studying — Mitchell Miller)$/u, '')
    .replace(/\s+[·—]\s+Mitchell Miller$/u, '')
    .replace(/^Mitchell Miller\s+—\s+/u, '')
    .trim();
}

/** /og/home.png, /og/services.png, /og/blog/<slug>.png, /og/es/home.png … */
export function cardPath(route: string) {
  const lang = langOf(route);
  const path = basePath(route).replace(/^\/|\/$/g, '') || 'home';
  return `/og/${lang === 'es' ? 'es/' : ''}${path}.png`;
}

interface Embed { path: string; embeddedIn: string; title: string; files: string[] }
const embeds = ((manifest as { embeds?: Embed[] }).embeds || []);

/** A post's own living artifact: the first declared embed whose poster-1080x1350.png ships. */
export function posterFor(route: string): { src: string; title: string } | undefined {
  const path = basePath(route);
  const own = embeds.find(embed => embed.path === path);
  const hosted = embeds.find(embed => embed.embeddedIn === path);
  const embed = own || hosted;
  if (!embed || !embed.files.includes('poster-1080x1350.png')) return undefined;
  return { src: `${embed.path}poster-1080x1350.png`, title: embed.title };
}

export function cardAlt(cardTitle: string, section: string, lang: Lang, posterTitle?: string) {
  const own = posterTitle && posterTitle === cardTitle;
  if (lang === 'es') return `Tarjeta de mj2.pro: «${cardTitle}» (${section})${posterTitle ? (own ? ', junto a su póster' : `, junto al póster de «${posterTitle}»`) : ''}.`;
  return `mj2.pro card: “${cardTitle}” (${section})${posterTitle ? (own ? ', beside its poster' : `, beside the poster of “${posterTitle}”`) : ''}.`;
}

export interface CardSpec { title: string; section: string; lang: Lang; poster?: string; route: string }

export function shareFor(route: string, title: string, options: { cardTitle?: string; poster?: { src: string; title: string } } = {}) {
  const lang = langOf(route);
  const cardTitle = options.cardTitle || cardTitleFor(title);
  const section = sectionFor(route, lang);
  const poster = options.poster || posterFor(route);
  const image = `${origin}${cardPath(route)}`;
  const spec: CardSpec = { title: cardTitle, section, lang, poster: poster?.src, route };
  return { image, alt: cardAlt(cardTitle, section, lang, poster?.title), locale: ogLocale[lang], spec };
}
