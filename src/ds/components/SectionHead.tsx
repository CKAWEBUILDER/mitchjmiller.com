import type { ReactNode } from 'react';
import { Eyebrow } from './Eyebrow';
import { TextLink } from './TextLink';

export interface SectionHeadProps {
  /** Uppercase kicker above the heading. */
  eyebrow?: string;
  /** Section heading. Rendered as `<h2>`. */
  title: ReactNode;
  /** Supporting sentence under the heading. */
  deck?: ReactNode;
  /** Optional trailing link, e.g. "All work". */
  linkHref?: string;
  linkLabel?: string;
  className?: string;
}

/** Heading block that opens a Section: kicker, h2, deck, and an optional trailing link. */
export function SectionHead({ eyebrow, title, deck, linkHref, linkLabel, className }: SectionHeadProps) {
  return (
    <div className={['ag-section-head', className].filter(Boolean).join(' ')}>
      <div>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h2>{title}</h2>
        {deck ? <p>{deck}</p> : null}
      </div>
      {linkHref && linkLabel ? <TextLink href={linkHref}>{linkLabel}</TextLink> : null}
    </div>
  );
}
