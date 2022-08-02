import React from 'react'
import './Button.css';

export interface ButtonProps {
  children: JSX.Element[] | JSX.Element | string
  primary?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean,
  onClick?: () => void;
}

export const Button = ({
  children,
  primary = false,
  size = 'medium',
  backgroundColor,
  disabled = false,
  ...props
}: ButtonProps): JSX.Element => {
  const mode = primary ? 'button--primary' : 'button--secondary';
  return (
    <button
      disabled={disabled}
      type="button"
      className={['button', `button--${size}`, mode].join(' ')}
      style={{ backgroundColor }}
      {...props}
    >
      {children}
    </button>
  );
}