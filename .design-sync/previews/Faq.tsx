import { FAQ } from 'mitchjmiller-com';

const items = [
  { question: 'How do engagements usually start?', answer: 'A short paid discovery: two weeks, one written finding, and an honest call about whether the rest is worth funding.' },
  { question: 'Do you work with in-house teams or replace them?', answer: 'With them. The handover is part of the work — if a team cannot run it after I leave, it was not finished.' },
  { question: 'What does "measured outcome" mean here?', answer: 'A number defined before the build, read from the client’s own analytics, with the period and the definition stated alongside it.' },
];

export const Default = () => <FAQ items={items} />;

export const FirstOpen = () => <FAQ items={items} defaultOpenFirst />;
