import React, { useEffect, useState } from 'react';
import { Container, PageTitle, SmallTitle, Ticket } from '../../components';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import { useGetTicketsQuery } from '../../redux/TicketSlice';
import BetModal from './BetModal';

export interface PageProps {

}

export default ({ }: PageProps) => {
  const [showTipModal, setShowTipModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const { isLoading, data, refetch } = useGetTicketsQuery({ });
  if (!data) {
    return (<></>);
  }


  return (
    <>
    <Container className="container 2xl:mx-auto max-w-[100%] 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl mx-auto" padding>
        <PageTitle title="Szelvények" icon="ticket" />
        <div className='relative'>
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
                {data?.map((item: any, key:number) => {
                  return (
                    <SwiperSlide key={key}><Ticket item={item} setShowTipModal={() => {
                      setSelectedTicket(item);
                      setShowTipModal(true);
                    }}/></SwiperSlide>
                  )
                })}
              </Swiper>
          </div>
          <BetModal confirmAction={() => {console.log('teszt')}}  selectedTicket={selectedTicket} showTipModal={showTipModal} setShowTipModal={setShowTipModal} />
      </Container>
    </>
  )
}