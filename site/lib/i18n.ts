// Languages (docs/site-standards.md "Languages"): English is canonical, Spanish is the pilot.
// Translation pairs come from one place, the route manifest: a Spanish route is kind "added"
// with lang "es" and translationOf "<English path>". AgencyLayout.astro emits hreflang
// (self, reciprocal, x-default → English), og:locale(:alternate), the header language picker
// and the suggestion banner from these helpers; scripts/finalize-parity.mjs writes the same
// alternates into the sitemap. English UI strings below equal the shell's original text.
import manifest from '../../docs/implementation-2026-09-11/route-manifest.json';
import { primaryNav, utilityNav, contactCta, footerColumns, type NavItem, type NavLink } from './agency';
import { esUi, esNav } from '../i18n/es';

export type Lang = 'en' | 'es';
export const origin = 'https://mj2.pro';
export const languageNames: Record<Lang, string> = { en: 'English', es: 'Español' };

interface ManifestRoute { path: string; kind: string; lang?: string; translationOf?: string }
const routes = (manifest as { routes: ManifestRoute[] }).routes;
/** English path → Spanish path (both with trailing slash). */
export const spanishOf = new Map(routes.filter(route => route.lang === 'es' && route.translationOf).map(route => [route.translationOf!, route.path]));
/** Spanish path → English path. */
export const englishOf = new Map([...spanishOf].map(([en, es]) => [es, en]));
export const langOf = (path: string): Lang => /^\/es(\/|$)/.test(path) ? 'es' : 'en';

/** hreflang set for a canonical path: self, the translation when it exists, x-default → English. */
export function alternatesFor(path: string): { hreflang: string; href: string }[] {
  if (path === '/404.html') return [];
  const lang = langOf(path);
  const en = lang === 'en' ? path : englishOf.get(path);
  if (!en) throw new Error(`Spanish page ${path} is not declared as a translation in the route manifest`);
  const es = lang === 'es' ? path : spanishOf.get(path);
  return [
    { hreflang: 'en', href: `${origin}${en}` },
    ...(es ? [{ hreflang: 'es', href: `${origin}${es}` }] : []),
    { hreflang: 'x-default', href: `${origin}${en}` },
  ];
}

/** The same page in the other language, if it exists. */
export const counterpartOf = (path: string) => langOf(path) === 'es' ? englishOf.get(path) : spanishOf.get(path);

export const ui = {
  en: {
    skip: 'Skip to content', brandHome: 'Mitchell Miller — home', tagline: 'Digital growth. Software. Consulting.',
    primaryNav: 'Primary', mobileNav: 'Mobile', menu: 'Menu', openMenu: 'Open navigation', darkTheme: 'Dark theme',
    language: 'Language', homeOnly: '(home page)',
    footerBlurb: 'Digital strategy, websites, software and analytics for growing businesses. Work directly with Mitchell Miller.',
    country: 'United States',
    footerNote: 'Case studies describe work delivered in the roles and periods stated on each page.',
    footerLinks: [{ label: 'Mitch’s portfolio', href: 'https://mitchjmiller.com/' }, { label: 'Client sign-in', href: '/clients/' }, { label: 'Contact', href: '/contact/' }],
    banner: { region: 'Language suggestion', text: 'This page is also available in English.', go: 'Read in English', dismiss: 'No, thanks' },
  },
  es: esUi,
} as const;

export function navFor(lang: Lang): { primary: NavItem[]; utility: NavLink[]; cta: NavLink; footer: { heading: string; links: NavLink[] }[] } {
  return lang === 'es' ? esNav : { primary: primaryNav, utility: utilityNav, cta: contactCta, footer: footerColumns };
}

const monthsEs: Record<string, string> = { January: 'enero', February: 'febrero', March: 'marzo', April: 'abril', May: 'mayo', June: 'junio', July: 'julio', August: 'agosto', September: 'septiembre', October: 'octubre', November: 'noviembre', December: 'diciembre' };
/** "September 24, 2026" → "24 de septiembre de 2026"; "August 2026" → "agosto de 2026"; anything else unchanged. */
export function esDate(value: string) {
  const day = value.match(/^([A-Z][a-z]+) (\d{1,2}), (\d{4})$/);
  if (day && monthsEs[day[1]]) return `${Number(day[2])} de ${monthsEs[day[1]]} de ${day[3]}`;
  const month = value.match(/^([A-Z][a-z]+) (\d{4})$/);
  if (month && monthsEs[month[1]]) return `${monthsEs[month[1]]} de ${month[2]}`;
  return value;
}
