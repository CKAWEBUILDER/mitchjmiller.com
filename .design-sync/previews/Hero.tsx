import { Hero, Button } from 'mitchjmiller-com';

export const Home = () => (
  <Hero
    eyebrow="Research · Strategy · Design · Engineering"
    title={<>Make the next<br />move matter.</>}
    deck="Turn complex questions into clear direction, useful experiences and systems built for growth."
    actions={<Button href="/contact/">Start a conversation</Button>}
  />
);

export const WithImage = () => (
  <Hero
    eyebrow="Case study"
    title="A clearer path from finding care to taking action."
    deck="CommonSpirit Health location pages, rebuilt around the decision a patient is actually making."
    actions={<><Button href="/contact/">Start a conversation</Button><Button variant="light" href="/work/">See the work</Button></>}
    imageSrc="/images/cases/commonspirit-locations.png"
    imageAlt="CommonSpirit location page layout"
    imageCaption="Location template, 2024 rebuild. Screenshot captured September 2026."
  />
);

export const Interior = () => (
  <Hero
    compact
    crumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
    eyebrow="Services"
    title="Strategy through delivery."
    deck="One challenge or the whole journey — research, strategy, design and engineering under one accountable owner."
    meta={<>Independent practice. <a href="/resume/">Full background</a>.</>}
  />
);
