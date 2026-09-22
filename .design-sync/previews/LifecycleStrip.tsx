import { LifecycleStrip } from 'mitchjmiller-com';

export const Default = () => (
  <LifecycleStrip stages={[
    { title: 'Research', note: 'Find the real question.', href: '/services/#research' },
    { title: 'Strategy', note: 'Choose the route worth funding.', href: '/services/#strategy' },
    { title: 'Design', note: 'Make the decision obvious.', href: '/services/#design' },
    { title: 'Engineering', note: 'Ship it and measure it.', href: '/services/#engineering' },
  ]} />
);

export const Unlinked = () => (
  <LifecycleStrip label="How the work fits together" stages={[
    { title: 'Discover', note: 'Two weeks, one written finding.' },
    { title: 'Decide', note: 'A sequence someone can fund.' },
    { title: 'Build', note: 'Reviewable pieces, measured.' },
    { title: 'Hand over', note: 'The team runs it without me.' },
  ]} />
);
