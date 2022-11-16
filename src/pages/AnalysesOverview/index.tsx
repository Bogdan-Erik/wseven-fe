import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import './index.scss';
import { motion } from 'framer-motion';
import { Container, MatchItem, PageTitle, SportCard } from '../../components';


export interface PageProps {

}

export default ({ }: PageProps) => {

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
    <Container className="analyses-container container 2xl:mx-auto max-w-[100%] 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl mx-auto" padding={false}>
      <div className="analyses mt-[50px]">
        <div className="grid grid-cols-3 gap-[40px]">
          <div className="col-span-2">
            <SportCard daily={true} colorScheme={"blue"} size={"large"} />
          </div>
          <div>
            <SportCard daily={true} colorScheme={"blue"} />
          </div>
          <div>
            <SportCard daily={true} colorScheme={"blue"} />
          </div>
          <div>
            <SportCard daily={true} primary={false} colorScheme={"green"} />
          </div>
          <div>
            <SportCard daily={true} colorScheme={"yellow"} />
          </div>
          <div>
            <SportCard daily={true} colorScheme={"orange"} />
          </div>
          <div>
            <SportCard daily={true} colorScheme={"purple"} />
          </div>
          <div>
            <SportCard daily={true} colorScheme={"red"} />
          </div>
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
    </Container>
  )
}