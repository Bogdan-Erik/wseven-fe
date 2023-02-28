import React, { useEffect, useState } from "react";
import "./SideMenuBar.css";
import logo from "./../../assets/images/logo.svg";
import { Icon } from "../Icon";
import { twMerge } from "tailwind-merge";
import { Button } from "../Button";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "./Menu";
import { useLazyGetMyselfQuery } from "../../redux/CustomerSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useLazyGetBalanceQuery } from "../../redux/BankSlice";
import ReactLoading from "react-loading";
import { setMenu } from "../../redux/globalSlice";
import { useLazyGetSportCategoriesQuery } from "../../redux/MatchSlice";
import { BankrollManagementModal } from "../BankrollManagementModal";

export interface SideMenuBarProps {}

export const SideMenuBar = ({}: SideMenuBarProps): JSX.Element => {
  const location = useLocation();
  const customer = useSelector((state: RootState) => state.customer);
  const bank = useSelector((state: RootState) => state.bank);
  const dispatch = useDispatch();

  const [trigger] = useLazyGetMyselfQuery();
  const [triggerBalance] = useLazyGetBalanceQuery();
  const [triggerSportCategories] = useLazyGetSportCategoriesQuery();
  const [showBankrollModal, setShowBankrollModal] = useState(false);

  useEffect(() => {
    triggerBalance({});
    trigger({});
    setLocalMenu();
  }, [location]);

  useEffect(() => {
    if (customer.name && customer.playingType === null) {
      setShowBankrollModal(true);
    }
  }, [customer, location])

  const setLocalMenu = async () => {
    let menus: any[] = [];

    if (location.pathname?.includes("/analyses-overview")) {
      await triggerSportCategories().then((data: any) => {
        menus = [
          {
            label: "Minden meccs",
            location: "/analyses-overview",
          },
        ];
        const { data: sportData } = data;
        menus = [
          ...menus,
          ...sportData?.map((item: any) => {
            return {
              label: item.name,
              location: `/analyses-overview/${item.id}`,
            };
          }),
        ];
      });
    } else if (location.pathname?.includes("settings")) {
      menus = [
        {
          label: "Felhasználói adatok",
          location: "/settings",
          icon: 'icon-user-settings'
        },
        {
          label: "Előfizetés",
          location: "/settings/subscription",
          icon: 'icon-subscription-settings',
          isDisabled: true,
        },
        {
          label: "Értesítések",
          location: "/settings/notifications",
          icon: 'icon-bell',
          isDisabled: true,
        },
        {
          label: "Jutalmak",
          location: "/settings/rewards",
          icon: 'icon-military',
          isDisabled: true,
        },
        {
          label: "Információk",
          location: "/settings/infos",
          icon: 'icon-info',
          isDisabled: true,
        },
      ];
    } else if (location.pathname?.includes("/analyses/")) {
      menus = [
        {
          label: "Vissza az elemzés listába",
          location: "/analyses-overview",
          icon: 'icon-back-arrow'
        },
      ];
    }

    dispatch(setMenu(menus));
  };
  return (
    <div className="side-menubar">
      <div className="flex justify-center mt-[25px]">
        <img src={logo} style={{ height: "30px" }} />
      </div>

      <div className="flex flex-col items-center justify-center mt-[40px]">
        <div className="relative">
          {!customer?.image && (
            <div className="w-[95px] h-[99px] rounded-full bg-black opacity-[.8] absolute flex justify-center items-center">
              <ReactLoading
                type={"spin"}
                color={"#ffffff"}
                height={40}
                width={40}
              />
            </div>
          )}
          <img
            src={customer.image}
            className="rounded-full w-[95px] h-[99px]"
          />
        </div>
        <div className="mt-[20px] font-semibold text-lg">{customer.name}</div>
        <div className="text-rgba-white-05 text-xs">Ingyenes csomag</div>
      </div>

      <div className="token-block flex px-[34px] flex-col xl:flex-row">
        <div className="flex-1">
          <div className="text-[10px] text-rgba-grey-06 text-left mb-[5px]">
            W7 token egyenleg
          </div>
          <div className="flex">
            <div>
              <Icon
                icon={"coin"}
                size={"text-xl"}
                color={"#ffffff"}
                isGradient={true}
                iconClasses="mr-[14px]"
              />
            </div>
            <div className="text-[16px]">
              <span>0</span> token
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="text-[10px] text-rgba-grey-06 text-left mb-[5px]">
            Virtuális egyenleg
          </div>
          <div className="flex">
            <div>
              <Icon
                icon={"money"}
                size={"text-xl"}
                color={"#ffffff"}
                isGradient={true}
                iconClasses="mr-[14px]"
              />
            </div>
            <div className="text-[16px]">
              <span>
                {bank.balance?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </span>{" "}
              Ft
            </div>
          </div>
        </div>
      </div>

      <Menu />
      <BankrollManagementModal showModal={showBankrollModal} setShowModal={setShowBankrollModal} confirmAction={undefined} isClosable={false} />
    </div>
  );
};
