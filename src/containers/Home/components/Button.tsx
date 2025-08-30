import React from 'react';

type Variant = 'primary' | 'danger' | 'ghost' | 'success' | 'muted';
type Size = 'sm' | 'md' | 'lg';

type ButtonProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  title?: string;
};

export default function Button({ children, variant = 'ghost', size = 'md', onClick, type = 'button', title }: ButtonProps) {
  const cls = `btn btn-${variant} btn-${size}`;
  return (
    <button type={type} className={cls} onClick={onClick} title={title}>
      {children}
    </button>
  );
}
