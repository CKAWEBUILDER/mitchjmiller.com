import { SiteFooter } from 'mitchjmiller-com';

export const Default = () => (
  <SiteFooter
    brandName="Mitchell Miller"
    blurb="Research, strategy, design and engineering for organizations deciding what to build next."
    contact={[{ label: 'mitchelljmillerjr26@gmail.com', href: 'mailto:mitchelljmillerjr26@gmail.com' }, { label: 'California' }]}
    columns={[
      { title: 'Services', links: [{ label: 'Research', href: '/services/#research' }, { label: 'Strategy', href: '/services/#strategy' }, { label: 'Delivery', href: '/services/#delivery' }] },
      { title: 'Work', links: [{ label: 'Case studies', href: '/work/' }, { label: 'Software', href: '/products/' }, { label: 'Lab', href: '/lab/' }] },
      { title: 'Writing', links: [{ label: 'Notes', href: '/writing/' }, { label: 'Methodology', href: '/methodology/' }] },
      { title: 'About', links: [{ label: 'Background', href: '/about/' }, { label: 'Résumé', href: '/resume/' }, { label: 'Contact', href: '/contact/' }] },
    ]}
    legal="© 2026 Mitchell Miller"
    bottomLinks={[{ label: 'Privacy', href: '/privacy/' }]}
  />
);
