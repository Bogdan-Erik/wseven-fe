import React from 'react'
import './SmallTitle.css';

export interface SmallTitleProps {
  children: any
}

export const SmallTitle = ({ children }: SmallTitleProps): JSX.Element => {
  return (
    <div className="small-title">{children}</div>

  )
}