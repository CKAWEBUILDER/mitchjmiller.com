export interface Post {
  title: string;
  href: string;
  /** Display date, already formatted, e.g. "September 14, 2026". */
  date?: string;
  summary?: string;
}

export interface PostListProps {
  items: Post[];
  className?: string;
}

/** Ruled list of writing entries: green date, linked title, one-line summary. */
export function PostList({ items, className }: PostListProps) {
  return (
    <ul className={['ag-posts', className].filter(Boolean).join(' ')}>
      {items.map((p) => (
        <li key={p.href}>
          {p.date ? <span className="ag-post-date">{p.date}</span> : null}
          <h3><a href={p.href}>{p.title}</a></h3>
          {p.summary ? <p>{p.summary}</p> : null}
        </li>
      ))}
    </ul>
  );
}
