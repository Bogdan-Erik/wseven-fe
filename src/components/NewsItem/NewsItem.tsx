import React from 'react'
import { Badge } from '../Badge';
import { BadgeType } from '../Badge/Badge';
import './NewsItem.css';

export interface NewsItemProps {
  image: string,
  children: string,
  badge?: string,
  extraClass?: string,
}

export const NewsItem = ({ image, children, badge, extraClass }: NewsItemProps): JSX.Element => {
  return (
    <div className={extraClass}>
      <div>
        <img src={image} className="rounded-md" />
      </div>
      {badge && (
        <div className="mt-[10px]">
          <Badge type={BadgeType.Primary} label={badge} />
        </div>
      )}
      <div className="text-[18px] font-[600] mt-[20px]">
        {children}
      </div>
    </div>
  )
}