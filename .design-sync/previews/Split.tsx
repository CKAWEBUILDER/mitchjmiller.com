import { Split, Panel, PostList, TextLink, Button } from 'mitchjmiller-com';

export const WithPanel = () => (
  <Split aside={<Panel title="What you get" items={['A written finding', 'A costed sequence', 'Measurement defined up front']} />}>
    <h2 style={{ fontSize: '2rem' }}>The lab is where the thinking gets tested.</h2>
    <p>Small tools, built end to end, released when they are useful to someone other than me.</p>
    <Button href="/lab/">Open the lab</Button>
  </Split>
);

export const WithPosts = () => (
  <Split aside={<PostList items={[
    { title: 'Growth engineering without the title', href: '/writing/growth-engineering/', date: 'September 14, 2026', summary: 'What the role actually does once you strip the job ad.' },
    { title: 'Grounding GBP in the AI answer layer', href: '/blog/gbp-2026-ai-grounding/', date: 'August 2, 2026', summary: 'Local entities are how assistants decide who is real.' },
  ]} />}>
    <h2 style={{ fontSize: '2rem' }}>Notes from the work.</h2>
    <p>Written when something turned out differently than expected — not on a content calendar.</p>
    <TextLink href="/writing/">All writing</TextLink>
  </Split>
);
