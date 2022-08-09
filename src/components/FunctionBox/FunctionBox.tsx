import React from 'react'
import { Icon } from '../Icon';
import { IconBadge } from '../IconBadge';
import './FunctionBox.css';

export interface FunctionBoxProps {
  icon: string,
  customIconSize?: string,
  title: string,
  description: string
}

export const FunctionBox = ({ icon, customIconSize, title, description }: FunctionBoxProps): JSX.Element => {
  return (
    <div className="flex flex-col lg:flex-row mb-[40px]">
      <div className="flex justify-center mb-[10px]"><IconBadge classes={'backdrop-blur-[6px]'} width="w-[60px]" height="h-[60px]">
        <Icon icon={icon} size={customIconSize ?? '3xl'} color={"#ffffff"} isGradient={true} /></IconBadge>
      </div>
      <div className="text-center lg:text-left lg:ml-[20px]">
        <div className="font-semibold text-xl mb-[10px]  lg:mt-[15px]">{title}</div>
        <div className="text-rgba-grey-08 text-md leading-6	">{description}</div>
      </div>
    </div>
  )
}