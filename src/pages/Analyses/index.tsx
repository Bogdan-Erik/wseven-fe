import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { AnalysesHeader, BetRow, Container, CountdownTimer, SmallTitle, StatisticsChart } from '../../components';
import './index.scss';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useGetMatchQuery } from '../../redux/MatchSlice';
import MatchDataGetter from '../../utils/MatchDataGetter';

export interface PageProps {

}

export default ({ }: PageProps) => {
  let { id } = useParams();
  const { isLoading, data } = useGetMatchQuery({ id });

  if (!data) {
    return (<></>);
  }

  const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

  const homeObject = {
    participantName: data.home?.name ?? `${data.home?.first_name} ${data.home?.last_name}`,
    logo: data.home?.logo ?? data.home?.image,
    isFullImageLogo: false,
    playerImage: data.homeImage,
    shape: MatchDataGetter(data.matchDatas, 'form', 'home'),
    lastMatch: MatchDataGetter(data.matchDatas, 'last_result', 'home'),
    ranking: MatchDataGetter(data.matchDatas, 'ranking', 'home'),
    missings: MatchDataGetter(data.matchDatas, 'missings', 'home'),
  }

  const awayObject = {
    participantName: data.away?.name ?? `${data.away?.first_name} ${data.away?.last_name}`,
    logo: data.away?.logo ?? data.away?.image,
    isFullImageLogo: false,
    playerImage: data.awayImage,
    shape: MatchDataGetter(data.matchDatas, 'form', 'away'),
    lastMatch: MatchDataGetter(data.matchDatas, 'last_result', 'away'),
    ranking: MatchDataGetter(data.matchDatas, 'ranking', 'away'),
    missings: MatchDataGetter(data.matchDatas, 'missings', 'away'),
  }

  return (
    <Container className="analyses-container container 2xl:mx-auto max-w-[100%] 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl mx-auto" padding={false}>
      {isLoading && !data ? ('Loading') : (
        <div className="analyses">
          <AnalysesHeader sport={data.sport} isDaily={data.isDaily} type={''} background={data.image} homeObject={homeObject} awayObject={awayObject} matchLogo={"https://w7tips.fra1.digitaloceanspaces.com/images/leagues/cl.png"} matchDate={{ date: data.dateStart }} locationDatas={{
            weather: data.weather?.name,
            location: data.location
          }}
          />
          <div className="analyses-block">
            <SmallTitle>Elemzés</SmallTitle>
            <div className="content text-[16px]" dangerouslySetInnerHTML={{ __html: data?.analyses?.analyses }}>
            </div>

          </div>

          <div className="bets-block mb-[80px]">
            <SmallTitle>Tippek</SmallTitle>
            {data?.analyses?.tips.map((item: any) => {
              return (
                <div className="mb-[15px]">
                  <BetRow odds={item.odds} title={item.name} strength={item.rating} suggestedBet={(item.tet * 1000 + ' Ft').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} players={[]} />
                </div>
              )
            })}

          </div>
        </div>
      )}

    </Container>
  )
}