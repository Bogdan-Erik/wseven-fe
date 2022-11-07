import React from 'react'
import { twMerge } from 'tailwind-merge';
import './Badge.css';

export enum BadgeType {
  Primary = 'primary',
  Secondary = 'secondary',
}

export interface BadgeProps {
  label: string,
  type: BadgeType
}

export const Badge = ({ label, type }: BadgeProps): JSX.Element => {
  const badgeClass = twMerge(`badge ${'badge-' + type}`)
  return (
    <div className={badgeClass}>
      {label}
    </div>
  )
}