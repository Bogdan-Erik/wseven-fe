import React from 'react'
import './Title.css';

export interface TitleProps {
  title: React.ReactNode
  subTitle?: React.ReactNode
}

export const Title = ({ title, subTitle }: TitleProps): JSX.Element => {
  return (
    <div>
      <div className="text-2xl md:text-3xl lg:text-[40px] leading-[120%] font-medium">
        {title}
      </div>
      {subTitle && (
        <div className="text-rgba-grey-08 text-xl mt-5 font-normal">
          {subTitle}
        </div>
      )}
    </div>
  )
}