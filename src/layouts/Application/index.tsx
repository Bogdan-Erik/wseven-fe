import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Button, Footer, MobileMenuBar, SideMenuBar } from '../../components';
import { Header } from './../../components/Header';
import './index.scss';

export interface LayoutProps {
  children: JSX.Element[] | JSX.Element | string
}

export default ({ children }: LayoutProps) => {
  const [showMenu, setShowMenu] = useState();
  const location = useLocation();

  useEffect(() => {
    // 👇 add class to body element
    document.body.classList.add('app-body');
  }, [])
  return (
    <>
      <div className="text-white flex bg app-body">
        <div className="hidden md:block w-[200px] lg:w-[320px]">
          <SideMenuBar />
        </div>
        <main className="relative sm:flex-2 pb-footerHeight flex flex-col sm:w-[300px] px-[5px] sm:px-0 w-full">
          <Header variant={'secondary'} />
          <MobileMenuBar visible={showMenu}  />
          <div>
            {children}
          </div>
        </main>
      </div>
      <></>
    </>
  )
}