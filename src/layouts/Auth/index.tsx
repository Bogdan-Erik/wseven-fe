import React, { useState, useEffect } from 'react';
import { Container, Footer } from '../../components';
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
    // 👇 add class to body element
    document.body.classList.add('auth-body');
  }, [])
  return (
    <>
      <Container className="container 2xl:mx-auto max-w-[100%] 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl mx-auto "><Header variant={'primary'} /></Container>
      <div className=" auth-bg">
        <div className="overflow-hidden">
          {children}
        </div>
      </div>

      <Footer socialBar={socialBar} />
    </>
  )
}