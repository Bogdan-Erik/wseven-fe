import React from 'react'
import './Container.css';
import { twMerge } from 'tailwind-merge'

export interface ContainerProps {
  children: any
  className?: string
}

export const Container = ({
  children,
  className,
}: ContainerProps): JSX.Element => {
  const classes = twMerge(`
  3xl:px-7.5 py-5 bg-transparent rounded-[0.625rem]
  ${className}
`)

  return <div className={classes}>{children}</div>
}
