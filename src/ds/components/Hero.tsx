import type { ReactNode } from 'react';
import { Breadcrumbs, type Crumb } from './Breadcrumbs';
import { Eyebrow } from './Eyebrow';

export interface HeroProps {
  title: ReactNode;
  /** Lead paragraph under the h1. */
  deck?: ReactNode;
  eyebrow?: string;
  crumbs?: Crumb[];
  /** Buttons / links. One primary green CTA is the house rule. */
  actions?: ReactNode;
  /** Small print under the actions, e.g. a credential line. */
  meta?: ReactNode;
  /** Image URL for the framed hero photo. Omit for a text-only hero. */
  imageSrc?: string;
  imageAlt?: string;
  /** Caption printed under the framed image. */
  imageCaption?: ReactNode;
  /** Single-column, shorter padding. Used on interior pages. */
  compact?: boolean;
  className?: string;
}

/** Navy gradient page opener. Inside AgencyRoot page="home"/"services" it centers itself. */
export function Hero({ title, deck, eyebrow, crumbs, actions, meta, imageSrc, imageAlt = '', imageCaption, compact, className }: HeroProps) {
  return (
    <section className={['ag-hero', compact ? 'ag-hero--compact' : '', className].filter(Boolean).join(' ')}>
      <div className="ag-wrap">
        <div className="ag-hero-grid">
          <div>
            {crumbs?.length ? <Breadcrumbs items={crumbs} /> : null}
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <h1>{title}</h1>
            {deck ? <p className="ag-hero-deck">{deck}</p> : null}
            {actions ? <div className="ag-hero-actions">{actions}</div> : null}
            {meta ? <p className="ag-hero-meta">{meta}</p> : null}
          </div>
          {imageSrc ? (
            <figure className="ag-hero-media">
              <div className="ag-hero-frame"><img src={imageSrc} alt={imageAlt} /></div>
              {imageCaption ? <figcaption>{imageCaption}</figcaption> : null}
            </figure>
          ) : null}
        </div>
      </div>
    </section>
  );
}
