// @ts-nocheck
import React, { useState, useRef, useEffect } from "react";
import "./Header.css";
import logo from "./../../assets/images/logo.svg";
import LogoProd from "./../../assets/images/logo-prod.svg";
import logoDev from "./../../assets/images/logo_dev.svg";
import logoBeta from "./../../assets/images/logo_beta.svg";
import { Button } from "../Button";
import autoAnimate from "@formkit/auto-animate";
import { twMerge } from "tailwind-merge";
import { reset } from "../../redux/authSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { NotificationItem } from "../NotificationItem/NotificationItem";
import { AnimatePresence, motion } from "framer-motion";
import {
  useRemoveAllNotificationMutation,
  useRemoveNotificationMutation,
  useSetSeenNotificationMutation,
} from "../../redux/NotificationSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBellSlash } from "@fortawesome/free-regular-svg-icons";
import moment from "moment";
import { useSelector } from "react-redux";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import { useGetBalanceQuery, useGetBankQuery } from "../../redux/BankSlice";
type User = {
  name: string;
};

export interface HeaderProps {
  variant: "primary" | "secondary" | "tertiary";
  user?: User;
  notifications?: any[];
}

export const Header = ({
  variant = "primary",
  user,
  notifications,
}: HeaderProps): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const ref = useRef(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const {
    isLoading: isLoadingBank,
    data: bankData,
    refetch: bankRefetch,
  } = useGetBankQuery({});

  const {
    isLoading: isBalanceLoading,
    data: balanceData,
    refetch: balanceRefetch,
  } = useGetBalanceQuery({});


  const customer = useSelector((state: RootState) => state.customer);

  const global = useSelector((state: RootState) => state.global);

  useEffect(() => {
    if (menuOpen) {
      // const span = ref.current; // corresponding DOM node
      // span.className.add;
    }
  }, [menuOpen]);

  useEffect(() => {
    setLocalNotifications(notifications);
  }, [notifications]);
  const [localNotifications, setLocalNotifications] = useState<any>(
    notifications ?? []
  );
  const [loadedNotifications, setLoadedNotifications] = useState<any>([]);
  useEffect(() => {
    setLoadedNotifications(
      localNotifications ? localNotifications?.slice(0, 15) : []
    );
  }, [localNotifications]);

  const existsUnreadNotification = () => {
    return (
      localNotifications?.filter((item: any) => item.read === false).length ??
      []
    );
  };

  useEffect(() => {
    bankRefetch();
    balanceRefetch();
  }, [localNotifications])

  const [trigger] = useSetSeenNotificationMutation();
  const [removeTigger] = useRemoveNotificationMutation();
  const [removeAllTrigger] = useRemoveAllNotificationMutation();
  const headerclass = twMerge(
    `relative z-[100] ${variant === "secondary" ? "" : ""}`
  );

  const removeNotification = (id: any) => {
    const setFilteredNotis = localNotifications?.filter((item: any) => {
      return item.id !== id;
    });

    setLocalNotifications(setFilteredNotis);
  };

  const wrapperRef = useRef(null);
  const wrapperRefSecond = useRef(null);
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) 
    {
      if (wrapperRef.current && !wrapperRef.current?.contains(event.target)) {
        if (wrapperRefSecond.current && !wrapperRefSecond.current?.contains(event.target)) {
          setNotificationOpen(false);
        } else {

        }
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const removeAllNotification = () => {
    removeAllTrigger({});
    setLocalNotifications([]);
  };


  const [date, setDate] = useState(moment())
  const updateTime = () => {
    let clock = moment().add(1, 'second');
    setDate(clock);
  }

  useEffect(() => {
    setInterval(updateTime, 1000)

  },[]);
  return (
    <header className={headerclass}>
      <div
        className={
          "wrapper font-poppins" +
          (variant === "primary"
            ? " primary-wrapper"
            : " secondary-wrapper bg-transparent")
        }
      >
        <>
          <div
            className={
              "" +
              (variant === "tertiary"
                ? "flex w-full justify-center"
                : variant === "secondary"
                ? " secondary-menu ml-[20px]"
                : "")
            }
          >
            <img
              src={
                import.meta.env.VITE_ENV_FLAG === "prod"
                  ? LogoProd
                  : import.meta.env.VITE_ENV_FLAG === "dev"
                  ? logoDev
                  : logoBeta
              }
              style={{
                height:
                  import.meta.env.VITE_ENV_FLAG === "prod" ? "30px" : "44px",
              }}
            />
          </div>
          {variant === "secondary" && (
            <div className="w-full md:border-b-2 flex h-full md:border-b-[1px] md:border-b-rgba-grey-01 pl-[40px] bg-rgba-grey-dark-03 ">
              <div className="container mx-auto  2xl:max-w-screen-2xl 3xl:max-w-screen-3xl relative">
                <div className="w-full  flex h-full ">
                  <div className="text-white  menu-bar">
                    {global.menus?.map((item: any) => {
                      return (
                        <div
                          className={`${item?.isDisabled && "opacity-[.5]"} ${
                            item.location === location.pathname && "active"
                          }`}
                        >
                          <Tippy
                            disabled={!item.isDisabled}
                            content={
                              <span className="text-[12px] font-[600]">
                                Hamarosan
                              </span>
                            }
                          >
                            <Link
                              to={
                                item?.isDisabled ? "#" : item?.location ?? "#"
                              }
                              className={`d-block py-[20px] ${
                                item?.isDisabled
                                  ? "cursor-default"
                                  : "cursor-pointer"
                              }`}
                            >
                              {item?.icon && (
                                <span
                                  className={`mr-[10px] relative top-[2px] text-[18px] font-icomoon icon ${item?.icon}`}
                                ></span>
                              )}
                              {item.label}
                            </Link>
                          </Tippy>
                        </div>
                      );
                    })}
                    {/*<div><span className="font-icomoon icon icon-football"></span>Foci</div>
                    <div><span className="font-icomoon icon icon-tennis"></span>Tenisz</div>*/}
                  </div>
                  <div className="text-white flex action-menu-bar mr-[20px] lg:mr-[40px]">
                    <div className="text-rgba-grey-08 hidden lg:block">
                      {moment(date).format("YYYY. MMMM. D. HH:mm")}
                    </div>
                    <div>
                      <span
                      ref={wrapperRefSecond}
                        className="relative inline-block ml-8  top-[3px] md:top-0 cursor-pointer "
                        onClick={() => setNotificationOpen(!notificationOpen)}
                      >
                        <span className="font-icomoon icon icon-bell text-xl text-rgba-grey-08"></span>
                        {existsUnreadNotification() > 0 && (
                          <span className="absolute top-0 right-0 inline-block w-4 h-4 transform translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-gradient-blue-start to-gradient-purple-end rounded-full"></span>
                        )}
                      </span>

                      <AnimatePresence>
                        {notificationOpen && (
                          <motion.div
                          ref={wrapperRef}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="font-poppins absolute right-0 top-[50px] bg-dark-bg p-[20px] w-[346px] max-h-[743px] overflow-y-auto scrollable-noti rounded-[6px]"
                          >
                            {loadedNotifications.length > 0 && (
                              <div
                                className="font-[poppins] text-white text-[12px] font-[500] text-right cursor-pointer"
                                onClick={() => {
                                  removeAllNotification();
                                }}
                              >
                                Összes értesítés törlése
                              </div>
                            )}
                            <div className="mt-[10px]">
                              {loadedNotifications?.map(
                                (item: any, key: number) => {
                                  return (
                                    <div
                                      className={
                                        key < loadedNotifications.length - 1
                                          ? "mb-[20px]"
                                          : ""
                                      }
                                      key={key}
                                    >
                                      <NotificationItem
                                        title={item.title}
                                        content={item.content}
                                        seenProp={item.read}
                                        date={item.created_at}
                                        onClick={() => {
                                          item.action
                                            ? navigate(item.action)
                                            : null;
                                          trigger({ id: item.id });
                                          setNotificationOpen(false);
                                        }}
                                        removeAction={() => {
                                          removeNotification(item.id);
                                          removeTigger({ id: item.id });
                                        }}
                                      />
                                    </div>
                                  );
                                }
                              )}

                              {loadedNotifications.length === 0 && (
                                <div className="text-[12px] mt-[30px] text-center">
                                  <div>
                                    <FontAwesomeIcon
                                      icon={faBellSlash}
                                      className="text-[50px] text-rgba-grey-003 mb-[30px]"
                                    />
                                  </div>
                                  <div className=" text-rgba-grey-003">
                                    Nem található értesítés!
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div>
                      <div className="hidden md:block">
                        <span
                          onClick={() => {
                            dispatch(reset());
                            navigate("/login");
                          }}
                          className="font-icomoon icon icon-exit text-xl text-rgba-grey-08 cursor-pointer"
                        ></span>
                      </div>
                      <div className="flex gap-[20px] md:hidden">
                        {/*<div className="w-[30px]">
                        <img
                          src={customer.image}
                          className="object-cover rounded-full w-[30px] h-[30px] cursor-pointer object-center "
                        />
                        </div>*/}
                        <div className="flex flex-col justify-center">
                        <span
                          onClick={() => {
                            dispatch(reset());
                            navigate("/login");
                          }}
                          className="font-icomoon icon icon-exit text-xl text-rgba-grey-08 cursor-pointer"
                        ></span>
                        </div>
                       
                      </div>
                      
                    </div>
                  </div>
                </div>
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
                  <div
                    className={
                      "hidden flex-row text-white font-poppins header-menu md:w-full md:flex " +
                      (menuOpen ? "menu-open" : " ")
                    }
                  >
                    <div className="px-5">
                      <Link to={"/"} className="item ">
                        Főoldal
                      </Link>
                    </div>
                    <div className="px-5 text-light-grey font-medium hover:text-white">
                      <Tippy
                        content={
                          <span className="text-[12px] font-[600]">
                            Hamarosan
                          </span>
                        }
                      >
                        <Link
                          to={"#"}
                          className="cursor-default item opacity-[.5]"
                        >
                          Regisztráció
                        </Link>
                      </Tippy>
                    </div>
                    <div className="px-5 text-light-grey font-medium hover:text-white">
                      <Link to={"/login"} className="item">
                        Bejelentkezés
                      </Link>
                    </div>
                  </div>
                  <div className="menu-icon">
                    <span
                      className={
                        "flex md:hidden font-icomoon  text-light-grey text-3xl " +
                        (!menuOpen ? "icon-user" : "icon-x")
                      }
                      onClick={() => setMenuOpen(!menuOpen)}
                    ></span>
                  </div>
                </>
              )}
            </div>
          )}
        </>
      </div>
    </header>
  );
};
