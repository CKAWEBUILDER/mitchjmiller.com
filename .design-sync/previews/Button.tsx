import { Button } from 'mitchjmiller-com';

export const Primary = () => <Button href="/contact/">Start a conversation</Button>;

export const Variants = () => (
  <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
    <Button href="/contact/">Start a conversation</Button>
    <Button variant="ghost" href="/work/">See the work</Button>
  </div>
);

export const OnNavy = () => (
  <div style={{ background: 'var(--ag-navy)', padding: 32, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
    <Button href="/contact/">Start a conversation</Button>
    <Button variant="light" href="/services/">How the work runs</Button>
  </div>
);

export const Small = () => (
  <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
    <Button size="sm" href="/contact/">Contact</Button>
    <Button size="sm" variant="ghost" href="/resume/">Résumé</Button>
  </div>
);
