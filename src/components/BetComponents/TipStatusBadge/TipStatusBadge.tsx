import React from 'react'
import './TipStatusBadge.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { twMerge } from 'tailwind-merge';

export interface TipStatusProps {
  text: string
  icon: string
  color: string
}

export const TipStatusBadge = ({ text, color, icon }: TipStatusProps): JSX.Element => {
  const innerClass = twMerge(`bg-light-${color} rounded-md px-[13px] py-[5px] text-xs text-white font-[500] `);
  return (
    <div className={innerClass}>
      <span className={`font-icomoon text-[16px] icon-${icon} text-${color} relative top-[2px]`}> </span>{text}
    </div>
  )
}