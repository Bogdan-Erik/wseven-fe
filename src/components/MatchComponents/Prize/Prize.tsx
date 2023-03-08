import React from 'react'
import { twMerge } from 'tailwind-merge';
import TransformServerImage from '../../../utils/TransformServerImage';

export interface PrizeProps {
  data: any,
  position: string,

}

export const Prize = ({
  data = null,
  position = 'left',
  ...props

}: PrizeProps): JSX.Element => {
  console.log(data)
  return (
    <>
      <div className={`holder-space ${position === 'right' ? 'text-right' : ''}`}>
        <span className="title">Karrier pénzdíj</span>
        <div className={`flex flex-row mt-[5px] ${position === 'right' ? 'justify-end' : ''}`}>
          <div className="text-[24px] font-[600] mr-[4px]">{data?.currency} {data.value?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</div>
        </div>
      </div>
    </>


  )
}