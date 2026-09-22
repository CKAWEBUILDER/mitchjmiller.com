export interface LifecycleStage {
  title: string;
  /** One-line description under the stage name. */
  note?: string;
  href?: string;
}

export interface LifecycleStripProps {
  /** Label to the left of (or above) the stages. */
  label?: string;
  stages: LifecycleStage[];
  className?: string;
}

/** Ruled strip of the engagement lifecycle, sitting directly under the hero. */
export function LifecycleStrip({ label = 'Strategy through delivery', stages, className }: LifecycleStripProps) {
  return (
    <section className={['ag-lifecycle', className].filter(Boolean).join(' ')}>
      <div className="ag-wrap">
        <p className="ag-lifecycle-label">{label}</p>
        <ol>
          {stages.map((s) => {
            const body = <><strong>{s.title}</strong>{s.note ? <span>{s.note}</span> : null}</>;
            return <li key={s.title}>{s.href ? <a href={s.href}>{body}</a> : body}</li>;
          })}
        </ol>
      </div>
    </section>
  );
}
