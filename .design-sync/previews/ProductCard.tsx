import { ProductCard, Grid, Button } from 'mitchjmiller-com';

export const Released = () => (
  <ProductCard name="Population Workbench" status="Released" action={<Button href="/lab/population-workbench/">Open the workbench</Button>}>
    An interactive simulation for reasoning about population change without a statistics degree.
  </ProductCard>
);

export const Pair = () => (
  <Grid cols={2}>
    <ProductCard name="Population Workbench" status="Released" action={<Button size="sm" href="/lab/population-workbench/">Open it</Button>}>
      An interactive simulation for reasoning about population change without a statistics degree.
    </ProductCard>
    <ProductCard name="ClarityPulse" status="In development" action={<Button size="sm" variant="ghost" href="/contact/">Ask about access</Button>}>
      Reporting that keeps the evidence one click from the claim.
    </ProductCard>
  </Grid>
);
