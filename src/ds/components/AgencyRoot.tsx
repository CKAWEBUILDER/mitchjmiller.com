import type { ReactNode } from 'react';

export interface AgencyRootProps {
  /** Page family. `home` and `services` switch the shell to the centered composition. */
  page?: 'home' | 'services' | 'default';
  /** Page content. */
  children?: ReactNode;
  className?: string;
}

/**
 * Root wrapper for every M² page. Applies the `ag-body` typography/colour base
 * and the page-family modifier that the shell's centered composition rules key off.
 * Nothing in this design system is styled correctly outside it.
 */
export function AgencyRoot({ page = 'default', children, className }: AgencyRootProps) {
  const family = page === 'home' ? 'ag-home' : page === 'services' ? 'ag-services' : '';
  return <div className={['ag-body', family, className].filter(Boolean).join(' ')}>{children}</div>;
}
