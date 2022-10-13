import React from 'react'
import './CookieConsent.css';
import CookieImg from './../../assets/images/cookie.png'
import { Button } from '../Button';
import { useCookies } from 'react-cookie';
export interface CookieConsentProps {

}

export const CookieConsent = ({ }: CookieConsentProps): JSX.Element => {
  const [cookies, setCookie] = useCookies(['cookie_consent']);

  return (
    <div className="fixed z-[100] bottom-[35px] md:right-[35px] md:w-[384px] h-[188px] p-[20px] cookie-consent">
      <div className=" absolute top-[-30px] left-[20px]"><img src={CookieImg} className="w-[61px] h-[61px]" /></div>
      <div className="flex flex-col mt-[20px]">
        <div className="">
          Statisztikai célokból, valamint a legjobb felhasználói élmény érdekében az oldal cookie-kat használ.
        </div>
        <div className="mt-[10px]">
          <Button primary customClasses={"w-full"} onClick={() => setCookie('cookie_consent', 1, {maxAge:3600*24*30})}>Rendben</Button>
        </div>
      </div>
    </div>
  )
}