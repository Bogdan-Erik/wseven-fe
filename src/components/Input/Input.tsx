import React from 'react'
import { twMerge } from 'tailwind-merge';
import './Input.css';

export interface InputProps {
  name: string,
  type: string,
  error?: string | undefined
  disabled: boolean,
  placeholder?: string
  value?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({
  name = '',
  type = 'text',
  error = '',
  disabled = false,
  placeholder,
  value = '',
  ...props

}: InputProps): JSX.Element => {
  return (
    <div>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className={twMerge(`
          placeholder-light-white
          border-2 border-transparent grey-linear-gradient
          leading-[18px] px-3.5 py-3 rounded-md outline-none 
          text-white
          w-full 
          focus:border-2 focus:border-gray-500  focus:shadow-input focus:border-light-grey
          ${error ? ' border-red' : ''}
          ${disabled ? ' opacity-50' : ''}
        `)}
        disabled={disabled}
        value={value}
        {...props}

      />
      <div className="my-1 text-xs text-red">{error}</div>

    </div>
  )
}