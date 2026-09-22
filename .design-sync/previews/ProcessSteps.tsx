import { ProcessSteps } from 'mitchjmiller-com';

export const FourSteps = () => (
  <ProcessSteps steps={[
    { title: 'Discover', body: 'Interviews, logs and demand data, read together rather than in separate reports.' },
    { title: 'Decide', body: 'One written finding and the route worth funding, sized against what it will take.' },
    { title: 'Build', body: 'Shipped in reviewable pieces, with the measurement wired in before launch.' },
    { title: 'Measure', body: 'Prove the change moved the number, or say plainly that it did not.' },
  ]} />
);

export const ThreeSteps = () => (
  <ProcessSteps steps={[
    { title: 'Discover', body: 'Find the real question before spending a budget answering the wrong one.' },
    { title: 'Decide', body: 'Turn the finding into a sequence someone can actually fund.' },
    { title: 'Build', body: 'Ship it, measure it, hand it over.' },
  ]} />
);
