import React from 'react'
import { twMerge } from 'tailwind-merge';
import TransformServerImage from '../../../utils/TransformServerImage';
import LeftHandActive from './../../../assets/images/left-hand-active.png';
import LeftHandInactive from './../../../assets/images/left-hand-inactive.png';
import RightHandActive from './../../../assets/images/right-hand-active.png';
import RightHandInactive from './../../../assets/images/right-hand-inactive.png';

export interface HandProps {
  data: any,
  position: string,

}

export const Hand = ({
  data = null,
  position = 'left',
  ...props

}: HandProps): JSX.Element => {
  return (
    <>
      <div className={`holder-space ${position === 'right' ? 'text-right' : ''}`}>
        <span className="title">Kéz</span>
        <div className={`flex flex-row mt-[5px] ${position === 'right' ? 'justify-end' : ''}`}>
          <div className="font-[600] mr-[4px] flex gap-[5px]">
            <div><img src={data?.hand === 'left' ? LeftHandActive : LeftHandInactive} /></div>
            <div className='flex justify-center flex-col'>{data?.hand === 'left'? 'B' : 'J'}</div>
            <div><img src={data?.hand === 'right' ? RightHandActive : RightHandInactive} /></div>
          </div>
        </div>
      </div>
    </>


  )
}