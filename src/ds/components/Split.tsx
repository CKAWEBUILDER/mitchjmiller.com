import type { ReactNode } from 'react';

export interface SplitProps {
  /** Left column: heading and prose. */
  children?: ReactNode;
  /** Right column: a Panel, PostList, PrincipalCard or image. */
  aside?: ReactNode;
  className?: string;
}

/** Two equal columns with generous gutter. Used for lab / writing / about teasers. */
export function Split({ children, aside, className }: SplitProps) {
  return (
    <div className={['ag-split', className].filter(Boolean).join(' ')}>
      <div>{children}</div>
      <div>{aside}</div>
    </div>
  );
}
