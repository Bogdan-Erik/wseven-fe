import React from 'react'
import './IconBadge.css';

export interface IconBadgeProps {
  children: JSX.Element[] | JSX.Element | string
  width?: string,
  height?: string,
  classes?: string
}

export const IconBadge = ({
  children,
  width = 'w-[60px]',
  height = 'h-[60px]',
  classes,
  ...props
}: IconBadgeProps): JSX.Element => {
  return (
    <div className={`${width} ${height}  rounded-md  flex flex-row justify-center items-center icon-badge ${classes}`} {...props}>
      {children}
    </div>
  )
}