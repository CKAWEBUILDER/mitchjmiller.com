import { TextLink } from 'mitchjmiller-com';

export const Default = () => <TextLink href="/work/">All work</TextLink>;

export const InRow = () => (
  <div style={{ display: 'grid', gap: 12 }}>
    <TextLink href="/services/">How the work runs</TextLink>
    <TextLink href="/writing/">Read the notes</TextLink>
    <TextLink href="/lab/" arrow={false}>Open the lab</TextLink>
  </div>
);
