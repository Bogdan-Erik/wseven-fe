import React, { useEffect, useState } from 'react';
import { BetRow, Container, MatchItem, PageTitle } from '../../components';


export interface PageProps {

}

export default ({ }: PageProps) => {

  const liveHistory = [
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
    <>
      <Container className="container 2xl:mx-auto max-w-[100%] 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl mx-auto" padding>
        <PageTitle title="Aktív élő / last minute tippek" />
        <div className="mt-[27px] mb-[30px] lg:mb-[120px]">
          <div className="mb-[15px]">
            <BetRow odds={'1.68'} title={'Real Madrid győzelem'} strength={3} suggestedBet={'14 500 Ft'} players={[{ image: "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png" }, { image: "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png" }, { image: "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png" }]} contentText={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."} matchDatas={{
              liga: 'https://w7tips.fra1.digitaloceanspaces.com/images/leagues/ll.png',
              date: '2022. június 01.',
              time: '20:30',
              home: 'Real Madrid',
              away: 'Barcelona',
              highlightedTeam: 'home',
            }} />
          </div>
          <div>
            <BetRow odds={'1.68'} title={'Real Madrid győzelem'} strength={3} suggestedBet={'14 500 Ft'} players={[{ image: "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png" }, { image: "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png" }, { image: "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png" }]} contentText={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."} matchDatas={{
              liga: 'https://w7tips.fra1.digitaloceanspaces.com/images/leagues/ll.png',
              date: '2022. június 01.',
              time: '20:30',
              home: 'Real Madrid',
              away: 'Barcelona',
              highlightedTeam: 'home',
            }} />
          </div>
        </div>

        <div className="mt-[80px] mb-[80px]">
          <div><PageTitle title="Korábbi élő / last minute tippek" /></div>
          {liveHistory.map((item: any, key: number) => {
            return (
              <div className="mb-[10px] xl:mb-0">
                <MatchItem isSecondary={key % 2 ? true : false} balance={item.balance} date={item.date} time={item.time} home={item.home} away={item.away} winner={item.winner} odds={item.odds} tippString={item.tippString} isWinner={item.isWinner} winningPrice={item.winningPrice} turnOffMore />
              </div>
            )
          })}

        </div>
      </Container>
    </>
  )
}