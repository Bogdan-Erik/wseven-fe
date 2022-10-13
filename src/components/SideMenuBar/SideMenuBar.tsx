import React from 'react'
import './SideMenuBar.css';
import logo from './../../assets/images/logo.svg';
import { Icon } from '../Icon';
import { twMerge } from 'tailwind-merge';
import { Button } from '../Button';
import { Link } from "react-router-dom";

export interface SideMenuBarProps {

}

const MenuItem = ({ isActive, icon, text, link }: { isActive?: boolean, icon: string, text: string, link: string }) => {
  const menuItemClass = twMerge(`
  w-[120px] h-[97px] menu-item ${isActive ? 'active' : ''}
  `)
  return (
    <Link to={link ?? '/'}>
      <div className={menuItemClass}>
        <div><Icon icon={icon} size={'text-2xl'} color={"#ffffff"} iconClasses="text-rgba-grey" isGradient={false} /></div>
        <div className="text-sm  mt-[5px]">{text}</div>
      </div>
    </Link>
  )
}

export const SideMenuBar = ({ }: SideMenuBarProps): JSX.Element => {
  return (
    <div className="side-menubar">
      <div className="flex justify-center mt-[25px]">
        <img src={logo} style={{ height: '30px' }} />
      </div>

      <div className="flex flex-col items-center justify-center mt-[40px]">
        <div><img src={'https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png'} className="rounded-full w-[95px] h-[99px]" /></div>
        <div className="mt-[20px] font-semibold text-lg">Példa Béla</div>
        <div className="text-rgba-white-05 text-xs">Ingyenes csomag</div>
      </div>

      <div className="token-block">
        <div className="flex justify-center">
          <div><Icon icon={'coin'} size={'text-3xl'} color={"#ffffff"} isGradient={true} iconClasses="mr-[14px]" /></div>
          <div><span>55</span> token</div></div>
      </div>

      <div className='grid grid-cols-2 gap-5 justify-center mt-[30px] px-[25px] mb-[30px]'>
        <MenuItem icon={'house'} text={'Vezérlőpult'} isActive={true} link="/dashboard" />
        <MenuItem icon={'stat-bordered'} text={'Elemzések'} link="/developing" />
        <MenuItem icon={'calendar'} text={'Naptár'} link="/developing" />
        <MenuItem icon={'sign'} text={'Challenge'} link="/developing" />
        <MenuItem icon={'donut'} text={'Statisztikák'} link="/developing" />
        <MenuItem icon={'military'} text={'Jutalmak'} link="/developing" />
        <MenuItem icon={'money'} text={'Bank'} link="/developing" />
        <MenuItem icon={'store'} text={'Piactér'} link="/developing" />
        <MenuItem icon={'house'} text={'Információk'} link="/developing" />
        <MenuItem icon={'settings'} text={'Beállítások'} link="/developing" />
      </div>

      <div className="flex justify-center  px-[30px] mb-[30px]">
        <Button primary customClasses="w-full"> Prémium előfizetés</Button>
      </div>
    </div>
  )
}