import React from 'react'
import './Button.css';
import { motion } from 'framer-motion';
import ReactLoading from 'react-loading';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps {
  children: JSX.Element[] | JSX.Element | string
  primary?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  customClasses?: string,
  disabled?: boolean,
  type?: 'button' | 'reset' | 'submit' | undefined
  onClick?: () => void;
  isLoading?: boolean
}

export const Button = ({
  children,
  primary = false,
  size = 'medium',
  backgroundColor,
  disabled = false,
  customClasses,
  type = 'button',
  isLoading = false,
  ...props
}: ButtonProps): JSX.Element => {
  const classes = twMerge(`${isLoading ? 'invisible' : 'visible'}`)

  const mode = primary ? 'button--primary' : 'button--secondary';
  return (
    <motion.button
      whileHover={{
        scale: (!isLoading && !disabled) ? 1.05 : 1
      }}
      disabled={disabled || isLoading}
      type={type}
      className={['button', `relative button--${size}`, mode, customClasses].join(' ')}
      style={{ backgroundColor }}
      {...props}
    >
      <div className={classes}>{children}</div>
      {isLoading && (<div className="absolute w-full h-full top-0 left-0 flex justify-center items-center "><ReactLoading type={'spin'} color={'#ffffff'} height={20} width={20} /></div>)}
    </motion.button>
  );
}