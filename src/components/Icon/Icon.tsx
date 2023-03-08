import React from 'react'
import { twMerge } from 'tailwind-merge';
import './Icon.css';

export interface IconProps {
  icon: string
  size?: string
  color?: string
  isGradient?: boolean,
  iconClasses?: string,
}

export const Icon = ({ icon, size = 'text-sm', color = '#ffffffcc', isGradient, iconClasses }: IconProps): JSX.Element => {

  const iconClass = twMerge(
    `font-icomoon icon icon-${icon} ${size} text-[${color}] ${isGradient ? ' gradient-icon' : ''}  ${iconClasses}`,
  )
  return (
    <span className={iconClass} />
  )
}