import React from 'react'
import './Icon.css';

export interface IconProps {
  icon: string
  size?: string
  color?: string
}

export const Icon = ({ icon, size = 'sm', color = '#ffffff' }: IconProps): JSX.Element => {
  return (
    <span className={`font-icomoon icon icon-${icon} text-${size} text-[${color}]`} />
  )
}