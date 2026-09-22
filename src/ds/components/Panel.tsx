import type { ReactNode } from 'react';

export interface PanelProps {
  title?: ReactNode;
  /** Bullet list. Provide this or `children`. */
  items?: string[];
  children?: ReactNode;
  className?: string;
}

/** Bordered white card for a short list beside a Split's prose column. */
export function Panel({ title, items, children, className }: PanelProps) {
  return (
    <div className={['ag-panel', className].filter(Boolean).join(' ')}>
      {title ? <h3>{title}</h3> : null}
      {items?.length ? <ul>{items.map((i) => <li key={i}>{i}</li>)}</ul> : null}
      {children}
    </div>
  );
}
