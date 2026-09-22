import type { ReactNode } from 'react';
import { TextLink } from './TextLink';

export interface TileProps {
  /** Two-letter or short badge shown in the pale green square. */
  icon?: ReactNode;
  /** Ordinal label, e.g. "01". Mutually exclusive with `icon` in practice. */
  num?: string;
  title: ReactNode;
  children?: ReactNode;
  /** Bullet list rendered under the body copy. */
  bullets?: string[];
  linkHref?: string;
  linkLabel?: string;
  /** Pale grey card background instead of white. */
  tint?: boolean;
  /** Makes the whole card a link. */
  href?: string;
  className?: string;
}

/** The workhorse card: icon or ordinal, heading, copy, optional bullets and a trailing link. */
export function Tile({ icon, num, title, children, bullets, linkHref, linkLabel, tint, href, className }: TileProps) {
  const cls = ['ag-tile', tint ? 'ag-tile--tint' : '', className].filter(Boolean).join(' ');
  const body = (
    <>
      {num ? <span className="ag-tile-num">{num}</span> : null}
      {icon ? <span className="ag-tile-icon">{icon}</span> : null}
      <h3>{title}</h3>
      {children ? <p>{children}</p> : null}
      {bullets?.length ? <ul>{bullets.map((b) => <li key={b}>{b}</li>)}</ul> : null}
      {linkHref && linkLabel ? <TextLink href={linkHref}>{linkLabel}</TextLink> : null}
    </>
  );
  if (href) return <a className={cls} href={href}>{body}</a>;
  return <div className={cls}>{body}</div>;
}
