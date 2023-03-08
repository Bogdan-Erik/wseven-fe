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
import moment from 'moment';
import { Age } from '../../MatchComponents/Age/Age';
import { Hand } from '../../MatchComponents/Hand/Hand';
import { Prize } from '../../MatchComponents/Prize/Prize';

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
  isIndividual: boolean
  shape: ShapeProps[]
  lastMatch: LastMatchProps
  ranking: RankingProps
  missings?: MissingsProps[]
  age?: AgeProps
  hand?: HandProps
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
  tv?: any
  fieldType?: any
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
  showDatas,
  tv,
  fieldType
}: AnalysesHeaderProps): JSX.Element => {
  const THREE_DAYS_IN_MS = new Date(matchDate.date).getTime();

  const dateTimeAfterThreeDays = THREE_DAYS_IN_MS;
console.log(sport.value)
  const colorScheme = sport.color;
  return (
    <div>
      <div className="header-bg overflow-hidden relative min-h-[593px] h-full lg:min-h-[405px] 2xl:min-h-[650px] 3xl:min-h-[650px]">
        <div className="header-bg absolute min-h-[593px] h-full lg:min-h-[405px] 2xl:min-h-[650px] 3xl:min-h-[650px]" style={{background: `url(${background})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', filter: 'blur(5px)'}}></div>
        <div className="header-bg absolute min-h-[593px] h-full lg:min-h-[405px] 2xl:min-h-[650px] 3xl:min-h-[650px]" ></div>
        <div className={`${colorScheme}-scheme h-full bg-opacity-75 r header-bg absolute min-h-[593px] lg:min-h-[405px] 2xl:min-h-[650px] 3xl:min-h-[650px] bg-black opacity-[.9]`}></div>
        <div className={`elative min-h-[593px] lg:min-h-[405px] 2xl:min-h-[650px] 3xl:min-h-[650px]`}>
          <div className="smoke relative flex px-[30px] py-[30px] min-h-[593px] lg:min-h-[405px] 2xl:min-h-[650px] 3xl:min-h-[650px]">
            <video src="https://w7tips.fra1.digitaloceanspaces.com/videos/smokebg.mp4" playsInline loop autoPlay muted></video>
            <motion.div animate={{ opacity: 1 }} transition={{ delay: 1 }} className="sidebar left-side z-[10] left-[30px] top-0 opacity-0" >

              {(homeObject?.shape && showDatas) && (
                <Statistics datas={homeObject.shape} position={'left'} />
              )}

              {(homeObject?.lastMatch && showDatas) && (
                <LastMatch data={homeObject.lastMatch} position={'left'} />
              )}


              {(homeObject?.ranking && showDatas) && (
                <LeaguePosition data={homeObject.ranking} position={'left'} />
              )}


              {(homeObject?.age && showDatas) && (
                <Age data={homeObject.age} position={'left'} />
              )}

              {(homeObject?.hand && showDatas) && (
                <Hand data={homeObject.hand} position={'left'} />
              )}
              
              {(homeObject?.careerPrizes && showDatas) && (
                <Prize data={homeObject.careerPrizes} position={'left'} />
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

              
              {(awayObject?.age && showDatas) && (
                <Age data={awayObject.age} position={'right'} />
              )}

              {(awayObject?.hand && showDatas) && (
                <Hand data={awayObject.hand} position={'right'} />
              )}

              {(awayObject?.careerPrizes && showDatas) && (
                <Prize data={awayObject.careerPrizes} position={'right'} />
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
              <img src={matchLogo} className={"event-logo h-[120px] max-w-[250px]"} />
            </div>
            <div className="flex-1 justify-center flex self-center flex-col items-center">
              <div className="text-sm">{moment(matchDate.date).format('YYYY. MMMM DD.')} <strong>{format(Date.parse(matchDate.date), 'HH:mm')}</strong></div>
              <div className="w-[340px]">
                <CountdownTimer targetDate={dateTimeAfterThreeDays} />
              </div>
              <div>
              <span className='text-rgba-grey-08 font-[500]'>TV adó:</span> <span className='font-[700] text-[14px]'>{tv.name}</span>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-end">
              <div className="text-[20px] mb-[5px] font-[500]"><img src={locationDatas.weather} className="max-w-[150px] max-h-[80px]" /></div>
              <div className="mb-[30px]">
                <div className="text-sm font-semibold mb-[10px] text-center">{locationDatas.location}</div>
                {fieldType && (<div className="text-sm font-semibold  flex justify-center"><img src={fieldType} /></div>)}
            
              </div>
              
            </div>
            {/* 
            <div className="flex-1 grid grid-cols-3 auto-rows-auto	grid-flow-row  items-center justify-end">
                <div>
                  <div className='mb-[10px]'>Helyszín</div>
                  <div className="text-sm font-semibold mb-[10px]">{locationDatas.location}</div>
                </div>
                <div>
                  <div className='mb-[10px]'>TV Csatorna</div>
                  <div className='flex justify-center'><img src={tv.logo} className="max-w-[150px] max-h-[80px]" /></div>
                </div>
                <div>
                  <div className='mb-[10px]'>Időjárás</div>
                  <div className="text-[20px] font-[500]"><img src={locationDatas.weather} className="max-w-[150px] max-h-[80px]" /></div>
                </div>
            </div>
            */}

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
              <img src={homeObject.logo} className={`${homeObject.isIndividual ? 'w-full h-full rounded-full' :  ' w-[42px]'} self-center justify-center`} />
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
              <img src={awayObject.logo} className={`${homeObject.isIndividual ? 'w-full  h-full rounded-full' :  ' w-[42px]'} self-center justify-center`} />
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

              {(homeObject?.age && showDatas) && (
                <Age data={homeObject.age} position={'left'} />
              )}

              {(homeObject?.hand && showDatas) && (
                <Hand data={homeObject.hand} position={'left'} />
              )}

               
              {(homeObject?.careerPrizes && showDatas) && (
                <Prize data={homeObject.careerPrizes} position={'left'} />
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

              {(awayObject?.age && showDatas) && (
                <Age data={awayObject.age} position={'right'} />
              )}

              {(awayObject?.hand && showDatas) && (
                <Hand data={awayObject.hand} position={'right'} />
              )}

              
              {(awayObject?.careerPrizes && showDatas) && (
                <Prize data={awayObject.careerPrizes} position={'right'} />
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
          <div className="text-[20px] mb-[10px] font-[500]"><img src={locationDatas.weather} className="max-w-[150px] max-h-[80px]" /></div>
          {tv && (<div className="text-sm font-semibold mb-[10px]">TV adó: <span className='font-[700] text-[14px]'>{tv.name}</span></div>)}
          <div className="text-sm font-semibold mb-[20px]">{locationDatas.location}</div>
          {fieldType && (<div className="text-sm font-semibold mb-[30px] flex justify-center"><img src={fieldType} /></div>)}

        </div>
      </div>
    </div>

  )
}