import { Panel } from 'mitchjmiller-com';

export const WithItems = () => (
  <Panel title="What you get" items={['A written finding, not a deck of screenshots', 'The sequence, sized and costed', 'Measurement defined before anything ships']} />
);

export const WithProse = () => (
  <Panel title="How engagements start">
    <p style={{ color: 'var(--ag-muted)', fontSize: '.93rem' }}>
      A short paid discovery: two weeks, one written finding, and a decision about whether the rest is worth funding.
    </p>
  </Panel>
);
