import { SiteHeader } from 'mitchjmiller-com';

const nav = [
  { label: 'Services', href: '/services/', children: [
    { label: 'Research', href: '/services/#research' },
    { label: 'Strategy', href: '/services/#strategy' },
    { label: 'Delivery', href: '/services/#delivery' },
  ] },
  { label: 'Work', href: '/work/' },
  { label: 'Software', href: '/products/' },
  { label: 'Writing', href: '/writing/' },
  { label: 'About', href: '/about/' },
];

export const Default = () => (
  <SiteHeader
    brandName="Mitchell Miller"
    brandTagline="Research · Strategy · Design · Engineering"
    primaryNav={nav}
    utilityNav={[{ label: 'Résumé', href: '/resume/' }, { label: 'Lab', href: '/lab/' }]}
    ctaLabel="Start a conversation"
    ctaHref="/contact/"
    currentPath="/work/"
  />
);

export const Minimal = () => (
  <SiteHeader brandName="Mitchell Miller" primaryNav={[{ label: 'Work', href: '/work/' }, { label: 'About', href: '/about/' }]} ctaLabel="Contact" ctaHref="/contact/" />
);
