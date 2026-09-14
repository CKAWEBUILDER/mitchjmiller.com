// Agency shell configuration: navigation, footer columns, site constants and
// JSON-LD builders shared by AgencyLayout.astro and the home/services pages.
// Truthful by construction: no team size, client counts, prices or invented results.
import { headshot } from '../../baseline/src/lib/images';

export const site = {
  name: 'Mitchell Miller',
  legalName: 'Mitchell Miller — Digital Growth, Software & Consulting',
  tagline: 'Digital growth. Software. Consulting.',
  url: 'https://mitchjmiller.com',
  email: 'mitchelljmillerjr26@gmail.com',
  phone: '+1-626-316-8682',
  linkedin: 'https://linkedin.com/in/mitchelljmillerjr',
  socialImage: '/images/portfolio-social.png',
  headshot,
  jobTitle: 'Director of SEO, AEO/GEO & AI Search Systems',
} as const;

export interface NavLink { label: string; href: string; }
export interface NavItem extends NavLink { children?: NavLink[]; }

export const primaryNav: NavItem[] = [
  { label: 'Services', href: '/services/', children: [
    { label: 'Research & analytics', href: '/services/#understand' },
    { label: 'Websites & experience design', href: '/services/#design' },
    { label: 'Software & automation', href: '/services/#build' },
    { label: 'SEO, AI search & conversion', href: '/services/#grow' },
  ] },
  { label: 'Products', href: '/products/', children: [
    { label: 'Software & tools', href: '/products/' },
    { label: 'Population workbench — try free', href: '/lab/population-workbench/' },
    { label: 'DomainSignal', href: '/products/#domainsignal' },
    { label: 'Date Night', href: '/products/#date-night' },
  ] },
  { label: 'Work', href: '/work/', children: [
    { label: 'All work', href: '/work/' },
    { label: 'Case studies', href: '/case-studies/' },
    { label: 'Selected builds', href: '/selected-builds/' },
    { label: 'Systems architecture', href: '/systems/' },
    { label: 'AEO/GEO methodology', href: '/aeo-geo/' },
  ] },
  { label: 'Lab', href: '/lab/', children: [
    { label: 'Interactive tools', href: '/lab/' },
    { label: 'Population workbench', href: '/lab/population-workbench/' },
    { label: 'Workbench methodology', href: '/lab/population-workbench/methodology/' },
  ] },
  { label: 'Writing', href: '/blog/' },
  { label: 'About', href: '/about/' },
];
export const utilityNav: NavLink[] = [
  { label: 'Resumes', href: '/resume/' },
  { label: 'Clients', href: '/clients/' },
];
export const contactCta: NavLink = { label: 'Let’s talk', href: '/contact/' };

export const footerColumns: { heading: string; links: NavLink[] }[] = [
  { heading: 'Services', links: [
    { label: 'All services', href: '/services/' },
    { label: 'Understand', href: '/services/#understand' },
    { label: 'Design', href: '/services/#design' },
    { label: 'Build', href: '/services/#build' },
    { label: 'Grow', href: '/services/#grow' },
    { label: 'How we work', href: '/services/#process' },
  ] },
  { heading: 'Work', links: [
    { label: 'All work', href: '/work/' },
    { label: 'Case studies', href: '/case-studies/' },
    { label: 'Selected builds', href: '/selected-builds/' },
    { label: 'Systems architecture', href: '/systems/' },
    { label: 'AEO/GEO methodology', href: '/aeo-geo/' },
    { label: 'Collaboration ideas', href: '/collab-ideas/' },
  ] },
  { heading: 'Products & resources', links: [
    { label: 'Software & tools', href: '/products/' },
    { label: 'Interactive lab', href: '/lab/' },
    { label: 'Population workbench', href: '/lab/population-workbench/' },
    { label: 'Signals & Systems', href: '/blog/' },
  ] },
  { heading: 'Company', links: [
    { label: 'About', href: '/about/' },
    { label: 'Contact', href: '/contact/' },
    { label: 'Resumes', href: '/resume/' },
    { label: 'Client sign-in', href: '/clients/' },
  ] },
];

export const isCurrent = (path: string, href: string) => {
  const clean = href.split('#')[0];
  if (clean === '/') return path === '/';
  return path === clean || path.startsWith(clean);
};

const organizationId = `${site.url}/#organization`;
const personId = `${site.url}/#person`;

export function organizationJsonLd() {
  return {
    '@type': 'ProfessionalService',
    '@id': organizationId,
    name: site.legalName,
    alternateName: site.name,
    url: `${site.url}/`,
    description: 'Search, growth and AI-search systems for enterprises and growing businesses: research and measurement, experience and content design, systems and tools, and organic growth.',
    email: site.email,
    telephone: site.phone,
    image: `${site.url}${site.socialImage}`,
    logo: `${site.url}${site.socialImage}`,
    areaServed: 'United States',
    founder: { '@id': personId },
    sameAs: [site.linkedin],
    knowsAbout: ['Enterprise SEO', 'AI search (AEO/GEO)', 'Entity and structured data systems', 'Content architecture', 'Measurement and analytics', 'Conversion optimization'],
  };
}

export function personJsonLd() {
  return {
    '@type': 'Person',
    '@id': personId,
    name: site.name,
    url: `${site.url}/about/`,
    image: `${site.url}${site.headshot}`,
    jobTitle: site.jobTitle,
    worksFor: { '@id': organizationId },
    sameAs: [site.linkedin],
    email: site.email,
  };
}

export function graph(...items: Record<string, unknown>[]) {
  return { '@context': 'https://schema.org', '@graph': items };
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: `${site.url}${item.href}` })),
  };
}
