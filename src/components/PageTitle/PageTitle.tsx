import React from 'react'
import { Icon } from '../Icon';
import './PageTitle.css';

export interface PageTitleProps {
  icon?: string,
  title: string
}

export const PageTitle = ({ icon, title }: PageTitleProps): JSX.Element => {
  return (
    <div className="flex flex-row gap-[14px] mb-[20px]">
      {icon && (<div className="flex items-center"><Icon icon={icon} isGradient size={'text-[24px]'} /></div>)}
      <div className="font-[600] text-[20px]">{title}</div>
    </div>
  )
}