import React from 'react'
import './Input.css';

export interface InputProps {
  name: string,
  type: string,
  error: string,
  disabled: boolean,
}

export const Input = ({
  name = '',
  type = 'text',
  error = '',
  disabled = false,
  ...props

}: InputProps): JSX.Element => {
  return (
    <input
      name={name}
      type={type}
      className={`
          placeholder-light-white
          border-2 border-dark-bg grey-linear-gradient
          leading-[18px] px-3.5 py-3 rounded-md outline-none 
          text-white
          w-full 
          focus:border-2 focus:border-gray-500  focus:shadow-input focus:border-light-grey
          ${error ? ' border-red' : ''}
          ${disabled ? ' opacity-50' : ''}
        `}
      disabled={disabled}
      {...props}
    />
  )
}