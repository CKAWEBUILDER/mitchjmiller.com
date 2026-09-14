// The site shell (header, navigation, footer, resume dialog) is rendered once by
// site/layouts/AgencyLayout.astro around every page since the 2026-09-14 agency
// redesign. The archived page bodies keep calling <Layout>, which now only
// returns its children so their content stays byte-comparable to production.
export function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
