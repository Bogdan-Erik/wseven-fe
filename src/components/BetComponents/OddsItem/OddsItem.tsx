import React from 'react'
import './OddsItem.css';

export interface OddsItemProps {
  odds: string
}

export const OddsItem = ({ odds }: OddsItemProps): JSX.Element => {
  return (
    <div className="bg-light-green rounded-md px-[13px] py-[5px] text-xs w-[82px] text-white font-[500]">
      <span className="font-icomoon icon-stat text-green  mr-[10px]"> </span>{odds}
    </div>
  )
}