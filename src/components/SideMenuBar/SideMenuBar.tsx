import React, { useEffect } from 'react'
import './SideMenuBar.css';
import logo from './../../assets/images/logo.svg';
import { Icon } from '../Icon';
import { twMerge } from 'tailwind-merge';
import { Button } from '../Button';
import { Link, useLocation } from "react-router-dom";
import { Menu } from './Menu';
import { useLazyGetMyselfQuery } from '../../redux/CustomerSlice';
export interface SideMenuBarProps {

}

export const SideMenuBar = ({ }: SideMenuBarProps): JSX.Element => {
  const location = useLocation();

  const [trigger] = useLazyGetMyselfQuery();
  useEffect(() => {
    console.log('változott')
    trigger();
  }, [location])
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

      <Menu />
    </div>
  )
}