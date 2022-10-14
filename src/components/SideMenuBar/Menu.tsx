import React from 'react'
import './SideMenuBar.css';
import { Icon } from '../Icon';
import { twMerge } from 'tailwind-merge';
import { Button } from '../Button';
import { Link } from "react-router-dom";

export interface SideMenuBarProps {
  isMobileMenu?: boolean
}

const MenuItem = ({ isActive, icon, text, link, isMobile }: { isActive?: boolean, icon: string, text: string, link: string, isMobile: boolean }) => {
  const menuItemClass = twMerge(`
  w-auto max-w-[120px] ${isMobile ? 'min-w-[120px]' : ''} content-center h-[97px] menu-item ${isActive ? 'active' : ''}
  `)
  return (
    <Link to={link ?? '/'}>
      <div className={menuItemClass}>
        <div><Icon icon={icon} size={'text-2xl'} color={"#ffffff"} iconClasses="text-rgba-grey" isGradient={false} /></div>
        <div className="text-xs lg:text-sm  mt-[5px]">{text}</div>
      </div>
    </Link>
  )
}

export const Menu = ({ isMobileMenu = false }: SideMenuBarProps): JSX.Element => {
  const holderClass = twMerge(`
  grid grid-cols-2 gap-2 justify-center mt-[30px] px-[5px] lg-gap-5 lg:px-[25px] mb-[30px] ${isMobileMenu ? 'grid-cols-2 sm:grid-cols-3 sm:gap-4  place-items-center ' : ''}
  `)
  return (
    <div>
      <div className={holderClass}>
        <MenuItem icon={'house'} text={'Vezérlőpult'} isActive={true} isMobile={isMobileMenu} link="/dashboard" />
        <MenuItem icon={'stat-bordered'} text={'Elemzések'} isMobile={isMobileMenu} link="/developing" />
        <MenuItem icon={'calendar'} text={'Naptár'} isMobile={isMobileMenu} link="/developing" />
        <MenuItem icon={'sign'} text={'Challenge'} isMobile={isMobileMenu} link="/developing" />
        <MenuItem icon={'donut'} text={'Statisztikák'} isMobile={isMobileMenu} link="/developing" />
        <MenuItem icon={'military'} text={'Jutalmak'} isMobile={isMobileMenu} link="/developing" />
        <MenuItem icon={'money'} text={'Bank'} isMobile={isMobileMenu} link="/developing" />
        <MenuItem icon={'store'} text={'Piactér'} isMobile={isMobileMenu} link="/developing" />
        <MenuItem icon={'house'} text={'Információk'} isMobile={isMobileMenu} link="/developing" />
        <MenuItem icon={'settings'} text={'Beállítások'} isMobile={isMobileMenu} link="/developing" />
      </div>

      <div className="flex justify-center  px-[30px] mb-[30px]">
        <Button primary customClasses="w-full"> Prémium előfizetés</Button>
      </div>
    </div>
  )
}