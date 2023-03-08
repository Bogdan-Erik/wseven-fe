import React from 'react'
import { twMerge } from 'tailwind-merge';
import './StatisticsChart.scss';

enum ResultTypes {
  win = 'win',
  loose = 'loose',
  draw = 'draw'
}
export interface StatisticsChartDatas {
  type: ResultTypes | string,
  score: number,
  isLast?: boolean,
}

export interface StatisticsChartProps {
  datas: StatisticsChartDatas[],
  customHolderClass?: string
}


const Element = ({ type, score, isLast }: StatisticsChartDatas) => {
  const value = score * 7;
  const color = type === 'win' ? 'bg-green' : (type === 'loose') ? 'bg-red' : 'bg-yellow';
  const height = type === 'draw' ? '4px' : `${value}px`;
  const style = twMerge(`
    ${color} ${height} w-[20px] ${type === 'loose' ? 'rounded-b-[3px]' : (type === 'win' ? 'rounded-t-[3px]' : 'rounded-t-[3px] rounded-b-[3px]')} ${!isLast ? 'mr-[2px]' : ''}  self-end relative
    `)
  return (
    <div className={style} style={{ height: height, bottom: (type === 'loose' ? -(score * 7) - 1 : (type === 'draw' ? -2 : 0)) }}></div>
  )
}


export const StatisticsChart = ({ datas = [], customHolderClass }: StatisticsChartProps): JSX.Element => {
  const customClass = twMerge(`w-[138px]  h-[56px] ${customHolderClass ?? ''}`)
  return (
    <div className={customClass}>
      <div className="holder h-[28px] flex flex-row justify-center items-center relative border-b-[1px] border-rgba-grey">
        {datas?.map((item: StatisticsChartDatas, key: number) => {
          return <Element type={item.type} score={item.score} isLast={key === (datas.length - 1)} />
        })}
      </div>

    </div>
  )
}