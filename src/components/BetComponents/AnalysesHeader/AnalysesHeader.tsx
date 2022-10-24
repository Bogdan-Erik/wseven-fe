import React from 'react'
import { Button } from '../../Button';
import { Icon } from '../../Icon';
import { OddsItem } from '../OddsItem';
import './AnalysesHeader.scss';
import _ from "lodash";
import { BetRow, Container, CountdownTimer, SmallTitle, StatisticsChart } from '../../';
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
  place: number
  points?: number
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
  tennisFieldType?: TennisFieldType
}

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




export const AnalysesHeader = ({
  type,
  background,
  homeObject,
  awayObject,
  matchLogo,
  matchLogoSecondary,
  matchDate,
  locationDatas,
  tennisFieldType
}: AnalysesHeaderProps): JSX.Element => {
  const THREE_DAYS_IN_MS = new Date(matchDate.date).getTime();

  const dateTimeAfterThreeDays = THREE_DAYS_IN_MS;

  return (
    <div>
      <div className="header-bg relative" style={{ background: `url(${background})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition:'center' }}>
        <div className="smoke relative flex px-[30px] py-[30px]">
          <video src="https://w7tips.fra1.digitaloceanspaces.com/videos/smokebg.mp4" playsInline loop autoPlay muted></video>
          <motion.div animate={{ opacity: 1 }} transition={{ delay: 1}} className="sidebar left-side z-[10]  left-[30px] top-0 opacity-0" >
            <div className="holder-space-top holder-space">
              <span className="title">Forma</span>
              <StatisticsChart datas={homeObject.shape} />

            </div>
            <div className="holder-space">
              <span className="title">Előző meccs</span>
              <div className="flex mt-[5px]">
                <div className="mr-[10px]"><img src={homeObject.lastMatch.logo} /></div>
                <div className="self-center text-xs">{homeObject.lastMatch.value}</div>
              </div>
            </div>
            <div className="holder-space">
              <span className="title">Liga pozíció</span>
              <div className="flex flex-row  mt-[5px]">
                <div className="text-[32px] font-semibold mr-[4px]">{homeObject.ranking.place}.</div>
                <div className="flex flex-col justify-center">
                  <div className="text-xs">hely</div>
                  <div className="text-xs text-rgba-grey">({homeObject.ranking?.points ?? 0} pont)</div>
                </div>
              </div>
            </div>
            <div className="holder-space">
              <span className="title">Hiányzók</span>
              <div className="missing mt-[5px]">
                <>
                  {
                    homeObject?.missings?.map((item: MissingsProps) => (
                      <div className="missing-item">
                        <div className="mr-[8px]"><div className="mark"><img src={`https://w7tips.fra1.digitaloceanspaces.com/images/missing/${item.type}.png`} width="20" height="20" /></div></div>
                        <div>{item.name}</div>
                      </div>
                    ))
                  }
                </>
              </div>
            </div>
          </motion.div>

          <motion.div animate={{ opacity: 1 }} transition={{ delay: 1 }} className="sidebar right-side z-[10] right-[30px] top-0 opacity-0">
            <div className="holder-space-top holder-space text-right">
              <span className="title">Forma</span>
              <StatisticsChart datas={awayObject.shape} customHolderClass={'ml-auto'} />

            </div>
            <div className="holder-space text-right">
              <span className="title">Előző meccs</span>
              <div className="flex mt-[5px]">
                <div className="self-center text-xs ml-auto mr-[10px]">{awayObject.lastMatch.value}</div>
                <div className=" flex justify-end"><img src={awayObject.lastMatch.logo} /></div>
              </div>
            </div>
            <div className="holder-space text-right">
              <span className="title">Liga pozíció</span>
              <div className="flex flex-row  mt-[5px] justify-end">
                <div className="text-[32px] font-semibold mr-[4px]">{awayObject.ranking.place}.</div>
                <div className="flex flex-col justify-center">
                  <div className="text-xs text-left">hely</div>
                  <div className="text-xs text-left text-rgba-grey">({awayObject.ranking?.points ?? 0} pont)</div>
                </div>
              </div>
            </div>
            <div className="holder-space text-right">
              <span className="title">Hiányzók</span>
              <div className="missing mt-[5px]">
                <>
                  {
                    homeObject?.missings?.map((item: MissingsProps) => (
                      <div className="missing-item">
                        <div className="text-end ml-auto mr-[8px]">{item.name}</div>
                        <div><div className="mark"><img src={`https://w7tips.fra1.digitaloceanspaces.com/images/missing/${item.type}.png`} width="20" height="20" /></div></div>
                      </div>
                    ))
                  }
                </>
              </div>
            </div>
          </motion.div>

        </div>
        <div className="absolute center-content">
          <motion.div animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="left-side">
            <img src={homeObject.playerImage} className="player-image" />
          </motion.div>
          <motion.div animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="center-side  opacity-0">
            <div className="flex-1 justify-center flex self-center flex-col">
              <img src={matchLogo} className={"event-logo"} />
            </div>
            <div className="flex-1 justify-center flex self-center flex-col items-center">
              <div className="text-sm mb-[10px]">{format(Date.parse(matchDate.date), 'yyyy. LLLL dd.')} <strong>{format(Date.parse(matchDate.date), 'HH:mm')}</strong></div>
              <div className="w-[340px]">
                <CountdownTimer targetDate={dateTimeAfterThreeDays} />
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-end">
              <div className="text-[20px] font-[500]">{locationDatas.weather} °C </div>
              <div className="text-sm font-semibold mb-[50px]">{locationDatas.location}</div>
            </div>
          </motion.div>
          <motion.div animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="right-side">
            <img src={awayObject.playerImage} className="player-image" />
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
              <img src={homeObject.playerImage} className="player-image" />
            </motion.div>
            <motion.div animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="right-side">
              <img src={awayObject.playerImage} className="player-image" />
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
        <div className="hidden text-center md:flex flex-col justify-end">
          <span className="badge">A nap tippje</span>
        </div>
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
        <motion.div animate={{ opacity: 1 }} transition={{ delay: 0 }} className="sidebar-mobile left-side  left-[30px] top-0 opacity-0 flex-1" >
          <div className="holder-space-top holder-space">
            <span className="title">Forma</span>
            <StatisticsChart datas={homeObject.shape} />

          </div>
          <div className="holder-space">
            <span className="title">Előző meccs</span>
            <div className="flex mt-[5px]">
              <div className="mr-[10px]"><img src={homeObject.lastMatch.logo} /></div>
              <div className="self-center text-xs">{homeObject.lastMatch.value}</div>
            </div>
          </div>
          <div className="holder-space">
            <span className="title">Liga pozíció</span>
            <div className="flex flex-row  mt-[5px]">
              <div className="text-[32px] font-semibold mr-[4px]">{homeObject.ranking.place}.</div>
              <div className="flex flex-col justify-center">
                <div className="text-xs">hely</div>
                <div className="text-xs text-rgba-grey">({homeObject.ranking?.points} pont)</div>
              </div>
            </div>
          </div>
          <div className="holder-space">
            <span className="title">Hiányzók</span>
            <div className="missing mt-[5px]">
              <>
                {
                  homeObject?.missings?.map((item: MissingsProps) => (
                    <div className="missing-item">
                      <div className="mr-[8px]"><div className="mark"><img src={`https://w7tips.fra1.digitaloceanspaces.com/images/missing/${item.type}.png`} width="20" height="20" /></div></div>
                      <div>{item.name}</div>
                    </div>
                  ))
                }
              </>
            </div>
          </div>
        </motion.div>

        <motion.div animate={{ opacity: 1 }} transition={{ delay: 0 }} className="sidebar-mobile right-side  right-[30px] top-0 opacity-0 flex-1">
          <div className="holder-space-top holder-space text-right">
            <span className="title">Forma</span>
            <StatisticsChart datas={awayObject.shape} customHolderClass={'ml-auto'} />

          </div>
          <div className="holder-space text-right">
            <span className="title">Előző meccs</span>
            <div className="flex mt-[5px]">
              <div className="self-center text-xs ml-auto mr-[10px]">{awayObject.lastMatch.value}</div>
              <div className=" flex justify-end"><img src={awayObject.lastMatch.logo} /></div>
            </div>
          </div>
          <div className="holder-space text-right">
            <span className="title">Liga pozíció</span>
            <div className="flex flex-row  mt-[5px] justify-end">
              <div className="text-[32px] font-semibold mr-[4px]">{awayObject.ranking.place}.</div>
              <div className="flex flex-col justify-center">
                <div className="text-xs text-left">hely</div>
                <div className="text-xs text-left text-rgba-grey">({awayObject.ranking?.points} pont)</div>
              </div>
            </div>
          </div>
          <div className="holder-space text-right">
            <span className="title">Hiányzók</span>
            <div className="missing mt-[5px]">
            <>
                {
                  awayObject?.missings?.map((item: MissingsProps) => (
                    <div className="missing-item">
                      <div className="text-end ml-auto mr-[8px]">{item.name}</div>
                      <div><div className="mark"><img src={`https://w7tips.fra1.digitaloceanspaces.com/images/missing/${item.type}.png`} width="20" height="20" /></div></div>
                    </div>
                  ))
                }
              </>
            </div>
          </div>

        </motion.div>
      </div>
      <div className="flex xl:hidden ">
        <div className="flex-1 flex flex-col items-center justify-end">
          <div className="text-[20px] font-[500]">{locationDatas.weather} °C </div>
          <div className="text-sm font-semibold mb-[50px]">{locationDatas.location}</div>
        </div>
      </div>
    </div>

  )
}