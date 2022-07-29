import React from 'react'
import './Footer.css';

export interface FooterProps {

}

export const Footer = ({ }: FooterProps): JSX.Element => {
  return (
    <div className="flex flex-column text-rgba-grey-08 w-full">
      <div className="flex-1">2022 © Minden jog fenntartva</div>
      <div className="flex-1 justify-center flex flex-column">
        <div className="mr-8"><span className={`font-icomoon icon icon-facebook text-2xl`} /></div>
        <div><span className={`font-icomoon icon icon-instagram text-2xl`} /></div>
      </div>
      <div className="flex-1 justify-end flex flex-column">
        <div className="mr-16">Impresszum</div>
        <div>Adatkezelési tájékoztató</div>
      </div>
    </div>
  )
}