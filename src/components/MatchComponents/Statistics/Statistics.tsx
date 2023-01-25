import React from 'react'
import { twMerge } from 'tailwind-merge';
import {  StatisticsChart } from '../../';

export interface StatisticsDatas {
  type: string
  score: number
}
export interface StatisticsProps {
  datas: StatisticsDatas[],
  position?: string,

}

export const Statistics = ({
  datas = [],
  position = 'left',
  ...props

}: StatisticsProps): JSX.Element => {
  return (
    <div className={twMerge(`holder-space-top holder-space ${position === 'right' ? 'text-right' : 'text-left'}`)}>
      <span className="title">Forma</span>
      <StatisticsChart datas={datas} customHolderClass={position === 'right' ? 'ml-auto' : ''} />

    </div>
  )
}