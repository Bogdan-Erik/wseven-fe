import React from 'react'
import './Container.css';
import { twMerge } from 'tailwind-merge'

export interface ContainerProps {
  children: any
  padding?: boolean,
  className?: string
}

export const Container = ({
  children,
  className,
  padding,
}: ContainerProps): JSX.Element => {
  const classes = twMerge(`
   bg-transparent rounded-[0.625rem]  ${padding ? '3xl:px-7.5 px-[20px] md:px-[40px] py-5 ' : ''}
  ${className}
`)

  return <div className={classes}>{children}</div>
}
