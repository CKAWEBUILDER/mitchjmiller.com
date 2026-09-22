import type { ReactNode } from 'react';

export interface TextLinkProps {
  href: string;
  children?: ReactNode;
  /** Appends a trailing arrow glyph. Defaults to true. */
  arrow?: boolean;
  className?: string;
}

/** Green inline call-to-action link used beside or instead of a Button. */
export function TextLink({ href, children, arrow = true, className }: TextLinkProps) {
  return (
    <a className={['ag-textlink', className].filter(Boolean).join(' ')} href={href}>
      {children}{arrow ? <span aria-hidden="true">&#8594;</span> : null}
    </a>
  );
}
