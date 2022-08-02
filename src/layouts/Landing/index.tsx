import React from 'react';
import { Footer } from '../../components';
import { Header } from './../../components/Header';
import './index.scss';

export interface LayoutProps {
  children: JSX.Element[] | JSX.Element | string
}

export default ({ children }: LayoutProps) => {
  return (
    <>
      <Header variant={'tertiary'} />
      <div>
        {children}
      </div>
      <Footer />
      <></>
    </>
  )
}