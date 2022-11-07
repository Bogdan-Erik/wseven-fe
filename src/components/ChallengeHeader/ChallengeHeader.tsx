import React from 'react'
import { Button } from '../';
import { Icon } from '../Icon';
import { OddsItem } from '../';
import './ChallengeHeader.scss';
import _ from "lodash";
import { motion } from 'framer-motion';
import { url } from 'inspector';
import { format } from 'date-fns';
import W7Logo from './../../assets/images/logo.png';
import { ContentPart } from './ContentPart';

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

export interface LocationDatasProps {
  weather: string
  location: string
}

export interface TennisFieldType {
  image: string
}

export interface ChallengeDataProps {
  odds: string,
  matchTitle: string,
  matchBet: string,
  challengeContent: string,
  challengeBar: {
    currentStatus: string,
    minValue: string,
    maxValue: string,
    barStatus: {
      fullBar: number,
      plannedBar: number,
      currentBar: number
    }
  }
}

export interface ChallengesHeaderProps {
  type: string,
  background: string
  tennisFieldType?: TennisFieldType
  title: string,
  subTitle: string,
  date: string,
  content: ChallengeDataProps
}



export const ChallengeHeader = ({
  type,
  background,
  tennisFieldType,
  content,
  title,
  subTitle,
  date
}: ChallengesHeaderProps): JSX.Element => {


  
  return (
    <div>
      <div className="header-bg relative" style={{ background: `url(${background})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
        <div className="smoke challenge-container relative flex lg:px-[30px] py-[30px]">
          <video src="https://w7tips.fra1.digitaloceanspaces.com/videos/smokebg.mp4" playsInline loop autoPlay muted></video>
          <motion.div animate={{ opacity: 1 }} transition={{ delay: 1 }} className="side-content flex-1 z-[10]  left-[30px] top-0 opacity-0" >
            <div className="flex">
              <div className="self-center mr-[12px]">
                <img src={W7Logo} />
              </div>
              <div className="text-[32px] 2xl:text-[48px]"><span className="font-[700] mr-[20px]">{title}</span>   <span className="font-[300]">{subTitle}</span></div>
            </div>
            <div className="flex text-[14px]">
              <div className="mr-[30px]">Challenge kezdete: <span className="font-[700]">{date}</span></div>
              <div>Napló</div>
            </div>
            <ContentPart data={content} />
          </motion.div>
          <motion.div animate={{ opacity: 1 }} transition={{ delay: 1 }} className="images-content flex-1 z-[10]  left-[30px] top-0 opacity-0 min-h-[520px]" >
            <div className="relative h-full w-full mb-[-30px] players-container">
              <div className=" bottom-0 right-[150px] 2xl:right-[230px]  mb-[-30px] players-holder ">
                <img src={'https://w7tips.fra1.digitaloceanspaces.com/images/players/salah.png'} className="players max-w-[90%]" />
              </div>
              <div className=" bottom-0 right-[-30px]  2xl:right-[30px]  mb-[-30px] players-holder">
                <img src={'https://w7tips.fra1.digitaloceanspaces.com/images/players/benzema.png'} className="players max-w-[90%]" />
              </div>
            </div>
          </motion.div>

          <div className="absolute challenge-mobile-center-content mobile-center-content">
            <div className="absolute w-full top-[40px]">
              <motion.div animate={{ opacity: 1 }} transition={{ delay: 1 }} className="center-side  opacity-0">
                <div className="flex-1 justify-center flex self-center flex-col">
                  <div className="flex">
                    <div className="self-center mr-[12px]">
                      <img src={W7Logo} />
                    </div>
                    <div className="text-[24px]"><span className="font-[700] mr-[20px]">{title}</span>   <span className="font-[300]">{subTitle}</span></div>
                  </div>
                  <div className=" text-[14px]">
                    <div className="mr-[30px]">Challenge kezdete: <span className="font-[700]">{date}</span></div>
                    <div>Napló</div>
                  </div>
                </div>

              </motion.div>
            </div>
            <div className="flex h-[100%]">
              <motion.div animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="left-side relative">
                <img src={'https://w7tips.fra1.digitaloceanspaces.com/images/players/salah.png'} className="player-image-secondary absolute right-[-40px]" />
              </motion.div>
              <motion.div animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="right-side relative">
                <img src={'https://w7tips.fra1.digitaloceanspaces.com/images/players/benzema.png'} className="player-image-secondary absolute left-[-40px]" />
              </motion.div>
            </div>
          </div>
        </div>

      </div>

      <div className="challenge-mobile-part w-full px-[15px]">
        <ContentPart isMobile data={content} />
      </div>
    </div>


  )
}