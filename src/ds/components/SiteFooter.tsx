export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface SiteFooterProps {
  brandName: string;
  brandHref?: string;
  /** Short positioning line under the brand. */
  blurb?: string;
  /** Email, phone or location lines. */
  contact?: { label: string; href?: string }[];
  columns?: FooterColumn[];
  /** Left-hand line in the bottom rule, e.g. a copyright. */
  legal?: string;
  /** Right-hand links in the bottom rule. */
  bottomLinks?: { label: string; href: string }[];
  className?: string;
}

/** Five-column white footer with a ruled legal strip. Closes every page under the CTA band. */
export function SiteFooter({ brandName, brandHref = '/', blurb, contact = [], columns = [], legal, bottomLinks = [], className }: SiteFooterProps) {
  return (
    <footer className={['ag-footer', className].filter(Boolean).join(' ')}>
      <div className="ag-wrap">
        <div className="ag-footer-main">
          <div>
            <a className="ag-footer-brand" href={brandHref}>{brandName}</a>
            {blurb ? <p className="ag-footer-blurb">{blurb}</p> : null}
            {contact.length ? (
              <ul className="ag-footer-contact">
                {contact.map((c) => <li key={c.label}>{c.href ? <a href={c.href}>{c.label}</a> : c.label}</li>)}
              </ul>
            ) : null}
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h2>{col.title}</h2>
              <ul>{col.links.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="ag-footer-bottom">
          <span>{legal}</span>
          <span>{bottomLinks.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}</span>
        </div>
      </div>
    </footer>
  );
}
