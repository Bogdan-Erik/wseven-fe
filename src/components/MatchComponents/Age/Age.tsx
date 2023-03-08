import React from 'react'
import { twMerge } from 'tailwind-merge';
import TransformServerImage from '../../../utils/TransformServerImage';

export interface AgeProps {
  data: any,
  position: string,

}

export const Age = ({
  data = null,
  position = 'left',
  ...props

}: AgeProps): JSX.Element => {
  return (
    <>
      <div className={`holder-space ${position === 'right' ? 'text-right' : ''}`}>
        <span className="title">Kor</span>
        <div className={`flex flex-row mt-[5px] ${position === 'right' ? 'justify-end' : ''}`}>
          <div className="text-[32px] font-[600] mr-[4px]">{data.value}</div>
          <div className="flex flex-col justify-end mb-[10px]">
            <div className={`text-xs font-[500] text-white ${position === 'right' ? 'text-left' : ''}`}>éves</div>
          </div>
        </div>
      </div>
    </>


  )
}