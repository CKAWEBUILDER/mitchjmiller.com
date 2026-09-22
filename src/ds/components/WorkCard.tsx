import type { ReactNode } from 'react';
import { Eyebrow } from './Eyebrow';
import { TextLink } from './TextLink';

export interface WorkCardProps {
  /** Client or programme name. */
  title: ReactNode;
  href?: string;
  /** Category kicker, e.g. "Enterprise search". */
  eyebrow?: string;
  children?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  /** `contain` for logos and screenshots that must not be cropped. */
  imageFit?: 'cover' | 'contain';
  imageCaption?: ReactNode;
  /** Headline number, e.g. "+180%". */
  metric?: string;
  /** What the number measures, and over what period. */
  metricLabel?: string;
  linkLabel?: string;
  className?: string;
}

/** Case-study card: framed image, kicker, title, summary, and a measured outcome in the footer. */
export function WorkCard({ title, href, eyebrow, children, imageSrc, imageAlt = '', imageFit = 'cover', imageCaption, metric, metricLabel, linkLabel = 'Read the case', className }: WorkCardProps) {
  return (
    <article className={['ag-work-card', className].filter(Boolean).join(' ')}>
      {imageSrc ? (
        <figure>
          <span className="ag-work-image"><img src={imageSrc} alt={imageAlt} className={imageFit === 'contain' ? 'contain' : undefined} /></span>
          {imageCaption ? <figcaption>{imageCaption}</figcaption> : null}
        </figure>
      ) : null}
      <div className="ag-work-body">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h3>{href ? <a href={href}>{title}</a> : title}</h3>
        {children ? <p>{children}</p> : null}
        <div className="ag-work-foot">
          {metric ? <div><strong>{metric}</strong>{metricLabel ? <small>{metricLabel}</small> : null}</div> : null}
          {href ? <TextLink href={href}>{linkLabel}</TextLink> : null}
        </div>
      </div>
    </article>
  );
}
