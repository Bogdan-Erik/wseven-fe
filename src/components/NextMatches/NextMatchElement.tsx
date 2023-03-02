import moment from 'moment';
import React from 'react'
import { twMerge } from 'tailwind-merge';
import "./NextMatches.scss";

export interface NextMatchesProps {
    eventInfo: any
}

export const NextMatchElement = ({ eventInfo }: NextMatchesProps): JSX.Element => {
  return (
    <div className={twMerge(`relative ${eventInfo.className?.toString('')?.replace(',', ' ')}`)}>
    <div className="flex flex-row">
      <div className="text-[12px] font-[700] flex-[1]">{moment(eventInfo.start).format('HH:mm')} - {moment(eventInfo.end).format('HH:mm')} </div>
      <div className='flex items-right  right-[5px] top-[5px]'><img src={eventInfo.extendedProps?.tv?.logo ?? eventInfo?.extendedProps?.tv?.name} className="max-h-[17px] max-w-[100px]" /></div>
    </div>
    <div className="text-[12px] font-[600] whitespace-nowrap	overflow-hidden	">{eventInfo.title}</div>
  </div>
  )
}