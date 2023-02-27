import React from 'react'
import { Button } from '../../Button';
import { Icon } from '../../Icon';
import { OddsItem } from '../OddsItem';
import './AnalysesHeader.scss';
import _ from "lodash";
import { BetRow, Container, CountdownTimer, SmallTitle, StatisticsChart, Statistics, LastMatch, LeaguePosition, Missings } from '../../';
import { motion } from 'framer-motion';
import { url } from 'inspector';
import { format } from 'date-fns';

export interface ShapeProps {
  type: string
  score: number
}

export interface LastMatchProps {
  logo: string
  value: string
}

export interface RankingProps {
  ranking_title: string
  place: number | string
  points?: number | string
}

export interface AgeProps {
  age: number
}

export interface HandProps {
  hand: number
}

export interface CareerPrizesProps {
  money: number
}

export interface MissingsProps {
  type: number,
  name: string
}
export interface MatchDateProps {
  date: string
}

export interface LocationDatasProps {
  weather: string
  location: string
}

export interface TennisFieldType {
  image: string
}

export interface ParticipantObjectProps {
  participantName: string
  logo: string
  isFullImageLogo?: boolean
  playerImage: string
  shape: ShapeProps[]
  lastMatch: LastMatchProps
  ranking: RankingProps
  missings?: MissingsProps[]
  ageProps?: AgeProps
  handProps?: HandProps
  careerPrizes?: CareerPrizesProps
}

export interface AnalysesHeaderProps {
  type: string,
  background: string
  homeObject: ParticipantObjectProps
  awayObject: ParticipantObjectProps
  matchLogo: string
  matchLogoSecondary?: string
  matchDate: MatchDateProps
  locationDatas: LocationDatasProps
  tennisFieldType?: TennisFieldType,
  isDaily?: boolean
  isClosed?: boolean
  sport?: any
  showDatas: boolean
}

