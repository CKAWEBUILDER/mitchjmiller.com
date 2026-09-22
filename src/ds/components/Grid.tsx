import type { ReactNode } from 'react';

export interface GridProps {
  /** Column count at desktop width. Collapses to 2 then 1 on the shell's breakpoints. */
  cols?: 2 | 3 | 4;
  children?: ReactNode;
  className?: string;
}

/** Equal-column card grid. Pair with Tile, WorkCard or ProductCard children. */
export function Grid({ cols = 3, children, className }: GridProps) {
  return <div className={[`ag-grid-${cols}`, className].filter(Boolean).join(' ')}>{children}</div>;
}
