import { PostList } from 'mitchjmiller-com';

export const Default = () => (
  <PostList items={[
    { title: 'Growth engineering without the title', href: '/writing/growth-engineering/', date: 'September 14, 2026', summary: 'What the role actually does once you strip the job ad.' },
    { title: 'Grounding GBP in the AI answer layer', href: '/blog/gbp-2026-ai-grounding/', date: 'August 2, 2026', summary: 'Local entities are how assistants decide who is real.' },
    { title: 'Hermes concepts: a field guide', href: '/blog/studying/hermes-concepts-field-guide/', date: 'July 19, 2026', summary: 'Routing work to the right executor without a framework.' },
  ]} />
);

export const NoSummaries = () => (
  <PostList items={[
    { title: 'Growth engineering without the title', href: '/writing/growth-engineering/', date: 'September 14, 2026' },
    { title: 'Grounding GBP in the AI answer layer', href: '/blog/gbp-2026-ai-grounding/', date: 'August 2, 2026' },
  ]} />
);
