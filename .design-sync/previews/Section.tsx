import { Section, SectionHead, Grid, Tile } from 'mitchjmiller-com';

const cards = (
  <Grid cols={3}>
    <Tile title="Research" linkHref="/services/#research" linkLabel="What that looks like">Find the real question before spending a budget answering the wrong one.</Tile>
    <Tile title="Strategy" linkHref="/services/#strategy" linkLabel="What that looks like">Turn the finding into a sequence someone can actually fund and ship.</Tile>
    <Tile title="Delivery" linkHref="/services/#delivery" linkLabel="What that looks like">Build it, measure it, and hand over something the team can run.</Tile>
  </Grid>
);

export const Plain = () => (
  <Section>
    <SectionHead eyebrow="Services" title="Clear thinking. Useful work." deck="One challenge or the whole journey." linkHref="/services/" linkLabel="All services" />
    {cards}
  </Section>
);

export const Tint = () => (
  <Section tone="tint">
    <SectionHead eyebrow="Selected work" title="The work makes it tangible." />
    {cards}
  </Section>
);

export const TopLine = () => (
  <Section topLine>
    <SectionHead eyebrow="Industries" title="Different worlds. Connected thinking." />
  </Section>
);
