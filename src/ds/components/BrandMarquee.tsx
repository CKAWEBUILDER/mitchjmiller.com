export interface Brand {
  name: string;
  /** Logo file URL. Falls back to the name set in uppercase when absent. */
  logoSrc?: string;
  /** Short qualifier badge, e.g. "via agency". */
  note?: string;
}

export interface BrandMarqueeProps {
  label?: string;
  brands: Brand[];
  className?: string;
}

/**
 * Scrolling logo rail. The track is duplicated so the CSS animation loops seamlessly;
 * the duplicate is aria-hidden and hidden outright under prefers-reduced-motion.
 */
export function BrandMarquee({ label = 'Organizations served', brands, className }: BrandMarqueeProps) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden ? 'true' : undefined}>
      {brands.map((b) => (
        <li key={b.name} data-brand={b.name}>
          {b.logoSrc ? <img src={b.logoSrc} alt={hidden ? '' : b.name} /> : b.name}
          {b.note ? <abbr title={b.note}>{b.note}</abbr> : null}
        </li>
      ))}
    </ul>
  );
  return (
    <section className={['ag-marquee', className].filter(Boolean).join(' ')}>
      <div className="ag-wrap">
        <div className="ag-marquee-head"><p className="ag-marquee-label">{label}</p></div>
      </div>
      <div className="ag-marquee-viewport">
        <div className="ag-marquee-track">{row(false)}{row(true)}</div>
      </div>
    </section>
  );
}
