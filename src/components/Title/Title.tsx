import React from 'react'
import { twMerge } from 'tailwind-merge';
import './Title.css';

export interface TitleProps {
  title: React.ReactNode
  subTitle?: React.ReactNode,
  titleClass?: string,
  subTitleClass?: string,
}

export const Title = ({ title, subTitle, titleClass, subTitleClass }: TitleProps): JSX.Element => {
  const subTitleClasses = twMerge(`text-lg text-rgba-grey-08 lg:text-xl mt-5 font-normal ${subTitleClass}`)
  const titleClasses = twMerge(`text-2xl md:text-3xl lg:text-[40px] leading-[120%] font-medium ${titleClass}`)
  return (
    <div>
      <div className={titleClasses}>
        {title}
      </div>
      {subTitle && (
        <div className={subTitleClasses}>
          {subTitle}
        </div>
      )}
    </div>
  )
}