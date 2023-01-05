import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import './index.scss';
import { motion } from 'framer-motion';
import { Container, MatchItem, PageTitle, SportCard } from '../../components';
import { useGetActiveMatchesQuery } from '../../redux/MatchSlice';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';


export interface PageProps {

}

export default ({ }: PageProps) => {

  const { isLoading, data } = useGetActiveMatchesQuery();
  const {activeMatches} = useSelector((state: RootState) => state.match)
  const history = [
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
  ]
  return (
    <Container className="container 2xl:mx-auto px-[20px] pt-[30px] max-w-[100%] 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl mx-auto" padding={false}>
      {isLoading ? ('Loading') : (
        <div className="analyses mt-[50px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-[40px]">
            {/*<div className="col-span-1 lg:col-span-2 2xl:col-span-2 ">
            <SportCard daily={true} colorScheme={"blue"} size={"large"} images={['https://w7tips.fra1.digitaloceanspaces.com/images/players/salah.png', 'https://w7tips.fra1.digitaloceanspaces.com/images/players/benzema.png']} sportType={'football'} />
             </div>*/}
            {activeMatches?.map(item => {
              return (<div>
                <SportCard hazai={item.home} vendeg={item.away}  images={[item.image]} size={item.size} date={item.dateStart} daily={false} colorScheme={item.colorScheme}  sportType={item.sportType} />
              </div>)
            })}



          </div>
          <div className="mt-[80px] mb-[80px]">
            <div><PageTitle title="Korábbi meccsek" /></div>
            {history.map((item: any, key: number) => {
              return (
                <div className="mb-[10px] xl:mb-0">
                  <MatchItem isSecondary={key % 2 ? true : false} balance={item.balance} date={item.date} time={item.time} home={item.home} away={item.away} winner={item.winner} odds={item.odds} tippString={item.tippString} isWinner={item.isWinner} winningPrice={item.winningPrice} turnOffMore />
                </div>
              )
            })}

          </div>
        </div>
      )}

    </Container>
  )
}