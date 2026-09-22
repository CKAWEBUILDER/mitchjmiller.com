import { Grid, Tile } from 'mitchjmiller-com';

const tile = (n: string, t: string, b: string) => <Tile key={t} num={n} title={t}>{b}</Tile>;

export const Three = () => (
  <Grid cols={3}>
    {tile('01', 'Research', 'Interviews, log analysis and search demand, read together.')}
    {tile('02', 'Strategy', 'A funded sequence, not a list of recommendations.')}
    {tile('03', 'Delivery', 'Shipped work with the measurement wired in.')}
  </Grid>
);

export const Four = () => (
  <Grid cols={4}>
    {tile('01', 'Discover', 'What is actually being asked.')}
    {tile('02', 'Decide', 'Which route is worth funding.')}
    {tile('03', 'Build', 'Ship it in reviewable pieces.')}
    {tile('04', 'Measure', 'Prove it moved, or change it.')}
  </Grid>
);

export const Two = () => (
  <Grid cols={2}>
    {tile('01', 'Enterprise search', 'Regulated, multi-market systems where the stakes are compliance as much as traffic.')}
    {tile('02', 'Independent products', 'Small tools built end to end, released and maintained.')}
  </Grid>
);
