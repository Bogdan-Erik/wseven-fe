import React from 'react';
import { Footer, SideMenuBar } from '../../components';
import { Header } from './../../components/Header';
import './index.scss';

export interface LayoutProps {
  children: JSX.Element[] | JSX.Element | string
}

export default ({ children }: LayoutProps) => {
  return (
    <>
      <div className="text-white flex">
        <div className="w-[320px]">
          <SideMenuBar />
        </div>
        <main className="relative sm:flex-2 pb-footerHeight flex flex-col sm:w-[300px] px-[5px] sm:px-0">
          <Header variant={'secondary'} />
          <div>
            {children}
          </div>
        </main>
      </div>
      <div className="overflow-hidden">
        {children}
      </div>
      <></>
    </>
  )
}