import React, { useEffect, useState } from 'react'
import './MobileMenuBar.css';
import { Menu } from './../SideMenuBar/Menu';
import { twMerge } from 'tailwind-merge';
import { Icon } from '../Icon';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion"
import { BankrollManagementModal } from '../BankrollManagementModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useLazyGetSportCategoriesQuery } from "../../redux/MatchSlice";
import { useRenewTokenMutation } from "../../redux/api/authApiSlice";
import { setAuthToken } from "../../redux/authSlice";
import { useLazyGetBalanceQuery } from '../../redux/BankSlice';
import { useLazyGetMyselfQuery } from '../../redux/CustomerSlice';
export interface MobileMenuBarProps {
  visible?: boolean
}
const MenuItem = ({ isActive, icon, link, onClick, iconSize }: { isActive?: boolean, icon: string, link?: string, iconSize?:string, onClick?: () => void;  }) => {
  const menuItemClass = twMerge(`
  w-[60px] h-[60px] flex justify-center items-center cursor-pointer ${isActive ? 'active' : ''}
  `)
  return (
    <div className="h-full justify-self-center">
      {link ? (
        <Link to={link ?? '/'}>
          <div className={menuItemClass} onClick={onClick}>
            <Icon icon={icon} size={'text-2xl'} color={"#ffffff"} iconClasses={`text-rgba-grey-08 ${iconSize ?? ''}`} isGradient={false} />
          </div>
        </Link>
      ) : (
        <div className={menuItemClass} onClick={onClick}>
          <Icon icon={icon} size={'text-2xl'} color={"#ffffff"} iconClasses={`text-rgba-grey-08 ${iconSize ?? ''}`}  isGradient={false} />
        </div>
      )}
    </div>

  )
}
const dropIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,

  },
  exit: {
    opacity: 0,
  },
}

export const MobileMenuBar = ({ visible }: MobileMenuBarProps): JSX.Element => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const [showBankrollModal, setShowBankrollModal] = useState(false);
  const customer = useSelector((state: RootState) => state.customer);
  const [trigger] = useLazyGetMyselfQuery();
  const [triggerBalance] = useLazyGetBalanceQuery();
  const [triggerSportCategories] = useLazyGetSportCategoriesQuery();
  const [renewToken, { isLoading: updateIsLoading }] = useRenewTokenMutation();

  useEffect(() => {
    triggerBalance({});
    trigger({});
  }, [location]);
  useEffect(() => {
    // 👇 add class to body element
    if (showMenu) {
      document.getElementsByTagName('header')[0].classList.add('bg-rgba-grey-dark-09');

    } else {
      document.getElementsByTagName('header')[0].classList.remove('bg-rgba-grey-dark-09');

    }
  }, [showMenu])

  useEffect(() => {
    if (
      customer.name &&
      customer.playingType === null &&
      customer.isPremium === true
    ) {
      setShowBankrollModal(true);
    }
  }, [customer, location]);

  const classNames = twMerge(`
  fixed h-full z-[20] top-[0px] pt-[50px] left-0 w-full px-[30px] md:hidden mobile-menu-b bg-rgba-grey-dark-09 overflow-auto pb-[50px]  ${showMenu ? '' : 'opacity-0'}
  `)
  return (
    <div>
      {showMenu && (
      <motion.div className={classNames} variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit">
      <Menu isMobileMenu={true} setShowMenu={setShowMenu} />
      <div className="mobile-bottom-menu-bar z-[10] flex justify-end flex-row items-center pr-[35px]">
        <div className=' cursor-pointer' onClick={() => setShowMenu(false)}><Icon icon='cross' size={'text-2xl'} color={"#ffffff"} /></div>
      </div>
    </motion.div>
      )}

      <div className="mobile-bottom-menu-bar">
        <div className="grid grid-cols-5 gap-2">
          <MenuItem icon='house' link={'/dashboard'} isActive={location.pathname === '/dashboard'} />
          <MenuItem icon='stat-bordered' link={'/analyses-overview'} isActive={location.pathname === '/analyses-overview'} />
          <MenuItem icon='calendar' link={'/calendar'} isActive={location.pathname === '/calendar'} iconSize="text-[28px]" />
          <MenuItem icon='ticket-new' link={'/tickets'} isActive={location.pathname === '/tickets'} />
          <MenuItem icon='hamburger' onClick={() => setShowMenu(true)} isActive={false} />
        </div>
      </div>
      <BankrollManagementModal
        showModal={showBankrollModal}
        setShowModal={setShowBankrollModal}
        confirmAction={undefined}
        isClosable={false}
      />
    </div>
  )
}