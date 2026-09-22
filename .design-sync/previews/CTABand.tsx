import { CTABand, Button } from 'mitchjmiller-com';

export const Default = () => (
  <CTABand
    title="Start with the question you cannot answer yet."
    actions={<><Button href="/contact/">Start a conversation</Button><Button variant="light" href="/services/">How the work runs</Button></>}
  >
    A short paid discovery is usually the cheapest way to find out whether the rest is worth funding.
  </CTABand>
);

export const SingleAction = () => (
  <CTABand title="Ready when you are." actions={<Button href="/contact/">Start a conversation</Button>} />
);
