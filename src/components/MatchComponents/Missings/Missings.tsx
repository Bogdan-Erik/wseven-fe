import React from 'react'
import { twMerge } from 'tailwind-merge';
import TransformServerImage from '../../../utils/TransformServerImage';

export interface MissingsItemProps {
  type: number,
  value: string
}

export interface MissingsProps {
  data: any,
  position: string,

}

export const Missings = ({
  data = null,
  position = 'left',
  ...props

}: MissingsProps): JSX.Element => {

  const variants = {
    red_card: 3,
    easy_injury: 2,
    injury: 1,

  }
  return (
    <>
      <div className={`holder-space ${position === 'right' ? 'text-right' : ''}`}>
        <span className="title">Hiányzók</span>
        <div className="missing mt-[5px]">
          <>
            {
              data?.map((item: MissingsItemProps) => (
                <div className="missing-item">
                  <div className={`${position === 'right' ? 'order-2' : 'mr-[8px] order-1'}`}><div className="mark"><img src={`https://w7tips.fra1.digitaloceanspaces.com/images/missing/${variants[item.type]}.png`} width="20" height="20" /></div></div>
                  <div className={`${position === 'right' ? 'order-1 text-end ml-auto mr-[8px]' : 'order-2'}`}>{item.value}</div>
                </div>
              ))
            }
          </>
        </div>
      </div>
    </>


  )
}