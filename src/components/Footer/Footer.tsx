import React from 'react'
import './Footer.css';
import Adult from './../../assets/images/adult.png';
import logo from './../../assets/images/logo.svg';

export interface FooterProps {
  socialBar?: boolean
}

export const Footer = ({ socialBar }: FooterProps): JSX.Element => {
  return (
    <div className="container mx-auto mb-[60px] md:mb-[30px]">
      <div className="text-rgba-grey-08 text-[14px] px-[15px] py-[0px] flex flex-col md:flex-row">
        <div className="flex-[1] md:flex-[2] flex flex-col">
          <div className="flex flex-col md:flex-row ">
            <div className="w-[40px] md:w-[70px] lg:w-[50px] self-center md:mr-[20px] mb-[10px] md:mb-0">
              <img src={Adult} className="w-[44px] " />
            </div>
            <div className=" self-center text-center md:text-start">
              Oldalunkat csak 18 év felettiek használhatják! <br />
              Oldalunk nem tiltott szerencsejátek szervezéssel foglalkozik és nem is buzdít erre senkit!
            </div>
          </div>
        </div>
        <div className="flex-[1] flex justify-center md:justify-end">
          <div className="flex flex-row self-center mt-[65px] md:mt-0 gap-[30px]">
            <div><span className="font-icomoon icon icon-facebook text-[19px] mr-[10px] relative top-[4px] text-[14px]"></span>Facebook</div>
            <div><span className="font-icomoon icon icon-instagram text-[19px] mr-[10px] relative top-[4px] text-[14px]"></span>Instagram</div>
            <div><span className="font-icomoon icon icon-tiktok text-[19px] mr-[10px] relative top-[4px] text-[14px]"></span>TikTok</div>
          </div>
        </div>
      </div>
      <div className="text-rgba-grey-08 text-[14px] pb-[30px] border-b-[1px]  border-y-rgba-grey-02 mb-[30px]">
      </div>
      <div className="flex justify-center flex-col text-rgba-grey-08 w-full md:flex-row">
        <div className="flex-1 flex justify-center md:justify-start order-3 md:order-1">2022 © Minden jog fenntartva</div>
        <div className="flex-1 justify-center flex flex-column mt-2 mb-[30px] md:mb-[0] md:mt-0 order-1 md:order-2">
          {socialBar && (
            <>
              <div className="mr-8"><a href="https://www.facebook.com/w7tips/" target={'blank'}><span className={`font-icomoon icon icon-facebook text-2xl`} /></a></div>
              <div><a href="https://www.instagram.com/w7tips_eu/" target={'blank'}><span className={`font-icomoon icon icon-instagram text-2xl`} /></a></div>
            </>
          )}

        </div>
        <div className="flex-1 justify-center flex flex-col text-center md:flex-row md:justify-end order-2 md:order-3">
          {/*div className="mb-[10px] md:mr-16 md:mb-[0]">Impresszum</div>*/}
          <a target="_blank" href='https://w7tips.fra1.digitaloceanspaces.com/docs/adatvedelem.pdf'><div className="mb-[10px] md:mb-[0]">Adatkezelési tájékoztató</div></a>
        </div>
      </div>
    </div>
  )
}