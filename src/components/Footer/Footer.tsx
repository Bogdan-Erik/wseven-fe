import React from 'react'
import './Footer.css';

export interface FooterProps {

}

export const Footer = ({ }: FooterProps): JSX.Element => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center flex-col text-rgba-grey-08 w-full md:flex-row">
        <div className="flex-1 flex justify-center md:justify-start">2022 © Minden jog fenntartva</div>
        <div className="flex-1 justify-center flex flex-column mt-2 md:mt-0">
          <div className="mr-8"><span className={`font-icomoon icon icon-facebook text-2xl`} /></div>
          <div><span className={`font-icomoon icon icon-instagram text-2xl`} /></div>
        </div>
        <div className="flex-1 justify-center flex flex-column md:justify-end">
          <div className="mr-16">Impresszum</div>
          <div>Adatkezelési tájékoztató</div>
        </div>
      </div>
    </div>
  )
}