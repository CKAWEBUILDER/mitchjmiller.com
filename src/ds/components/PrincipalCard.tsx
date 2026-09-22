import type { ReactNode } from 'react';

export interface PrincipalCardProps {
  name: string;
  /** Role line under the name. */
  role?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

/** Round portrait beside a name and role. Used for the principal on About and Home. */
export function PrincipalCard({ name, role, imageSrc, imageAlt, className }: PrincipalCardProps) {
  return (
    <div className={['ag-principal', className].filter(Boolean).join(' ')}>
      {imageSrc ? <img src={imageSrc} alt={imageAlt ?? name} /> : null}
      <div>
        <strong>{name}</strong>
        {role ? <p>{role}</p> : null}
      </div>
    </div>
  );
}
