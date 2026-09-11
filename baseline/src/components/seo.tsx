interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
}

// Metadata is emitted once in the Astro document head from parityRoutes.
// Kept as a no-op so the archived production page content stays easy to compare.
export function SEO(_props: SEOProps) {
  return null;
}
