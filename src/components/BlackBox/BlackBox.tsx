import React from 'react'
import './BlackBox.scss';

export interface BlackBoxProps {
  children: any
}

export const BlackBox = ({ children }: BlackBoxProps): JSX.Element => {
  return (
    <div className="p-[24px] black-box">
      {children}
    </div>
  )
}