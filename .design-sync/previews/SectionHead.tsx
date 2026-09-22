import { SectionHead } from 'mitchjmiller-com';

export const WithLink = () => (
  <SectionHead eyebrow="Selected work" title="The work makes it tangible." deck="A closer look at the questions, decisions and measured outcomes behind four engagements." linkHref="/work/" linkLabel="All work" />
);

export const TitleOnly = () => <SectionHead title="What could come next?" />;

export const WithDeck = () => (
  <SectionHead eyebrow="Objectives" title="What could come next?" deck="A sharper question can open a different route. These are the ones clients bring most often." />
);
