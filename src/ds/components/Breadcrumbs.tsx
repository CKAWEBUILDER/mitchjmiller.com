export interface Crumb {
  label: string;
  /** Omit on the final crumb to render it as plain text. */
  href?: string;
}

export interface BreadcrumbsProps {
  items: Crumb[];
  className?: string;
}

/** Slash-separated trail. Designed for the navy hero, where it renders in white on navy. */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <ol className={['ag-crumbs', className].filter(Boolean).join(' ')}>
      {items.map((c) => <li key={c.label}>{c.href ? <a href={c.href}>{c.label}</a> : c.label}</li>)}
    </ol>
  );
}
