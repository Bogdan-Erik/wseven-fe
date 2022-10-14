import React, { useState } from 'react';
import { Button, Footer, MobileMenuBar, SideMenuBar } from '../../components';
import { Header } from './../../components/Header';
import './index.scss';

export interface LayoutProps {
  children: JSX.Element[] | JSX.Element | string
}

export default ({ children }: LayoutProps) => {
  const [showMenu, setShowMenu] = useState();
  return (
    <>
      <div className="text-white flex bg">
        <div className="hidden md:block w-[200px] lg:w-[320px]">
          <SideMenuBar />
        </div>
        <main className="relative sm:flex-2 pb-footerHeight flex flex-col sm:w-[300px] px-[5px] sm:px-0 w-full">
          <Header variant={'secondary'} />
          <MobileMenuBar visible={showMenu}  />
          <div>
            <div className="md:hidden"><Button primary customClasses="w-full" onClick={() => setShowMenu(true)}> Menü mutatása</Button></div>
            {children}
          </div>
        </main>
      </div>
      <></>
    </>
  )
}