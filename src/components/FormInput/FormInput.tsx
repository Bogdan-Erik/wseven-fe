import React from 'react'
import { twMerge } from 'tailwind-merge'
import { ErrorText } from '../ErrorText'
import { Input } from '../Input'
import { Label } from '../Label'
import { Loader } from '../Loader'

export interface FormInputProps {
  name: string
  label?: string
  type?: string
  error?: string | undefined
  required?: boolean
  disabled?: boolean
  placeholder?: string
  className?: string
  value?: string
  isLoading?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const FormInput = ({
  name = '',
  label = '',
  type = 'text',
  error = '',
  placeholder = '',
  required = false,
  disabled = false,
  className = '',
  isLoading = false,
  ...props
}: FormInputProps): JSX.Element => {
  const classes = twMerge(`
    flex flex-col my-2
    ${className}
  `)

  const isDisabled = () => {
    if (isLoading) {
      return true
    }
    return disabled
  }
  return (
    <div className={classes}>
      <Label required={required}>{label}</Label>
      <div className="relative">
        {isLoading ? (
          <div className="absolute right-[.625rem] top-[0.5rem]">
            <Loader size={'1.4rem'} style={{}} />
          </div>
        ) : (
          ''
        )}
        <div className="mt-[5px]">
          <Input
            name={name}
            type={type}
            disabled={isDisabled()}
            placeholder={placeholder}
            {...props}
          />
        </div>
      </div>

      <ErrorText>{error}</ErrorText>
    </div>
  )
}
