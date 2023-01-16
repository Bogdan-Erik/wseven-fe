import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import './index.scss';
import { motion } from 'framer-motion';
import { Container, DataPaginator, MatchItem, PageTitle, SportCard } from '../../components';
import { useGetActiveMatchesQuery, useLazyGetTipsByDateRangeQuery } from '../../redux/MatchSlice';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import Datepicker from "react-tailwindcss-datepicker";


export interface PageProps {

}

export default ({ }: PageProps) => {

  const { isLoading, data } = useGetActiveMatchesQuery();
  const { activeMatches, filteredTips } = useSelector((state: RootState) => state.match)

  const [value, setValue] = useState({
    startDate: new Date().setDate(new Date().getDate() - 7),
    endDate: new Date(),
  });


  const handleValueChange = (newValue: any) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  }

  const history = [
    {
      date: '2022 június 01',
      time: '20:30',
      home: 'Real Madrid',
      away: 'Barcelona',
      winner: 'home',
      odds: '1.68',
      tippString: 'Tipp: Kezdő elem',
      isWinner: true,
    },
    {
      date: '2022 június 01',
      time: '20:30',
      home: 'Real Madrid',
      away: 'Barcelona',
      winner: 'home',
      odds: '1.68',
      tippString: 'Tipp: Real Madrid győzelem',
      isWinner: true,
    },
    {
      date: '2022 június 01',
      time: '20:30',
      home: 'Real Madrid',
      away: 'Barcelona',
      winner: 'home',
      odds: '1.68',
      tippString: 'Tipp: Real Madrid győzelem',
      isWinner: true,
    },
    {
      date: '2022 június 01',
      time: '20:30',
      home: 'Real Madrid',
      away: 'Barcelona',
      winner: 'home',
      odds: '1.68',
      tippString: 'Tipp: Real Madrid győzelem',
      isWinner: true,
    },
    {
      date: '2022 június 01',
      time: '20:30',
      home: 'Real Madrid',
      away: 'Barcelona',
      winner: 'home',
      odds: '1.68',
      tippString: 'Tipp: Real Madrid győzelem',
      isWinner: false,
      winningPrice: '-10 egység',
    },
    {
      date: '2022 június 01',
      time: '20:30',
      home: 'Real Madrid',
      away: 'Barcelona',
      winner: 'home',
      odds: '1.68',
      tippString: 'Tipp: Real Madrid győzelem',
      isWinner: true,
    },
    {
      date: '2022 június 01',
      time: '20:30',
      home: 'Real Madrid',
      away: 'Barcelona',
      winner: 'home',
      odds: '1.68',
      tippString: 'Tipp: Real Madrid győzelem',
      isWinner: true,
    },
    {
      date: '2022 június 01',
      time: '20:30',
      home: 'Real Madrid',
      away: 'Barcelona',
      winner: 'home',
      odds: '1.68',
      tippString: 'Tipp: Real Madrid győzelem',
      isWinner: true,
    },
    {
      date: '2022 június 01',
      time: '20:30',
      home: 'Real Madrid',
      away: 'Barcelona',
      winner: 'home',
      odds: '1.68',
      tippString: 'Tipp: Real Madrid győzelem',
      isWinner: true,
    },
    {
      date: '2022 június 01',
      time: '20:30',
      home: 'Real Madrid',
      away: 'Barcelona',
      winner: 'home',
      odds: '1.68',
      tippString: 'Tipp: Real Madrid győzelem',
      isWinner: true,
    },
    {
      date: '2022 június 01',
      time: '20:30',
      home: 'Real Madrid',
      away: 'Barcelona',
      winner: 'home',
      odds: '1.68',
      tippString: 'Tipp: Real Madrid győzelem',
      isWinner: true,
    },
    {
      date: '2022 június 01',
      time: '20:30',
      home: 'Real Madrid',
      away: 'Barcelona',
      winner: 'home',
      odds: '1.68',
      tippString: 'Tipp: Real Madrid győzelem',
      isWinner: false,
      winningPrice: '-10 egység',
    },
    {
      date: '2022 június 01',
      time: '20:30',
      home: 'Real Madrid',
      away: 'Barcelona',
      winner: 'home',
      odds: '1.68',
      tippString: 'Tipp: Real Madrid győzelem',
      isWinner: false,
    },
    {
      date: '2022 június 01',
      time: '20:30',
      home: 'Real Madrid',
      away: 'Barcelona',
      winner: 'home',
      odds: '1.68',
      tippString: 'Tipp: Real Madrid győzelem',
      isWinner: true,
    },
    {
      date: '2022 június 01',
      time: '20:30',
      home: 'Real Madrid',
      away: 'Barcelona',
      winner: 'home',
      odds: '1.68',
      tippString: 'Tipp: Real Madrid győzelem',
      isWinner: false,
    },
    {
      date: '2022 június 01',
      time: '20:30',
      home: 'Real Madrid',
      away: 'Barcelona',
      winner: 'home',
      odds: '1.68',
      tippString: 'Tipp: Real Madrid győzelem',
      isWinner: true,
    },
    {
      date: '2022 június 01',
      time: '20:30',
      home: 'Real Madrid',
      away: 'Barcelona',
      winner: 'home',
      odds: '1.68',
      tippString: 'Tipp: Real Madrid győzelem',
      isWinner: true,
    },
    {
      date: '2022 június 01',
      time: '20:30',
      home: 'Real Madrid',
      away: 'Barcelona',
      winner: 'home',
      odds: '1.68',
      tippString: 'Tipp: Real Madrid győzelem',
      isWinner: true,
    },
    {
      date: '2022 június 01',
      time: '20:30',
      home: 'Real Madrid',
      away: 'Barcelona',
      winner: 'home',
      odds: '1.68',
      tippString: 'Tipp: Real Madrid győzelem',
      isWinner: false,
      winningPrice: '-10 egység',
    },
    {
      date: '2022 június 01',
      time: '20:30',
      home: 'Real Madrid',
      away: 'Barcelona',
      winner: 'home',
      odds: '1.68',
      tippString: 'Tipp: Real Madrid győzelem',
      isWinner: true,
    },
    {
      date: '2022 június 01',
      time: '20:30',
      home: 'Real Madrid',
      away: 'Barcelona',
      winner: 'home',
      odds: '1.68',
      tippString: 'Tipp: Real Madrid győzelem',
      isWinner: true,
    },
    {
      date: '2022 június 01',
      time: '20:30',
      home: 'Real Madrid',
      away: 'Barcelona',
      winner: 'home',
      odds: '1.68',
      tippString: 'Tipp: Real Madrid győzelem',
      isWinner: false,
    },
    {
      date: '2022 június 01',
      time: '20:30',
      home: 'Real Madrid',
      away: 'Barcelona',
      winner: 'home',
      odds: '1.68',
      tippString: 'Tipp: Real Madrid győzelem',
      isWinner: false,
    },
    {
      date: '2022 június 01',
      time: '20:30',
      home: 'Real Madrid',
      away: 'Barcelona',
      winner: 'home',
      odds: '1.68',
      tippString: 'Tipp: Real Madrid győzelem',
      isWinner: false,
    },
    {
      date: '2022 június 01',
      time: '20:30',
      home: 'Real Madrid',
      away: 'Barcelona',
      winner: 'home',
      odds: '1.68',
      tippString: 'Tipp: Real Madrid győzelem',
      isWinner: false,
    },
    {
      date: '2022 június 01',
      time: '20:30',
      home: 'Real Madrid',
      away: 'Barcelona',
      winner: 'home',
      odds: '1.68',
      tippString: 'Tipp: Real Madrid győzelem',
      isWinner: false,
      winningPrice: '-10 egység',
    },
    {
      date: '2022 június 01',
      time: '20:30',
      home: 'Real Madrid',
      away: 'Barcelona',
      winner: 'home',
      odds: '1.68',
      tippString: 'Tipp: Real Madrid győzelem',
      isWinner: true,
    },
    {
      date: '2022 június 01',
      time: '20:30',
      home: 'Real Madrid',
      away: 'Barcelona',
      winner: 'home',
      odds: '1.68',
      tippString: 'Tipp: Real Madrid győzelem',
      isWinner: true,
    },
    {
      date: '2022 június 01',
      time: '20:30',
      home: 'Real Madrid',
      away: 'Barcelona',
      winner: 'home',
      odds: '1.68',
      tippString: 'Tipp: Real Madrid győzelem',
      isWinner: false,
    },
    {
      date: '2022 június 01',
      time: '20:30',
      home: 'Real Madrid',
      away: 'Barcelona',
      winner: 'home',
      odds: '1.68',
      tippString: 'Tipp: Real Madrid győzelem',
      isWinner: false,
    },
    {
      date: '2022 június 01',
      time: '20:30',
      home: 'Real Madrid',
      away: 'Barcelona',
      winner: 'home',
      odds: '1.68',
      tippString: 'Tipp: Real Madrid győzelem',
      isWinner: false,
    },
    {
      date: '2022 június 01',
      time: '20:30',
      home: 'Real Madrid',
      away: 'Barcelona',
      winner: 'home',
      odds: '1.68',
      tippString: 'Tipp: Real Madrid győzelem',
      isWinner: true,
    },
    {
      date: '2022 június 01',
      time: '20:30',
      home: 'Real Madrid',
      away: 'Barcelona',
      winner: 'home',
      odds: '1.68',
      tippString: 'Tipp: Real Madrid győzelem',
      isWinner: false,
      winningPrice: '-10 egység',
    },
    {
      date: '2022 június 01',
      time: '20:30',
      home: 'Real Madrid',
      away: 'Barcelona',
      winner: 'home',
      odds: '1.68',
      tippString: 'Tipp: Real Madrid győzelem',
      isWinner: true,
    },
    {
      date: '2022 június 01',
      time: '20:30',
      home: 'Real Madrid',
      away: 'Barcelona',
      winner: 'home',
      odds: '2.08',
      tippString: 'Tipp: Utolsó elem',
      isWinner: false,
    },
  ]

  const [trigger] =
  useLazyGetTipsByDateRangeQuery()

  useEffect(() => {
    trigger({dateFrom: value.startDate, dateTo: value.endDate});
  }, [])

  useEffect(() => {
    trigger({dateFrom: value.startDate, dateTo: value.endDate});
  }, [value])
  return (
    <Container className="dark container 2xl:mx-auto px-[20px] pt-[30px] max-w-[100%] 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl mx-auto" padding={false}>
      {isLoading ? ('Loading') : (
        <div className="analyses mt-[50px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-[40px]">
            {/*<div className="col-span-1 lg:col-span-2 2xl:col-span-2 ">
            <SportCard daily={true} colorScheme={"blue"} size={"large"} images={['https://w7tips.fra1.digitaloceanspaces.com/images/players/salah.png', 'https://w7tips.fra1.digitaloceanspaces.com/images/players/benzema.png']} sportType={'football'} />
             </div>*/}
            {activeMatches?.map((item: any) => {
              if (item.isDaily) {
                return <div className="col-span-1 lg:col-span-2 2xl:col-span-2 ">
                  <SportCard daily={true} size={'large'} hazai={item.home} vendeg={item.away} images={[item.homeImage, item.HomeImage]} date={item.dateStart} colorScheme={item.sport.color ?? 'blue'} sportType={item?.sport?.name.toLowerCase() ?? 'football'} />
                </div>
              }
              return (<div>
                <SportCard hazai={item.home} vendeg={item.away} images={[item.homeImage]} size={item.size} date={item.dateStart} daily={false} colorScheme={item.sport.color ?? 'blue'} sportType={item?.sport?.name.toLowerCase() ?? 'football'} />
              </div>)
            })}



          </div>
          <div className="mt-[80px] mb-[80px]">
            <div className="flex flex-col md:flex-row">
              <div className='md:mr-auto'><PageTitle title="Korábbi meccsek" /></div>
              <div className="mb-[20px] md:mb-0 min-w-[279px] ">
                <Datepicker
                  readOnly
                  inputClassName="dark:bg-transparent outline-none border-none"
                  value={value}
                  primaryColor={"violet"}
                  containerClassName={'z-[1000]'}
                  onChange={handleValueChange}
                  placeholder="Dátum szűrő tól-ig"
                />
              </div>
            </div>


            <DataPaginator Component={MatchItem} datas={filteredTips} additionalComponentProps={{ turnOffMore: true }}></DataPaginator>

          </div>
        </div>
      )}

    </Container>
  )
}