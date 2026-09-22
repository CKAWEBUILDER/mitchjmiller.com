export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqProps {
  items: FaqItem[];
  /** Open the first entry by default. */
  defaultOpenFirst?: boolean;
  className?: string;
}

/** Native `<details>` disclosures — no JavaScript, so the answers stay in the crawled HTML. */
export function Faq({ items, defaultOpenFirst = false, className }: FaqProps) {
  return (
    <div className={['ag-faq', className].filter(Boolean).join(' ')}>
      {items.map((it, i) => (
        <details key={it.question} open={defaultOpenFirst && i === 0}>
          <summary><h3>{it.question}</h3><span aria-hidden="true">+</span></summary>
          <p>{it.answer}</p>
        </details>
      ))}
    </div>
  );
}
