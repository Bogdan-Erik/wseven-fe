import React from 'react'
import { twMerge } from 'tailwind-merge';
import TransformServerImage from '../../../utils/TransformServerImage';

export interface LeaguePositionProps {
  data: any,
  position: string,

}

export const LeaguePosition = ({
  data = null,
  position = 'left',
  ...props

}: LeaguePositionProps): JSX.Element => {
  return (
    <>
      <div className={`holder-space ${position === 'right' ? 'text-right' : ''}`}>
        <span className="title">{data.ranking_title}</span>
        <div className={`flex flex-row mt-[5px] ${position === 'right' ? 'justify-end' : ''}`}>
          <div className="text-[32px] font-semibold mr-[4px]">{data.place}.</div>
          <div className="flex flex-col justify-center">
            <div className={`text-xs ${position === 'right' ? 'text-left' : ''}`}>hely</div>
            <div className={`text-xs text-rgba-grey ${position === 'right' ? 'text-left' : ''}`}>({data.points ?? 0} pont)</div>
          </div>
        </div>
      </div>
    </>


  )
}