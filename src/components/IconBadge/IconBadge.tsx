import React from 'react'
import './IconBadge.css';

export interface IconBadgeProps {
  children: JSX.Element[] | JSX.Element | string
  width: string,
  height: string,
}

export const IconBadge = ({
  children,
  width = 'w-[60px]',
  height = 'h-[60px]'
}: IconBadgeProps): JSX.Element => {
  return (
    <div className={`${width} ${height} bg-rgba-grey rounded-md backdrop-blur-[10px] flex flex-row justify-center items-center`}>
      {children}
    </div>
  )
}