import type { ReactNode } from 'react';

export interface ButtonProps {
  /** `solid` is the green primary action, `ghost` is outlined on white, `light` is outlined on navy. */
  variant?: 'solid' | 'ghost' | 'light';
  /** `sm` reduces the 48px target to 42px. */
  size?: 'md' | 'sm';
  /** Renders an `<a>` when set, otherwise a `<button>`. */
  href?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
}

/** The shell's only action control. Green solid is the primary CTA on every page. */
export function Button({ variant = 'solid', size = 'md', href, type = 'button', onClick, children, className }: ButtonProps) {
  const cls = ['ag-button',
    variant === 'ghost' ? 'ag-button--ghost' : '',
    variant === 'light' ? 'ag-button--light' : '',
    size === 'sm' ? 'ag-button--sm' : '',
    className].filter(Boolean).join(' ');
  if (href) return <a className={cls} href={href}>{children}</a>;
  return <button className={cls} type={type} onClick={onClick}>{children}</button>;
}
