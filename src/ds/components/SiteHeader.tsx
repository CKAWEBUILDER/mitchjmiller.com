import type { ReactNode } from 'react';

export interface NavItem {
  label: string;
  href: string;
  /** Renders a hover dropdown under the item. */
  children?: { label: string; href: string }[];
}

export interface SiteHeaderProps {
  brandName: string;
  /** Second line under the brand name. Hidden below 1180px. */
  brandTagline?: string;
  brandHref?: string;
  logoSrc?: string;
  primaryNav?: NavItem[];
  /** Plain text links to the right of the nav. */
  utilityNav?: { label: string; href: string }[];
  /** Small green CTA at the far right. */
  ctaLabel?: string;
  ctaHref?: string;
  /** Path of the current page, used to mark aria-current. */
  currentPath?: string;
  className?: string;
}

/**
 * Sticky white masthead: brand, primary nav with dropdowns, utility links and a small
 * green CTA. Below 1280px the nav swaps to a native `<details>` menu — no JavaScript.
 */
export function SiteHeader({ brandName, brandTagline, brandHref = '/', logoSrc, primaryNav = [], utilityNav = [], ctaLabel, ctaHref, currentPath, className }: SiteHeaderProps) {
  const current = (href: string) => (currentPath === href ? 'page' : undefined);
  return (
    <header className={['ag-header', className].filter(Boolean).join(' ')}>
      <div className="ag-wrap ag-header-inner">
        <a className="ag-brand" href={brandHref} aria-label={`${brandName} — home`}>
          {logoSrc ? <img src={logoSrc} alt="" width={40} height={40} /> : null}
          <span><span className="ag-brand-name">{brandName}</span>{brandTagline ? <span className="ag-brand-tag">{brandTagline}</span> : null}</span>
        </a>
        <nav className="ag-nav" aria-label="Primary">
          <ul>
            {primaryNav.map((item) => (
              <li key={item.href} className={item.children ? 'ag-has-drop' : undefined}>
                <a href={item.href} aria-current={current(item.href)}>{item.label}</a>
                {item.children ? (
                  <ul className="ag-drop">{item.children.map((c) => <li key={c.href}><a href={c.href}>{c.label}</a></li>)}</ul>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>
        <div className="ag-header-actions">
          {utilityNav.map((l) => <a key={l.href} className="ag-utility-link" href={l.href}>{l.label}</a>)}
          {ctaLabel && ctaHref ? <a className="ag-button ag-button--sm" href={ctaHref}>{ctaLabel}</a> : null}
        </div>
        <details className="ag-menu">
          <summary aria-label="Open navigation">Menu <span aria-hidden="true">&#9776;</span></summary>
          <nav className="ag-menu-panel" aria-label="Mobile">
            <ul>{primaryNav.map((item) => <li key={item.href}><a href={item.href} aria-current={current(item.href)}>{item.label}</a></li>)}</ul>
            {ctaLabel && ctaHref ? <a className="ag-button" href={ctaHref}>{ctaLabel}</a> : null}
          </nav>
        </details>
      </div>
    </header>
  );
}

export type SiteHeaderChildren = ReactNode;
