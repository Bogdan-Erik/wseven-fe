import React from 'react'
import './OddsItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { twMerge } from 'tailwind-merge';

export interface OddsItemProps {
  odds: string
  editMark?: boolean
}

export const OddsItem = ({ odds, editMark }: OddsItemProps): JSX.Element => {
  const innerClass = twMerge(`bg-light-green rounded-md px-[13px] py-[5px] text-xs w-[82px] text-white font-[500] max-h-[26px] ${editMark ? 'flex' : ''}`);
  return (
    <div className={innerClass}>
      <span className="font-icomoon icon-stat text-green  mr-[10px]"> </span>{parseFloat(odds).toFixed(2)} {editMark && (<div className="ml-[5px]"><FontAwesomeIcon icon={faPencil} /></div>)}
    </div>
  )
}