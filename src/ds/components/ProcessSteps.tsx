export interface ProcessStep {
  title: string;
  body: string;
}

export interface ProcessStepsProps {
  steps: ProcessStep[];
  className?: string;
}

/** Auto-numbered four-up process cards. The 01/02 counters come from CSS, not props. */
export function ProcessSteps({ steps, className }: ProcessStepsProps) {
  return (
    <ol className={['ag-process', className].filter(Boolean).join(' ')}>
      {steps.map((s) => (
        <li key={s.title}>
          <h3>{s.title}</h3>
          <p>{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
