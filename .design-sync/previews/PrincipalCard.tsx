import { PrincipalCard } from 'mitchjmiller-com';

export const Default = () => (
  <PrincipalCard name="Mitchell Miller" role="Principal · research, strategy, design and engineering under one accountable owner." />
);

export const WithPortrait = () => (
  <PrincipalCard name="Mitchell Miller" role="Principal" imageSrc="/images/mitchell-miller.jpg" />
);
