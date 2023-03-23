import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Navigation, Pagination, Autoplay, A11y, Scrollbar } from "swiper";
import { AnimatePresence, motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  BankItem,
  Container,
  EmptyTicket,
  NewsItem,
  NextMatches,
  PageTitle,
  SportCard,
  Ticket,
} from "../../components";
import { BankrollManagementModal } from "../../components/BankrollManagementModal";
import { useGetBankQuery } from "../../redux/BankSlice";
import {
  useGetActiveMatchesQuery,
  useGetMatchesByDateQuery,
  useLazyGetMatchesByDateQuery,
} from "../../redux/MatchSlice";
import { RootState } from "../../redux/store";
import { useGetTicketsQuery } from "../../redux/TicketSlice";
import BetModal from "../Tickets/BetModal";
import "./index.scss";
import NoAnalyse from "./../../assets/images/no-analyse.svg";
import { useGetNewsQuery } from "../../redux/NewsSlice";

export interface PageProps {}

export default ({}: PageProps) => {
  const [showBankrollModal, setShowBankrollModal] = useState(false);
  const bank = useSelector((state: RootState) => state.bank);
  const auth = useSelector((state: RootState) => state.auth);
  const news = useSelector((state: RootState) => state.news);
  const { isLoading, data, refetch } = useGetActiveMatchesQuery({
    sportId: null,
  });
  const {
    isLoading: isLoadingTickets,
    data: ticketsData,
    refetch: ticketsRefetch,
  } = useGetTicketsQuery({});
  const {
    isLoading: isLoadingBank,
    data: bankData,
    refetch: bankRefetch,
  } = useGetBankQuery({});
  const {
    isLoading: isLoadingCalendar,
    data: calendarData,
    refetch: calendarRefetch,
  } = useGetMatchesByDateQuery({
    dateFrom: moment().startOf("day").format("YYYY-MM-DD HH:mm:ss"),
    dateEnd: moment()
      .endOf("day")
      .add(3, "hours")
      .format("YYYY-MM-DD HH:mm:ss"),
    customerId: auth.userId,
  });
  const {
    isLoading: isLoadingNews,
    data: newsData,
    refetch: newsReretch,
  } = useGetNewsQuery({});

  const { activeMatches } = useSelector((state: RootState) => state.match);
  const { calendar } = useSelector((state: RootState) => state.match);

  const [showTipModal, setShowTipModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showRightShadowNew, setShowRightShadowNew] = useState(true);
  const [showLeftShadowNew, setShowLeftShadowNew] = useState(false);

  const navigate = useNavigate();
  return (
    <>
      <Container
        className="container 2xl:mx-auto px-[20px] pt-[30px] max-w-[100%] 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl mx-auto mb-[100px] dashboard"
        padding={false}
      >
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-[0] md:gap-[39px]">
          {/* START LEFT */}
          <div className="col-span-1 xl:col-span-2">
            {activeMatches?.length === 0 ? (
              <div className="mb-[20px]">
                <div className="flex justify-center">
                  <img src={NoAnalyse} className="w-[216px] h-[216px]" />
                </div>
                <div className="text-[20px] font-[500] flex justify-center mt-[20px] max-w-[610px] ml-auto mr-auto text-center px-[40px]">
                  Jelenleg nincs elérhető elemzés, de hamarosan jelentkezünk egy
                  újabbal. Értesíteni fogunk róla!
                </div>
              </div>
            ) : (
              <>
                {/* Daily */}
                {activeMatches?.filter((item: any) => item.isDaily).length >
                  0 && (
                  <div className="mb-[40px]">
                    {activeMatches?.map((item: any) => {
                      if (item.isDaily) {
                        return (
                          <div className="col-span-1 lg:col-span-2 2xl:col-span-2 ">
                            <Link to={`/analyses/${item.id}`}>
                              <SportCard
                                leagueLogo={item.league?.image}
                                daily={true}
                                size={"large"}
                                hazai={item.home}
                                vendeg={item.away}
                                images={[item.homeImage, item.awayImage]}
                                date={item.dateStart}
                                colorScheme={item.sport.color ?? "blue"}
                                sportType={
                                  item?.sport?.value?.toLowerCase() ??
                                  "football"
                                }
                                hoverEffectEnabled={false}
                              />
                            </Link>
                          </div>
                        );
                      }
                    })}
                  </div>
                )}

                {/* Daily */}
                {/* Others */}
                <div className="matches mb-[20px]">
                  <Swiper
                    // install Swiper modules
                    modules={[Navigation, Pagination, A11y, Autoplay]}
                    slidesPerView={2}
                    spaceBetween={20}
                    loop={false}
                    grabCursor={true}
                    pagination={{
                      bulletActiveClass: "w-active-bullet",
                      bulletClass: "w-bullet",
                    }}
                    breakpoints={{
                      0: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                      },
                      700: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                      },
                      1200: {
                        slidesPerView: 1,
                      },
                      1500: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                      },
                    }}
                  >
                    {activeMatches?.map((item: any, key: number) => {
                      if (!item.isDaily) {
                        return (
                          <SwiperSlide key={key}>
                            <div>
                              <Link to={`/analyses/${item.id}`}>
                                <SportCard
                                  leagueLogo={item.league?.image}
                                  hazai={item.home}
                                  vendeg={item.away}
                                  images={[item.homeImage]}
                                  size={item.size}
                                  date={item.dateStart}
                                  daily={false}
                                  colorScheme={item.sport.color ?? "blue"}
                                  sportType={
                                    item?.sport?.value?.toLowerCase() ??
                                    "football"
                                  }
                                  hoverEffectEnabled={false}
                                />
                              </Link>
                            </div>
                          </SwiperSlide>
                        );
                      }
                    })}
                  </Swiper>
                </div>
                {/* Others */}

              </>
            )}
            
            <div>
                  <PageTitle title="Hírek, újdonságok" />

                  <div className="mb-[60px] md:mb-[80px] relative">
                    {news?.news?.length === 0 && (<span>Jelenleg nincs friss hírünk! Nézz vissza később!</span>)}
                    <Swiper
                      observer
                      observeParents
                      modules={[Navigation, Pagination, Scrollbar, A11y]}
                      spaceBetween={0}
                      slidesPerView={1}
                      onSlideChange={() => console.log("slide change")}
                      onSwiper={(swiper) => console.log(swiper)}
                      pagination={{
                        bulletActiveClass: "w-active-bullet",
                        bulletClass: "w-bullet",
                      }}
                      onInit={() => {
                        setShowRightShadowNew(true);
                        setShowLeftShadowNew(false);
                      }}
                      onReachEnd={() => {
                        setShowRightShadowNew(false);
                        setShowLeftShadowNew(true);
                      }}
                      onReachBeginning={() => {
                        setShowRightShadowNew(true);
                        setShowLeftShadowNew(false);
                      }}
                      breakpoints={{
                        // when window width is >= 320px
                        600: {
                          slidesPerView: 2,
                          spaceBetween: 10,
                        },
                        // when window width is >= 480px
                        720: {
                          slidesPerView: 2,
                          spaceBetween: 30,
                        },
                        768: {
                          slidesPerView: 2,
                          spaceBetween: 30,
                        },
                        // when window width is >= 640px
                        984: {
                          slidesPerView: 3,
                          spaceBetween: 30,
                        },
                        // when window width is >= 640px
                        1240: {
                          slidesPerView: 2.5,
                          spaceBetween: 40,
                        },
                      }}
                    >
                      {news?.news?.map((item: any) => {
                        return (
                          <SwiperSlide className="max-w-auto md:max-w-[370px]">
                            <NewsItem
                              link={`/news/${item.id}`}
                              extraClass="mx-auto max-w-[370px] h-[350px] cursor-pointer"
                              image={item.cover}
                              badge={item.badge ?? null}
                            >
                              {item.lead}
                            </NewsItem>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                    <AnimatePresence>
                      {showRightShadowNew && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute right-0 top-0 bg-gradient-to-l from-fade-dark to-transparent w-[50px] h-full z-[100]"
                        ></motion.div>
                      )}
                    </AnimatePresence>
                    <AnimatePresence>

                      {showLeftShadowNew && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute left-0 top-0 bg-gradient-to-r from-fade-dark to-transparent w-[50px] h-full z-[100]"
                        ></motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
            <div></div>
          </div>
          {/* END LEFT */}

          {/* START RIGHT */}
          <div className="col-span-1">
            {/* SZELVÉNYEK START */}
            {ticketsData?.length > 0 ? (
              <div className="matches">
                <Swiper
                  // install Swiper modules
                  modules={[Navigation, Pagination, A11y, Autoplay]}
                  slidesPerView={2}
                  spaceBetween={20}
                  loop={false}
                  grabCursor={true}
                  pagination={{
                    bulletActiveClass: "w-active-bullet",
                    bulletClass: "w-bullet",
                  }}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                    },
                    700: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                    },
                    1200: {
                      slidesPerView: 1,
                    },
                    1500: {
                      slidesPerView: 1,
                      spaceBetween: 40,
                    },
                  }}
                >
                  {ticketsData?.map((item: any, key: number) => {
                    if (!item.isDaily) {
                      return (
                        <SwiperSlide key={key}>
                          <Ticket
                            item={item}
                            setShowTipModal={() => {
                              setSelectedTicket(item);
                              setShowTipModal(true);
                            }}
                          />
                        </SwiperSlide>
                      );
                    }
                  })}
                </Swiper>
              </div>
            ) : (
              <div className="mb-[40px]">
                <EmptyTicket />
              </div>
            )}

            {/* SZELVÉNYEK END */}
            {/* BANK START */}
            <div className="mb-[60px]">
              <BankItem
                isDashboard
                icon={"money"}
                title={"Virtuális bank"}
                amount={bank?.balance}
                actions={[]}
              />
            </div>
            {/* BANK END */}
            {/* MATCHES START */}
            <div>
              <NextMatches matches={calendar} />
            </div>
            {/* MATCHES END */}
          </div>
          {/* END RIGHT */}
        </div>
        <BetModal
          confirmAction={() => {
            refetch();
          }}
          selectedTicket={selectedTicket}
          showTipModal={showTipModal}
          setShowTipModal={setShowTipModal}
        />
      </Container>
    </>
  );
};
