import React from 'react'

export interface ErrorTextProps {
  children: string,
}

export const ErrorText = ({ children }: ErrorTextProps): JSX.Element | null => {
  return children?.length ? <div className="my-1 text-sm text-red font-[600]">{children}</div> : null
}
