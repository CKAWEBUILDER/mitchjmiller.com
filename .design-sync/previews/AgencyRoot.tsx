import { AgencyRoot, Hero, Section, SectionHead, Grid, Tile, Button } from 'mitchjmiller-com';

const body = (
  <>
    <Hero
      eyebrow="Research · Strategy · Design · Engineering"
      title={<>Make the next<br />move matter.</>}
      deck="Turn complex questions into clear direction, useful experiences and systems built for growth."
      actions={<Button href="/contact/">Start a conversation</Button>}
    />
    <Section>
      <SectionHead eyebrow="Objectives" title="What could come next?" deck="A sharper question can open a different route." />
      <Grid cols={3}>
        <Tile title="Find the real question" linkHref="/services/#research" linkLabel="Research">Before a budget goes to answering the wrong one.</Tile>
        <Tile title="Choose the route" linkHref="/services/#strategy" linkLabel="Strategy">Sized against what it will actually take.</Tile>
        <Tile title="Ship and measure" linkHref="/services/#delivery" linkLabel="Delivery">With the number defined before launch.</Tile>
      </Grid>
    </Section>
  </>
);

/** page="home" centers the hero and section heads — the live homepage composition. */
export const HomePage = () => <AgencyRoot page="home">{body}</AgencyRoot>;

/** page="default" is the left-aligned interior composition. */
export const InteriorPage = () => <AgencyRoot page="default">{body}</AgencyRoot>;
