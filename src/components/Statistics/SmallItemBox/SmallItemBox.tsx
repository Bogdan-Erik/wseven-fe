import React from 'react'
import { BlackBox } from '../../BlackBox';
import './SmallItemBox.scss';


export interface SmallItemBoxProps {
  value: string
  title: string,
  subTitle: string
}



export const SmallItemBox = ({ value, title, subTitle }: SmallItemBoxProps): JSX.Element => {
  return (
    <BlackBox hoverEffect>
      <div className="text-[48px] font-[600] text-center">{value}</div>
      <div className="font-[600] text-center">{title}</div>
      <div className="text-rgba-grey-06 text-center">{subTitle}</div>
    </BlackBox>
  )
}