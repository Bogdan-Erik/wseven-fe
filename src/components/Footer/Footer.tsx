import React from 'react'
import './Footer.css';

export interface FooterProps {

}

export const Footer = ({ }: FooterProps): JSX.Element => {
  return (
    <div className="container mx-auto mb-[60px] md:mb-[30px]">
      <div className="flex justify-center flex-col text-rgba-grey-08 w-full md:flex-row">
        <div className="flex-1 flex justify-center md:justify-start order-3 md:order-1">2022 © Minden jog fenntartva</div>
        <div className="flex-1 justify-center flex flex-column mt-2 mb-[30px] md:mb-[0] md:mt-0 order-1 md:order-2">
          <div className="mr-8"><a href="https://www.facebook.com/w7tips/" target={'blank'}><span className={`font-icomoon icon icon-facebook text-2xl`} /></a></div>
          <div><a href="https://www.instagram.com/w7tips_eu/" target={'blank'}><span className={`font-icomoon icon icon-instagram text-2xl`} /></a></div>
        </div>
        <div className="flex-1 justify-center flex flex-col text-center md:flex-row md:justify-end order-2 md:order-3">
          <div className="mb-[10px] md:mr-16 md:mb-[0]">Impresszum</div>
          <div className="mb-[10px] md:mb-[0]">Adatkezelési tájékoztató</div>
        </div>
      </div>
    </div>
  )
}