import React, { useEffect } from "react";
import "./SideMenuBar.css";
import { Icon } from "../Icon";
import { twMerge } from "tailwind-merge";
import { Button } from "../Button";
import { Link, useLocation } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

export interface SideMenuBarProps {
  isMobileMenu?: boolean;
  setShowMenu?: any;
}

const MenuItem = ({
  isActive,
  isDisabled = false,
  icon,
  text,
  link,
  isMobile,
  onClick,
}: {
  isActive?: boolean;
  isDisabled?: boolean;
  icon: string;
  text: string;
  link: string;
  isMobile: boolean;
  onClick?: any;
}) => {
  const menuItemClass = twMerge(`
  w-auto max-w-[120px] ${
    isMobile ? "min-w-[120px]" : ""
  } content-center h-[97px] ${
    isDisabled ? "menu-item-disabled cursor-default	" : "menu-item"
  }  ${isActive ? "active" : ""}
  `);
  return (
    <>
      {isDisabled ? (
        <Tippy
          content={<span className="text-[12px] font-[600]">Hamarosan</span>}
        >
          <div className={menuItemClass} onClick={onClick}>
            <div>
              <Icon
                icon={icon}
                size={"text-2xl"}
                color={"#ffffff"}
                iconClasses={
                  !isDisabled ? "text-rgba-grey" : "text-rgba-grey-003"
                }
                isGradient={false}
              />
            </div>
            <div className="text-xs lg:text-sm  mt-[5px]">{text}</div>
          </div>
        </Tippy>
      ) : (
        <Link to={!isDisabled ? link ?? "/" : "#"}>
          <div className={menuItemClass} onClick={onClick}>
            <div>
              <Icon
                icon={icon}
                size={"text-2xl"}
                color={"#ffffff"}
                iconClasses={
                  !isDisabled ? "text-rgba-grey" : "text-rgba-grey-003"
                }
                isGradient={false}
              />
            </div>
            <div className="text-xs lg:text-sm  mt-[5px]">{text}</div>
          </div>
        </Link>
      )}
    </>
  );
};

export const Menu = ({
  isMobileMenu = false,
  setShowMenu,
}: SideMenuBarProps): JSX.Element => {
  const location = useLocation();

  const holderClass = twMerge(`
  grid grid-cols-2 gap-2 justify-center mt-[30px] px-[5px] lg-gap-5 lg:px-[25px] mb-[30px] ${
    isMobileMenu
      ? "grid-cols-2 sm:grid-cols-3 sm:gap-4  place-items-center "
      : ""
  }
  `);
  return (
    <div>
      <div className={holderClass}>
        <MenuItem
          icon={"house"}
          text={"Vezérlőpult"}
          isActive={location.pathname === "/dashboard"}
          isMobile={isMobileMenu}
          link="/dashboard"
          onClick={() => setShowMenu && setShowMenu(false)}
        />
        <MenuItem
          icon={"stat-bordered"}
          text={"Elemzések"}
          isActive={location.pathname === "/analyses-overview"}
          isMobile={isMobileMenu}
          link="/analyses-overview"
          onClick={() => setShowMenu && setShowMenu(false)}
        />
        <MenuItem
          icon={"calendar"}
          text={"Naptár"}
          isActive={location.pathname === "/calendar"}
          isMobile={isMobileMenu}
          link="/calendar"
          onClick={() => setShowMenu && setShowMenu(false)}
        />
        <MenuItem
          icon={"ticket-new"}
          text={"Szelvények"}
          isActive={location.pathname === "/tickets"}
          isMobile={isMobileMenu}
          link="/tickets"
          onClick={() => setShowMenu && setShowMenu(false)}
        />
        <MenuItem
          icon={"money"}
          text={"Bank"}
          isActive={location.pathname === "/bank"}
          isMobile={isMobileMenu}
          link="/bank"
          onClick={() => setShowMenu && setShowMenu(false)}
        />
        <MenuItem
          icon={"donut"}
          text={"Statisztikák"}
          isDisabled={true}
          isActive={location.pathname === "/statistics"}
          isMobile={isMobileMenu}
          link="/statistics"
          onClick={() => setShowMenu && setShowMenu(false)}
        />
        <MenuItem
          icon={"timer"}
          text={"Élő"}
          isDisabled={true}
          isActive={location.pathname === "/live"}
          isMobile={isMobileMenu}
          link="/live"
          onClick={() => setShowMenu && setShowMenu(false)}
        />
        <MenuItem
          icon={"sign"}
          text={"Challenge"}
          isDisabled={true}
          isActive={location.pathname === "/challenges"}
          isMobile={isMobileMenu}
          link="/challenges"
          onClick={() => setShowMenu && setShowMenu(false)}
        />
        <MenuItem
          icon={"store"}
          text={"Piactér"}
          isDisabled={true}
          isActive={location.pathname === "/marketplace"}
          isMobile={isMobileMenu}
          link="/marketplace"
          onClick={() => setShowMenu && setShowMenu(false)}
        />
        <MenuItem
          icon={"settings"}
          text={"Beállítások"}
          isActive={location.pathname === "/settings"}
          isMobile={isMobileMenu}
          link="/settings"
          onClick={() => setShowMenu && setShowMenu(false)}
        />

        {/*<MenuItem icon={'info'} text={'Információk'} isActive={location.pathname === '/informations'} isMobile={isMobileMenu} link="/informations" onClick={() => setShowMenu && setShowMenu(false)} />*/}
      </div>

      {/*<div className="flex justify-center  px-[30px] mb-[30px]">
        <Button primary customClasses="w-full">
          {" "}
          Prémium előfizetés
        </Button>
  </div>*/}
    </div>
  );
};
