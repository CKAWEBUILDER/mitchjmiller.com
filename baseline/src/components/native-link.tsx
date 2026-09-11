import type { AnchorHTMLAttributes } from "react";

// Render native navigation at build time. No router interception or hydration.
export function Link(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...props} />;
}
