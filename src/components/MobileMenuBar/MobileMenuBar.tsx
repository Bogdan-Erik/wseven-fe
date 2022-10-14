import React from 'react'
import './MobileMenuBar.css';
import {Menu} from './../SideMenuBar/Menu';
import { twMerge } from 'tailwind-merge';
export interface MobileMenuBarProps {
  visible?: boolean
}

export const MobileMenuBar = ({ visible }: MobileMenuBarProps): JSX.Element => {
  const classNames = twMerge(`
  absolute z-[20] top-[50px] left-0 w-full px-[30px] md:hidden mobile-menu-bg ${visible ? '' : 'hidden'}
  `)
  return (
    <div className={classNames}>
      <Menu isMobileMenu={true} />
    </div>
  )
}