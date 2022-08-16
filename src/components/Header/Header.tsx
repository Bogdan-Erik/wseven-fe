import React, { useState, useRef, useEffect } from 'react'
import './Header.css';
import logo from './../../assets/images/logo.svg';
import { Button } from '../Button';
import autoAnimate from '@formkit/auto-animate'

type User = {
  name: string;
};

export interface HeaderProps {
  variant: 'primary' | 'secondary' | 'tertiary';
  user?: User;
}

export const Header = ({ variant = 'primary', user }: HeaderProps): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (menuOpen) {
      // const span = ref.current; // corresponding DOM node
      // span.className.add;
    }
  }, [menuOpen]);
  return (
    <header className="relative z-[1]">
      <div className={"wrapper font-poppins" + (variant === "primary" ? ' primary-wrapper' : ' secondary-wrapper')}>
        <>
          <div className={'' + (variant === "tertiary" ? "flex w-full justify-center" : (variant === 'secondary' ? (" secondary-menu") : ''))}>
            <img src={logo} style={{ height: '30px' }} />
          </div>
          {variant === "secondary" && (
            <div className="w-full border-b-2 flex h-full md:border-b-[1px] md:border-b-rgba-grey-01">
              <div className="text-white  menu-bar">
                <div>Minden sportág</div>
                <div><span className="font-icomoon icon icon-football"></span>Foci</div>
                <div><span className="font-icomoon icon icon-football"></span>Tenisz</div>
              </div>
              <div className="text-white flex action-menu-bar">
                <div className="text-rgba-grey-08 hidden lg:block">2022. július 7. 12:58</div>
                <div>
                  <span className="relative inline-block ml-8">
                    <span className="font-icomoon icon icon-bell text-xl text-rgba-grey-08"></span>
                    <span className="absolute top-0 right-0 inline-block w-4 h-4 transform translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-gradient-blue-start to-gradient-purple-end rounded-full"></span>
                  </span>

                </div>
                <div><span className="font-icomoon icon icon-exit text-xl text-rgba-grey-08"></span></div>
              </div>
            </div>
          )}

          {variant === "primary" && (
            <div>
              {user ? (
                <>
                  <span className="welcome">
                    Welcome, <b>{user.name}</b>!
                  </span>
                </>
              ) : (
                <>
                  <div className={"hidden flex-row text-white font-poppins header-menu md:w-full md:flex " + (menuOpen ? "menu-open" : " ")}>
                    <div className="px-5">
                      <a href="#" className="item">Főoldal</a>
                    </div>
                    <div className="px-5 text-light-grey font-medium hover:text-white">
                      <a href="#" className="item">Regisztráció</a>
                    </div>
                    <div className="px-5 text-light-grey font-medium hover:text-white">
                      <a href="#" className="item">Bejelentkezés</a>
                    </div>
                  </div>
                  <div className="menu-icon"><span className={"flex md:hidden font-icomoon  text-light-grey text-3xl " + (!menuOpen ? 'icon-user' : 'icon-x')} onClick={() => setMenuOpen(!menuOpen)}></span></div>
                </>
              )}
            </div>
          )}

        </>


      </div>
    </header >
  )
}