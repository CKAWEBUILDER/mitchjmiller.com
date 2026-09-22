import type { ReactNode } from 'react';

export interface EyebrowProps {
  /** Short uppercase label text. */
  children?: ReactNode;
  /** Render as a `<span>` instead of the default block. */
  as?: 'span' | 'p';
  className?: string;
}

/** Small uppercase green kicker that sits above a heading. Turns pale green on navy. */
export function Eyebrow({ children, as: Tag = 'span', className }: EyebrowProps) {
  return <Tag className={['ag-eyebrow', className].filter(Boolean).join(' ')}>{children}</Tag>;
}
