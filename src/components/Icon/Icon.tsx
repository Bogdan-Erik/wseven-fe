import React from 'react'
import './Icon.css';

export interface IconProps {
  icon: string
  size?: string
  color?: string
  isGradient?: boolean
}

export const Icon = ({ icon, size = 'sm', color = '#ffffff', isGradient }: IconProps): JSX.Element => {
  return (
    <span className={`font-icomoon icon icon-${icon} text-${size} text-[${color}] ${isGradient ? ' gradient-icon' : ''}`} />
  )
}