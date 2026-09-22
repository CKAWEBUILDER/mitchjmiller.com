import type { ReactNode } from 'react';
import { Eyebrow } from './Eyebrow';

export interface ProductCardProps {
  name: ReactNode;
  /** Status kicker, e.g. "Released" or "In development". */
  status?: string;
  children?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  /** Action rendered at the foot of the card. */
  action?: ReactNode;
  id?: string;
  className?: string;
}

/** Software product card for the products page: visual, status, name, pitch, action. */
export function ProductCard({ name, status, children, imageSrc, imageAlt = '', action, id, className }: ProductCardProps) {
  return (
    <article className={['ag-product-card', className].filter(Boolean).join(' ')} id={id}>
      {imageSrc ? <span className="ag-product-visual"><img src={imageSrc} alt={imageAlt} /></span> : null}
      <div className="ag-product-body">
        {status ? <Eyebrow>{status}</Eyebrow> : null}
        <h3>{name}</h3>
        {children ? <p>{children}</p> : null}
        {action}
      </div>
    </article>
  );
}
