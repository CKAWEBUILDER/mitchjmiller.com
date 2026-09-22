import { Stage } from 'mitchjmiller-com';

export const Full = () => (
  <Stage
    id="research"
    eyebrow="Stage 01"
    title="Research"
    lede="Interviews, server logs and search demand read together, so the finding survives contact with the people who have to act on it."
    evidence={[
      { label: 'CommonSpirit location rebuild', href: '/case-studies/commonspirit-locations-conversion-engine/', note: 'Healthcare · 2024' },
      { label: 'Apple seasonal search planning', href: '/case-studies/apple-seasonal-search/', note: 'Consumer · 2022–2024' },
    ]}
  >
    <div>
      <h3>What happens</h3>
      <ul><li>Stakeholder interviews</li><li>Log and query analysis</li><li>Demand sized against real intent</li></ul>
    </div>
    <div>
      <h3>What you get</h3>
      <ul><li>One written finding</li><li>The question, sharpened</li><li>A costed route</li></ul>
    </div>
    <div>
      <h3>How long</h3>
      <p>Two weeks for a discovery. Longer only when access to data or people is the constraint.</p>
    </div>
  </Stage>
);

export const WithProof = () => (
  <Stage
    id="delivery"
    eyebrow="Stage 04"
    title="Delivery"
    lede="Shipped in reviewable pieces, with the measurement wired in before launch rather than reconstructed after it."
    proof={{ label: 'See the evidence behind this stage', items: [
      { label: 'CommonSpirit: +180% appointment starts', href: '/case-studies/commonspirit-locations-conversion-engine/', note: '2024 vs 2023, client analytics.' },
      { label: 'SFC Surf School: #1 local pack', href: '/case-studies/sfc-surf-school/', note: 'Waikiki surf lessons, tracked position.' },
    ] }}
  >
    <div>
      <h3>What happens</h3>
      <ul><li>Build in small, reviewable changes</li><li>Instrument before launch</li><li>Hand over runnable documentation</li></ul>
    </div>
    <div>
      <h3>What you get</h3>
      <p>Working software or published content, plus the measurement that says whether it moved.</p>
    </div>
    <div>
      <h3>Who runs it after</h3>
      <p>Your team. If they cannot, the engagement was not finished.</p>
    </div>
  </Stage>
);
