import { WorkCard, Grid } from 'mitchjmiller-com';

export const Default = () => (
  <WorkCard
    eyebrow="CommonSpirit Health · Healthcare"
    title="A clearer path from finding care to taking action."
    href="/case-studies/commonspirit-locations-conversion-engine/"
    metric="+180%"
    metricLabel="Appointment starts · 2024 vs 2023"
  >
    Location pages rebuilt around the decision a patient is actually making.
  </WorkCard>
);

export const Pair = () => (
  <Grid cols={2}>
    <WorkCard
      eyebrow="Apple · Consumer"
      title="Search planning for the moments customers care about."
      href="/case-studies/apple-seasonal-search/"
      metric="4 regions"
      metricLabel="Americas seasonal planning cycle"
    >
      Seasonal demand mapped to the pages that had to be ready before it arrived.
    </WorkCard>
    <WorkCard
      eyebrow="SFC Surf School · Local"
      title="Local insight, useful experiences and a path to the water."
      href="/case-studies/sfc-surf-school/"
      metric="#1"
      metricLabel="Waikiki surf lessons · local pack"
    >
      A small operator made the obvious choice for visitors deciding on the beach.
    </WorkCard>
  </Grid>
);

export const NoMetric = () => (
  <WorkCard
    eyebrow="ClarityPulse · Internal tool"
    title="An internal reporting prototype that keeps evidence close to the answer."
    href="/case-studies/claritypulse-ai-reporting/"
  >
    Every number on the page links back to the query that produced it.
  </WorkCard>
);
