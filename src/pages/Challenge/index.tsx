import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { AnalysesHeader, BetRow, ChallengeHeader, Container, CountdownTimer, SmallTitle, StatisticsChart } from '../../components';
import './index.scss';
import { motion } from 'framer-motion';
import { ChallengeItem, ChallengeItemProps } from '../../components/ChallengeItem/ChallengeItem';


export interface PageProps {

}

export default ({ }: PageProps) => {
  const challengeHeaderContent = {
    title: 'Challenge #6',
    subTitle: '3. tipp',
    date: '2022. május 25.',
    data: {
      odds: '1.68',
      matchTitle: 'Liverpool - Real Madrid',
      matchBet: 'Real Madrid győzelem',
      challengeContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
      challengeBar: {
        currentStatus: '640 HUF',
        minValue: '50 HUF',
        maxValue: '1 500 HUF',
        barStatus: {
          fullBar: 1500,
          plannedBar: 1300,
          currentBar: 750
        }
      }
    }

  }

  const challengeHistory = [
    {
      isUpload: true,
      title: 'Challenge #5',
      subTitle: '50€ - 1 500 €',
      label: 'Sikeres challenge',
      date: '2022. július 23. 13:42',
      matches: [
        {
          date: '2022 június 01.',
          time: '20:30',
          home: 'Real Madrid',
          away: 'Barcelona',
          winner: 'home',
          odds: '1.68',
          tippString: 'Tipp: Real Madrid győzelem',
          isWinner: true,
          balance: '+10 000 HUF'
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
          balance: '+30 000 HUF'
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
          balance: '+40 000 HUF'
        },
      ],
      isParticipated: true,
    },
    {
      isUpload: true,
      title: 'Challenge #4',
      subTitle: '50€ - 1 500 €',
      label: 'Sikeres challenge',
      date: '2022. július 23. 13:42',
      matches: [
        {
          date: '2022 június 01',
          time: '20:30',
          home: 'Real Madrid',
          away: 'Barcelona',
          winner: 'home',
          odds: '1.68',
          tippString: 'Tipp: Real Madrid győzelem',
          isWinner: true,
          balance: '+30 000 HUF'
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
          balance: '+30 000 HUF'
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
          balance: '+310 000 HUF'
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
          balance: '+40 000 HUF'
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
          balance: '+20 000 HUF'
        },
      ],
      isParticipated: false,
    },
    {
      isUpload: false,
      title: 'Challenge #3',
      subTitle: '50€ - 1 500 €',
      label: 'Sikertelen challenge',
      date: '2022. július 23. 13:42',
      matches: [
        {
          date: '2022 június 01',
          time: '20:30',
          home: 'Real Madrid',
          away: 'Barcelona',
          winner: 'home',
          odds: '1.68',
          tippString: 'Tipp: Real Madrid győzelem',
          isWinner: true,
          balance: '+30 000 HUF'
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
          balance: '+30 000 HUF'
        },
      ],
      isParticipated: false,
    },
    {
      isUpload: false,
      title: 'Challenge #4',
      subTitle: '50€ - 1 500 €',
      label: 'Sikertelen challenge',
      date: '2022. július 23. 13:42',
      matches: [
        {
          date: '2022 június 01',
          time: '20:30',
          home: 'Real Madrid',
          away: 'Barcelona',
          winner: 'home',
          odds: '1.68',
          tippString: 'Tipp: Real Madrid győzelem',
          isWinner: true,
          balance: '+30 000 HUF'
        },
      ],
      isParticipated: true,
    }
  ]


  return (
    <Container className="analyses-container container 2xl:mx-auto max-w-[100%] 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl mx-auto" padding={false}>
      <div className=" challenges">
        <ChallengeHeader content={challengeHeaderContent.data} title={challengeHeaderContent.title} subTitle={challengeHeaderContent.subTitle}  date={challengeHeaderContent.date} type={''} background={'https://w7tips.fra1.digitaloceanspaces.com/images/arenas/anfield.jpg'} />
        <div className="mt-[60px] px-[40px] mb-[80px]">
          <SmallTitle>Korábbi challenge-ek</SmallTitle>
          {challengeHistory.map((item: ChallengeItemProps, key: number) => {
            return (
              <ChallengeItem isSecondary={key % 2 ? true : false} isUpload={item.isUpload} title={item.title} subTitle={item.subTitle} label={item.label} date={item.date} matches={item.matches} isParticipated={item.isParticipated} />
            )
          })}
        </div>
      </div>
    </Container>
  )
}