import React, { useEffect, useState } from "react";
import {
  Container,
  DataPaginator,
  MatchItem,
  PageTitle,
  SmallTitle,
  Ticket,
  TicketItem,
} from "../../components";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Autoplay, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  useGetTicketsQuery,
  useLazyGetTicketsByDateRangeQuery,
} from "../../redux/TicketSlice";
import BetModal from "./BetModal";
import Datepicker from "react-tailwindcss-datepicker";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import NoTicket from './../../assets/images/no-ticket.svg'

export interface PageProps {}

export default ({}: PageProps) => {
  const [showTipModal, setShowTipModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const { filteredTickets } = useSelector((state: RootState) => state.ticket);

  const [value, setValue] = useState({
  //  startDate: moment().subtract(7, "days").format("YYYY-MM-DD"),
    startDate: null,
    endDate:null,
  });

  const handleValueChange = (newValue: any) => {
    setValue(newValue);
  };

  const [trigger] = useLazyGetTicketsByDateRangeQuery();

  const NoResult = () => {
    return <div>Jelenleg nincs találat erre az időszakra!</div>;
  };

  useEffect(() => {
    trigger({ dateFrom: value.startDate ?? moment().startOf('year').format("YYYY-MM-DD"), dateTo: value.endDate ? moment(value.endDate).add(1, 'day').format('YYYY-MM-DD') :  moment().add(1, 'day').format("YYYY-MM-DD")});
  }, []);

  useEffect(() => {
    trigger({ dateFrom: value.startDate ?? moment().startOf('year').format("YYYY-MM-DD"), dateTo: value.endDate ? moment(value.endDate).add(1, 'day').format('YYYY-MM-DD') :  moment().add(1, 'day').format("YYYY-MM-DD")});
  }, [value]);

  const { isLoading, data, refetch } = useGetTicketsQuery({});

  if (!data) {
    return <></>;
  }

  return (
    <>
      <Container
        className="dark container 2xl:mx-auto max-w-[100%] 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl mx-auto"
        padding
      >
        <PageTitle title="Szelvények" icon="ticket" />
        <div className="relative">
          <div>
            <Swiper
              // install Swiper modules
              modules={[Navigation, Pagination, A11y, Autoplay]}
              slidesPerView={3}
              spaceBetween={20}
              loop={false}
              grabCursor={true}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                700: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1200: {
                  slidesPerView: 3,
                },
                1500: {
                  slidesPerView: 4,
                },
              }}
            >
              {data.length === 0 && (
                <div>
                  <div className="flex justify-center">
                    <img src={NoTicket} className="w-[216px] h-[216px]" />
                  </div>
                  <div className="text-[20px] font-[500] flex justify-center mt-[20px] max-w-[610px] ml-auto mr-auto text-center px-[40px]">
                    Jelenleg nincs aktív szelvényünk, de hamarosan jelentkezünk
                    egy újabbal. Értesíteni fogunk róla!
                  </div>
                </div>
              )}
              {data?.map((item: any, key: number) => {
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
              })}
            </Swiper>
          </div>

          <div className="mt-[80px] mb-[80px]">
            <div className="flex flex-col md:flex-row">
              <div className="md:mr-auto">
                <PageTitle title="Korábbi szelvények" />
              </div>
              <div className="mb-[20px] md:mb-0 min-w-[279px] ">
                <Datepicker
                  i18n={"hu"} 
                  inputClassName="dark:bg-transparent outline-none border-none"
                  value={value}
                  separator={"-"} 
                  displayFormat={"YYYY. MM DD."} 
                  primaryColor={"violet"}
                  containerClassName={"z-[1000]"}
                  onChange={handleValueChange}
                  placeholder="Szűrés dátum alapján"
                />
              </div>
            </div>

            <DataPaginator
              NoResultComponent={NoResult}
              Component={TicketItem}
              datas={filteredTickets}
              additionalComponentProps={{
                onClick: (item: any) => {
                  setSelectedTicket(item);
                  setShowTipModal(true);
                },
              }}
            ></DataPaginator>
          </div>
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
