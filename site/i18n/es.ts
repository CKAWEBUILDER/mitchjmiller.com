// Spanish (pilot) shell strings and navigation, neutral Latin American register ("tú").
// Drafted by the model and checked by an independent review pass (route manifest
// "translation" records); terms Spanish-speaking marketers use in English stay in English.
// Links to pages that exist only in English keep their English URLs; the layout marks them
// hreflang="en".
import type { NavItem, NavLink } from '../lib/agency';

export const esUi = {
  skip: 'Saltar al contenido', brandHome: 'Mitchell Miller — inicio', tagline: 'Crecimiento digital. Software. Consultoría.',
  primaryNav: 'Principal', mobileNav: 'Navegación móvil', menu: 'Menú', openMenu: 'Abrir la navegación', darkTheme: 'Tema oscuro',
  language: 'Idioma', homeOnly: '(página de inicio)',
  footerBlurb: 'Estrategia digital, sitios web, software y analítica para empresas en crecimiento. Trabaja directamente con Mitchell Miller.',
  country: 'Estados Unidos',
  footerNote: 'Los casos de estudio describen trabajo realizado en los roles y periodos que indica cada página.',
  footerLinks: [{ label: 'Portafolio de Mitch (en inglés)', href: 'https://mitchjmiller.com/' }, { label: 'Acceso de clientes', href: '/clients/' }, { label: 'Contacto', href: '/es/contact/' }],
  banner: { region: 'Sugerencia de idioma', text: 'Esta página también está disponible en español.', go: 'Leer en español', dismiss: 'No, gracias' },
} as const;

const primary: NavItem[] = [
  { label: 'Servicios', href: '/es/services/', children: [
    { label: 'Investigación y analítica', href: '/es/services/#understand' },
    { label: 'Sitios web y diseño de experiencia', href: '/es/services/#design' },
    { label: 'Software y automatización', href: '/es/services/#build' },
    { label: 'SEO, búsqueda con IA y conversión', href: '/es/services/#grow' },
  ] },
  { label: 'Productos', href: '/products/', children: [
    { label: 'Software y herramientas', href: '/products/' },
    { label: 'Population Workbench: pruébalo gratis', href: '/lab/population-workbench/' },
    { label: 'DomainSignal', href: '/products/#domainsignal' },
    { label: 'Date Night', href: '/products/#date-night' },
  ] },
  { label: 'Portafolio', href: '/work/', children: [
    { label: 'Todo el portafolio', href: '/work/' },
    { label: 'Casos de estudio', href: '/case-studies/' },
    { label: 'Proyectos seleccionados', href: '/selected-builds/' },
    { label: 'Arquitectura de sistemas', href: '/systems/' },
    { label: 'Metodología AEO/GEO', href: '/aeo-geo/' },
  ] },
  { label: 'Laboratorio', href: '/lab/', children: [
    { label: 'Herramientas interactivas', href: '/lab/' },
    { label: 'Population Workbench', href: '/lab/population-workbench/' },
    { label: 'Metodología de Population Workbench', href: '/lab/population-workbench/methodology/' },
  ] },
  { label: 'Artículos', href: '/es/blog/' },
  { label: 'Acerca de', href: '/about/' },
];

export const esNav = {
  primary,
  utility: [{ label: 'Portafolio de Mitch', href: 'https://mitchjmiller.com/' }, { label: 'Clientes', href: '/clients/' }] as NavLink[],
  cta: { label: 'Hablemos', href: '/es/contact/' } as NavLink,
  footer: [
    { heading: 'Servicios', links: [
      { label: 'Todos los servicios', href: '/es/services/' },
      { label: 'Comprender', href: '/es/services/#understand' },
      { label: 'Diseñar', href: '/es/services/#design' },
      { label: 'Construir', href: '/es/services/#build' },
      { label: 'Crecer', href: '/es/services/#grow' },
      { label: 'Cómo trabajamos', href: '/es/services/#process' },
    ] },
    { heading: 'Portafolio', links: [
      { label: 'Todo el portafolio', href: '/work/' },
      { label: 'Casos de estudio', href: '/case-studies/' },
      { label: 'Proyectos seleccionados', href: '/selected-builds/' },
      { label: 'Arquitectura de sistemas', href: '/systems/' },
      { label: 'Metodología AEO/GEO', href: '/aeo-geo/' },
      { label: 'Ideas de colaboración', href: '/collab-ideas/' },
    ] },
    { heading: 'Productos y recursos', links: [
      { label: 'Software y herramientas', href: '/products/' },
      { label: 'Laboratorio interactivo', href: '/lab/' },
      { label: 'Population Workbench', href: '/lab/population-workbench/' },
      { label: 'Signals & Systems', href: '/es/blog/' },
    ] },
    { heading: 'Empresa', links: [
      { label: 'Acerca de', href: '/about/' },
      { label: 'Contacto', href: '/es/contact/' },
      { label: 'Portafolio de Mitch (en inglés)', href: 'https://mitchjmiller.com/' },
      { label: 'Acceso de clientes', href: '/clients/' },
    ] },
  ],
};
