import React from 'react'

export interface LabelProps {
  children: string,
  required: boolean,
}

export const Label = ({ children, required = false }: LabelProps): JSX.Element | null => {
  return children?.length ? (
    <span className="my-1 text-sm text-white font-semibold">
      {children}
      {required && <span>*</span>}
    </span>
  ) : null
}
