import { BrandMarquee } from 'mitchjmiller-com';

export const Default = () => (
  <BrandMarquee label="Experience across" brands={[
    { name: 'Apple' },
    { name: 'Stanford Health Care' },
    { name: 'Dignity Health' },
    { name: 'CommonSpirit Health' },
    { name: 'SFC Surf School' },
  ]} />
);

export const WithNotes = () => (
  <BrandMarquee label="Experience across" brands={[
    { name: 'Apple', note: 'employer' },
    { name: 'Stanford Health Care', note: 'interim' },
    { name: 'CommonSpirit Health', note: 'via agency' },
  ]} />
);