export const AnalysesHeader = ({
  type,
  background,
  homeObject,
  awayObject,
  matchLogo,
  matchLogoSecondary,
  matchDate,
  locationDatas,
  tennisFieldType,
  isDaily,
  isClosed,
  sport,
  showDatas
}: AnalysesHeaderProps): JSX.Element => {
  const THREE_DAYS_IN_MS = new Date(matchDate.date).getTime();

  const dateTimeAfterThreeDays = THREE_DAYS_IN_MS;

  const colorScheme = sport.color;
  console.log(isClosed)
  return (
    <div>
      <div className="header-bg relative min-h-[593px] lg:min-h-[405px] 2xl:min-h-[650px] 3xl:min-h-[650px]" style={{ background: `url(${background})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
        <div className={`${colorScheme}-scheme bg-opacity-75 relative min-h-[593px] lg:min-h-[405px] 2xl:min-h-[650px] 3xl:min-h-[650px]`}>
          <div className="smoke relative flex px-[30px] py-[30px] min-h-[593px] lg:min-h-[405px] 2xl:min-h-[650px] 3xl:min-h-[650px]">
            <video src="https://w7tips.fra1.digitaloceanspaces.com/videos/smokebg.mp4" playsInline loop autoPlay muted></video>
            <motion.div animate={{ opacity: 1 }} transition={{ delay: 1 }} className="sidebar left-side z-[10]  left-[30px] top-0 opacity-0" >

              {(homeObject?.shape && showDatas) && (
                <Statistics datas={homeObject.shape} position={'left'} />
              )}

              {(homeObject?.lastMatch && showDatas) && (
                <LastMatch data={homeObject.lastMatch} position={'left'} />
              )}


              {(homeObject?.ranking && showDatas) && (
                <LeaguePosition data={homeObject.ranking} position={'left'} />
              )}

              {(homeObject?.missings && showDatas) && (
                <Missings data={homeObject.missings} position={'left'} />
              )}

            </motion.div>

            <motion.div animate={{ opacity: 1 }} transition={{ delay: 1 }} className="sidebar right-side z-[10] right-[30px] top-0 opacity-0">
              {(awayObject.shape && showDatas) && (
                <Statistics datas={awayObject.shape} position={'right'} />
              )}

              {(awayObject?.lastMatch && showDatas) && (
                <LastMatch data={awayObject.lastMatch} position={'right'} />
              )}

              {(awayObject?.ranking && showDatas) && (
                <LeaguePosition data={awayObject.ranking} position={'right'} />
              )}

              {(awayObject?.missings && showDatas) && (
                <Missings data={awayObject.missings} position={'right'} />
              )}
            </motion.div>

          </div>
        </div>
        <div className="absolute center-content">
          <motion.div animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="left-side">
            <img src={homeObject.playerImage}  className={`player-image ${isClosed ? 'grayscale' : ''}`} />
          </motion.div>
          <motion.div animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="center-side  opacity-0">
            <div className="flex-1 justify-center flex self-center flex-col">
              <img src={matchLogo} className={"event-logo h-[150px]"} />
            </div>
            <div className="flex-1 justify-center flex self-center flex-col items-center">
              <div className="text-sm mb-[10px]">{format(Date.parse(matchDate.date), 'yyyy. LLLL dd.')} <strong>{format(Date.parse(matchDate.date), 'HH:mm')}</strong></div>
              <div className="w-[340px]">
                <CountdownTimer targetDate={dateTimeAfterThreeDays} />
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-end">
              <div className="text-[20px] font-[500]">{locationDatas.weather}</div>
              <div className="text-sm font-semibold mb-[50px]">{locationDatas.location}</div>
            </div>
          </motion.div>
          <motion.div animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="right-side">
            <img src={awayObject.playerImage} className={`player-image ${isClosed ? 'grayscale' : ''}`} />
          </motion.div>
        </div>


        <div className="absolute mobile-center-content">
          <div className="absolute w-full top-[40px]">
            <motion.div animate={{ opacity: 1 }} transition={{ delay: 1 }} className="center-side  opacity-0">
              <div className="flex-1 justify-center flex self-center flex-col">
                <img src={matchLogo} className={"event-logo"} />
              </div>
              <div className="counter-holder flex-1 justify-center flex self-center flex-col items-center mt-[50px]">
                <div className="text-sm mb-[10px]">{format(Date.parse(matchDate.date), 'yyyy. LLLL dd.')} <strong>{format(Date.parse(matchDate.date), 'HH:mm')}</strong></div>
                <div className="w-[340px]">
                  <CountdownTimer targetDate={dateTimeAfterThreeDays} />
                </div>
              </div>

            </motion.div>
          </div>
          <div className="flex h-[100%]">
            <motion.div animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="left-side">
              <img src={homeObject.playerImage}  className={`player-image ${isClosed ? 'grayscale' : ''}`} />
            </motion.div>
            <motion.div animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="right-side">
              <img src={awayObject.playerImage}  className={`player-image ${isClosed ? 'grayscale' : ''}`} />
            </motion.div>
          </div>
        </div>


      </div>
      <div className="flex flex-row ml-auto mr-auto max-w-[1000px] mt-[-20px] z-[2] relative  px-[15px]">
        <div className="flex-1 text-center">
          <div className="flex ">
            <div className="bg-rgba-grey-08 backdrop-blur-[5px] h-[59px] w-[59px] rounded-full flex justify-center">
              <img src={homeObject.logo} className="w-[42px] self-center justify-center" />
            </div>
          </div>
          <div className="text-xl md:text-2xl mt-[15px] text-left">{homeObject.participantName}</div>
        </div>
        {isDaily && (
          <div className="hidden text-center md:flex flex-col justify-end">
            <span className="badge">A nap tippje</span>
          </div>
        )}

        <div className="flex-1 text-center">
          <div className="flex justify-end">
            <div className="bg-rgba-grey-08 backdrop-blur-[5px] h-[59px] w-[59px] rounded-full flex justify-center">
              <img src={awayObject.logo} className="w-[42px] self-center justify-center" />
            </div>
          </div>
          <div className="text-xl md:text-2xl mt-[15px] text-right">{awayObject.participantName}</div>
        </div>
      </div>


      <div className="flex xl:hidden w-full   px-[15px]">
        {showDatas && (
          <>
            <motion.div animate={{ opacity: 1 }} transition={{ delay: 0 }} className="sidebar-mobile left-side  left-[30px] top-0 opacity-0 flex-1" >

              {homeObject?.shape && (
                <Statistics datas={homeObject.shape} position={'left'} />
              )}

              {homeObject?.lastMatch && (
                <LastMatch data={homeObject.lastMatch} position={'left'} />
              )}

              {homeObject.ranking && (
                <LeaguePosition data={homeObject.ranking} position={'left'} />
              )}


              {homeObject?.missings && (
                <Missings data={homeObject.missings} position={'left'} />
              )}
            </motion.div>

            <motion.div animate={{ opacity: 1 }} transition={{ delay: 0 }} className="sidebar-mobile right-side  right-[30px] top-0 opacity-0 flex-1">
              {awayObject.shape && (
                <Statistics datas={awayObject.shape} position={'right'} />
              )}

              {awayObject?.lastMatch && (
                <LastMatch data={awayObject.lastMatch} position={'right'} />
              )}

              {awayObject.ranking && (
                <LeaguePosition data={awayObject.ranking} position={'right'} />
              )}

              {awayObject?.missings && (
                <Missings data={awayObject.missings} position={'right'} />
              )}

            </motion.div>
          </>
        )}

      </div>
      <div className="flex xl:hidden ">
        <div className="flex-1 flex flex-col items-center justify-end">
          <div className="text-[20px] font-[500]">{locationDatas.weather}</div>
          <div className="text-sm font-semibold mb-[50px]">{locationDatas.location}</div>
        </div>
      </div>
    </div>

  )
}