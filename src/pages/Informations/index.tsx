import React, { useEffect, useState } from 'react';
import { Container, InformationItem, NewsItem, PageTitle } from '../../components';
import { NewsItemProps } from '../../components/NewsItem/NewsItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper';
import './index.scss';


export interface PageProps {

}

export default ({ }: PageProps) => {
  const news = [
    {
      image: 'https://w7tips.fra1.digitaloceanspaces.com/images/infos/news1.jpeg',
      badge: false,
      lead: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    },
    {
      image: 'https://w7tips.fra1.digitaloceanspaces.com/images/infos/news2.png',
      badge: false,
      lead: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    },
    {
      image: 'https://w7tips.fra1.digitaloceanspaces.com/images/infos/news3.png',
      badge: false,
      lead: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    },
    {
      image: 'https://w7tips.fra1.digitaloceanspaces.com/images/infos/news4.png',
      badge: false,
      lead: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    }
  ]
  return (
    <>
      <Container className="container 2xl:mx-auto max-w-[100%] 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl mx-auto mb-[80px]" padding>
        <PageTitle title="Információk" icon="info" />
        <div>
          <div className="mb-[60px] md:mb-[80px]">
            <Swiper
             observer observeParents
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={0}
              slidesPerView={1}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
              pagination={{
                bulletActiveClass: 'w-active-bullet',
                bulletClass: 'w-bullet',
              }}
              breakpoints={{
                // when window width is >= 320px
                600: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                // when window width is >= 480px
                720: {
                  slidesPerView: 3,
                  spaceBetween: 30
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30
                },
                // when window width is >= 640px
                984: {
                  slidesPerView: 3,
                  spaceBetween: 30
                },
                // when window width is >= 640px
                1240: {
                  slidesPerView: 4,
                  spaceBetween: 40
                }
              }}
            >
              {news?.map((item: any) => {
                return (
                  <SwiperSlide className="max-w-auto md:max-w-[370px]">
                    <NewsItem  extraClass="mx-auto max-w-[370px] h-[350px]" image={item.image} badge={item.badge ?? null}>
                      {item.lead}
                    </NewsItem>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
        
          <PageTitle title="Gyakori kérdések" />

          <div className="flex flex-col xl:flex-row gap-0 md:gap-[40px]">
            <div className="flex-[1] space-y-[30px]">
              <div>
                <InformationItem title={"Hogy vehetek részt egy challange-n?"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </InformationItem>
              </div>
              <div>
                <InformationItem title={"Hogy vehetek részt egy challange-n?"}>
                  Lorem ipsum dolor sidt amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </InformationItem>
              </div>
              <div>
                <InformationItem title={"Hogy vehetek részt egy challange-n?"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </InformationItem>
              </div>
              <div>
                <InformationItem title={"Hogy vehetek részt egy challange-n?"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </InformationItem>
              </div>

            </div>
            <div className="flex-[1] space-y-[30px] mt-[30px] xl:mt-0">
              <div>
                <InformationItem title={"Hogy vehetek részt egy challange-n?"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </InformationItem>
              </div>
              <div>
                <InformationItem title={"Hogy vehetek részt egy challange-n?"}>
                  Lorem ipsum dolor sidt amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </InformationItem>
              </div>
              <div>
                <InformationItem title={"Hogy vehetek részt egy challange-n?"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </InformationItem>
              </div>
              <div>
                <InformationItem title={"Hogy vehetek részt egy challange-n?"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </InformationItem>
              </div>


            </div>
          </div>
        </div>
      </Container>
    </>
  )
}