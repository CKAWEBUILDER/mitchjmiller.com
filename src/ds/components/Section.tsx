import type { ReactNode } from 'react';

export interface SectionProps {
  /** `tint` paints the pale grey band, `navy` the dark CTA-style band. */
  tone?: 'plain' | 'tint' | 'navy';
  /** Adds the 1px top rule that separates adjacent plain sections. */
  topLine?: boolean;
  /** Anchor id for in-page navigation. */
  id?: string;
  children?: ReactNode;
  className?: string;
}

/**
 * Vertical page band with the shell's standard block padding and 1200px inner wrap.
 * Every page is a stack of these.
 */
export function Section({ tone = 'plain', topLine = false, id, children, className }: SectionProps) {
  const cls = ['ag-section',
    tone === 'tint' ? 'ag-section--tint' : '',
    tone === 'navy' ? 'ag-dark' : '',
    topLine ? 'ag-section--line' : '',
    className].filter(Boolean).join(' ');
  const style = tone === 'navy' ? { background: 'var(--ag-navy)', color: '#fff' } : undefined;
  return (
    <section className={cls} id={id} style={style}>
      <div className="ag-wrap">{children}</div>
    </section>
  );
}
