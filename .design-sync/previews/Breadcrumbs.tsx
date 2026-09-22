import { Breadcrumbs } from 'mitchjmiller-com';

export const OnNavy = () => (
  <div style={{ background: 'var(--ag-navy)', padding: 32 }}>
    <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Case studies', href: '/work/' }, { label: 'CommonSpirit Health' }]} />
  </div>
);

export const TwoLevel = () => (
  <div style={{ background: 'var(--ag-navy)', padding: 32 }}>
    <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Services' }]} />
  </div>
);
