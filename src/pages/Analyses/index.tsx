import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { AnalysesHeader, BetRow, Container, CountdownTimer, SmallTitle, StatisticsChart } from '../../components';
import './index.scss';
import { motion } from 'framer-motion';


export interface PageProps {

}

export default ({ }: PageProps) => {

  const homeDatas = [
    {
      type: 'win',
      score: 2
    },
    {
      type: 'win',
      score: 3
    },
    {
      type: 'loose',
      score: 3
    },
    {
      type: 'win',
      score: 2
    },
    {
      type: 'draw',
      score: 0
    },
    {
      type: 'win',
      score: 2
    },
  ];

  const awayDatas = [
    {
      type: 'draw',
      score: 0
    },
    {
      type: 'draw',
      score: 0
    },
    {
      type: 'loose',
      score: 2
    },
    {
      type: 'loose',
      score: 1
    },
    {
      type: 'win',
      score: 3
    },
    {
      type: 'win',
      score: 2
    },
  ];
  //win,loose,draw
  const Element = ({ type, score, isLast }: { type: string, score: number, isLast?: boolean }) => {
    const value = score * 7;
    const color = type === 'win' ? 'bg-green' : (type === 'loose') ? 'bg-red' : 'bg-yellow';
    const height = type === 'draw' ? '4px' : `${value}px`;
    const style = twMerge(`
    ${color} ${height} w-[20px] ${type === 'loose' ? 'rounded-b-[3px]' : (type === 'win' ? 'rounded-t-[3px]' : 'rounded-t-[3px] rounded-b-[3px]')} ${!isLast ? 'mr-[2px]' : ''}  self-end relative
    `)
    return (
      <div className={style} style={{ height: height, bottom: (type === 'loose' ? -(score * 7) - 1 : (type === 'draw' ? -2 : 0)) }}></div>
    )
  }

  const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

  const homeObject = {
    participantName: 'Liverpool',
    logo: 'https://w7tips.fra1.digitaloceanspaces.com/images/teams/liverpool.png',
    isFullImageLogo: false,
    playerImage: 'https://w7tips.fra1.digitaloceanspaces.com/images/players/salah.png',
    shape: homeDatas,
    lastMatch: {
      logo: 'https://w7tips.fra1.digitaloceanspaces.com/images/teams/mu.png',
      value: 'Vereség (2-1)'
    },
    ranking: {
      place: 3,
      points: 62
    },
    missings: [
      {
        type: 1,
        name: 'Roberto Firmino'
      },
      {
        type: 2,
        name: 'Virgil van Dijk'
      },
      {
        type: 3,
        name: 'Jordan Henderson'
      },
    ],
  }

  const awayObject = {
    participantName: 'Real Madrid',
    logo: 'https://w7tips.fra1.digitaloceanspaces.com/images/teams/real.png',
    isFullImageLogo: false,
    playerImage: 'https://w7tips.fra1.digitaloceanspaces.com/images/players/benzema.png',
    shape: awayDatas,
    lastMatch: {
      logo: 'https://w7tips.fra1.digitaloceanspaces.com/images/teams/mu.png',
      value: 'Győzelem (2-1)'
    },
    ranking: {
      place: 7,
      points: 34
    },
    missings: [
      {
        type: 1,
        name: 'Eden Hazard'
      },
      {
        type: 2,
        name: 'Rodrygo Goes'
      },
      {
        type: 3,
        name: 'Lucas Vázquez'
      },
    ],
  }
  return (
    <Container className="analyses-container container 2xl:mx-auto max-w-[100%] 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl mx-auto" padding={false}>
      <div className="analyses">
        <AnalysesHeader type={''} background={'https://w7tips.fra1.digitaloceanspaces.com/images/arenas/anfield.jpg'} homeObject={homeObject} awayObject={awayObject} matchLogo={"https://w7tips.fra1.digitaloceanspaces.com/images/leagues/cl.png"} matchDate={{ date: '2022-12-31 20:00:00' }} locationDatas={{
          weather: '20',
          location: 'Liverpool - Anfield'
        }}
        />
        <div className="analyses-block">
          <SmallTitle>Elemzés</SmallTitle>
          <div className="content text-[16px]">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
          </div>

        </div>

        <div className="bets-block mb-[80px]">
          <SmallTitle>Tippek</SmallTitle>
          <div className="mb-[15px]">
            <BetRow odds={'1.68'} title={'Real Madrid győzelem'} strength={3} suggestedBet={'14 500 Ft'} players={[{ image: "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png" }, { image: "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png" }, { image: "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png" }]} />
          </div>
          <div className="mb-[15px]">
            <BetRow odds={'2.50'} title={'Real Madrid győzelem'} strength={2} suggestedBet={'14 500 Ft'} players={[{ image: "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png" }, { image: "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png" }]} />
          </div>
          <div className="mb-[15px]">
            <BetRow odds={'1.03'} title={'Consectetur adipiscing elit, sed do eiusmod tempor incidi'} strength={1} suggestedBet={'14 500 Ft'} players={[{ image: "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png" }, { image: "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png" }, { image: "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png" }, { image: "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png" }, { image: "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png" }]} />
          </div>
        </div>
      </div>
    </Container>
  )
}