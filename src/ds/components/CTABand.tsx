import type { ReactNode } from 'react';

export interface CTABandProps {
  title: ReactNode;
  children?: ReactNode;
  /** Buttons. Use variant="solid" plus variant="light" on this navy band. */
  actions?: ReactNode;
  className?: string;
}

/** Full-width navy conversion band. Closes most pages. */
export function CTABand({ title, children, actions, className }: CTABandProps) {
  return (
    <section className={['ag-cta', className].filter(Boolean).join(' ')}>
      <div className="ag-wrap">
        <div className="ag-cta-inner">
          <div>
            <h2>{title}</h2>
            {children ? <p>{children}</p> : null}
          </div>
          {actions ? <div className="ag-cta-actions">{actions}</div> : null}
        </div>
      </div>
    </section>
  );
}
