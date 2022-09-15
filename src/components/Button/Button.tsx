import React from 'react'
import './Button.css';
import { motion } from 'framer-motion';

export interface ButtonProps {
  children: JSX.Element[] | JSX.Element | string
  primary?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  customClasses?: string,
  disabled?: boolean,
  type?: 'button' | 'reset' | 'submit' | undefined
  onClick?: () => void;
}

export const Button = ({
  children,
  primary = false,
  size = 'medium',
  backgroundColor,
  disabled = false,
  customClasses,
  type = 'button',
  ...props
}: ButtonProps): JSX.Element => {
  const mode = primary ? 'button--primary' : 'button--secondary';
  return (
    <motion.button
      whileHover={{
        scale: 1.1
      }}
      disabled={disabled}
      type={type}
      className={['button', `button--${size}`, mode, customClasses].join(' ')}
      style={{ backgroundColor }}
      {...props}
    >
      {children}
    </motion.button>
  );
}