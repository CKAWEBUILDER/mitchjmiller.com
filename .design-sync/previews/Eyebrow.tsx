import { Eyebrow } from 'mitchjmiller-com';

export const Default = () => <Eyebrow>Selected work</Eyebrow>;

export const AboveHeading = () => (
  <div>
    <Eyebrow>Objectives</Eyebrow>
    <h2 style={{ fontSize: '2.2rem', lineHeight: 1.2 }}>What could come next?</h2>
  </div>
);

export const OnNavy = () => (
  <div className="ag-dark" style={{ background: 'var(--ag-navy)', padding: 32 }}>
    <Eyebrow>Research · Strategy · Design · Engineering</Eyebrow>
    <h2 style={{ color: '#fff', fontSize: '2rem' }}>Make the next move matter.</h2>
  </div>
);
