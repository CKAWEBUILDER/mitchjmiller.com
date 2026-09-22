import type { ReactNode } from 'react';
import { Eyebrow } from './Eyebrow';

export interface EvidenceLink {
  label: string;
  href: string;
  /** Source and period, printed under the link. */
  note?: string;
}

export interface StageProps {
  title: ReactNode;
  id?: string;
  eyebrow?: string;
  /** Lead paragraph beside the heading. */
  lede?: ReactNode;
  /** Linked proof shown in the pale evidence panel. */
  evidence?: EvidenceLink[];
  evidenceTitle?: string;
  /** Three-up detail columns under the head. */
  children?: ReactNode;
  /** Collapsed proof disclosure at the foot of the stage. */
  proof?: { label: string; items: EvidenceLink[] };
  className?: string;
}

/**
 * A service stage on the Services page: head with lede and evidence panel, a three-up
 * detail grid, and an optional native disclosure holding the proof links.
 */
export function Stage({ title, id, eyebrow, lede, evidence, evidenceTitle = 'Evidence', children, proof, className }: StageProps) {
  return (
    <section className={['ag-stage', className].filter(Boolean).join(' ')}>
      <div className="ag-wrap">
        <div className="ag-stage-head">
          <div>
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <h2 id={id}>{title}</h2>
            {lede ? <p className="ag-stage-lede">{lede}</p> : null}
          </div>
          {evidence?.length ? (
            <div className="ag-stage-evidence">
              <h3>{evidenceTitle}</h3>
              <ul>{evidence.map((e) => <li key={e.href}><a href={e.href}>{e.label}</a>{e.note ? <span>{e.note}</span> : null}</li>)}</ul>
            </div>
          ) : null}
        </div>
        {children ? <div className="ag-stage-grid">{children}</div> : null}
        {proof ? (
          <details className="ag-stage-proof">
            <summary>{proof.label}<span aria-hidden="true">+</span></summary>
            <ul>{proof.items.map((e) => <li key={e.href}><a href={e.href}>{e.label}</a>{e.note ? <p>{e.note}</p> : null}</li>)}</ul>
          </details>
        ) : null}
      </div>
    </section>
  );
}
