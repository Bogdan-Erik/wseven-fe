import React, { useState, useEffect } from 'react';
import { Footer } from '../../components';
import { Header } from './../../components/Header';
import './index.scss';
import { useLocation } from 'react-router-dom'

export interface LayoutProps {
  children: JSX.Element[] | JSX.Element | string
}

export default ({ children }: LayoutProps) => {
  const [socialBar, setSocialBar] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!['/', '/subscribe-success'].includes(location.pathname)) {
      setSocialBar(true);
    }
  }, [])
  
  return (
    <>
      <Header variant={'tertiary'} />
      <div className="overflow-hidden">
        {children}
      </div>
      <Footer socialBar={socialBar} />
      <></>
    </>
  )
}