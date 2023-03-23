import React from 'react'
import { Link } from 'react-router-dom';
import { Badge } from '../Badge';
import { BadgeType } from '../Badge/Badge';
import './NewsItem.css';

export interface NewsItemProps {
  image: string,
  children: string,
  badge?: string,
  extraClass?: string,
  link?: any
}

export const NewsItem = ({ link, image, children, badge, extraClass }: NewsItemProps): JSX.Element => {
  return (
    <Link to={link}>
    <div className={extraClass}>
      <div>
        <img src={image} className="rounded-md w-full h-[219px]" />
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
    </Link>
  )
}