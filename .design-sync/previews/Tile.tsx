import { Tile, Grid } from 'mitchjmiller-com';

export const Default = () => (
  <Tile title="Enterprise search" linkHref="/services/#search" linkLabel="What that looks like">
    Regulated, multi-market systems where a ranking change is a compliance question too.
  </Tile>
);

export const WithIcon = () => (
  <Grid cols={2}>
    <Tile icon="RS" title="Research" linkHref="/services/#research" linkLabel="What that looks like">Find the real question before spending a budget answering the wrong one.</Tile>
    <Tile icon="DL" title="Delivery" linkHref="/services/#delivery" linkLabel="What that looks like">Build it, measure it, hand over something the team can run.</Tile>
  </Grid>
);

export const WithBullets = () => (
  <Tile num="02" title="Strategy" bullets={['Opportunity sizing against real demand', 'A sequence someone can fund', 'The measurement defined before the build']}>
    Turn the finding into something a team can commit to this quarter.
  </Tile>
);

export const Tinted = () => (
  <Grid cols={2}>
    <Tile tint title="Healthcare" href="/work/">Regulated content, real patient decisions, and a review process that cannot be skipped.</Tile>
    <Tile tint title="Consumer" href="/work/">Seasonal demand and a short window to be the obvious answer.</Tile>
  </Grid>
);
