import React from 'react'
import { twMerge } from 'tailwind-merge';
import TransformServerImage  from './../../../utils/TransformServerImage';

export interface LastMatchProps {
  data: any,
  position: string,

}

export const LastMatch = ({
  data = null,
  position = 'left',
  ...props

}: LastMatchProps): JSX.Element => {
  return (

    <div className={twMerge(`holder-space ${position === 'right' ? 'text-right' : 'text-left'}`)}>
      <span className="title">Előző meccs</span>
      <div className="flex mt-[5px]">
        <div className={`${position === 'right' ? ' flex justify-end order-2' : 'mr-[10px] order-1'}`}><img src={TransformServerImage(data?.img)} className="max-w-[30px]" /></div>
        <div className={`${position === 'right' ? 'self-center text-xs ml-auto mr-[10px] order-1' : 'self-center text-xs order-2'}`}>
          {data?.name && (<div>{data?.name}</div>)}
          <div>{data?.result}</div>
        </div>
      </div>
    </div>

  )
}