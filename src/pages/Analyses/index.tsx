import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Container, CountdownTimer, StatisticsChart } from '../../components';
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

  return (
    <Container className="analyses-container container 2xl:mx-auto max-w-[100%] 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl mx-auto" padding={false}>
      <div className="analyses">
        <div className="header-bg">
          <div className="smoke relative">
            <video src="https://w7tips.fra1.digitaloceanspaces.com/videos/smokebg.mp4" playsInline loop autoPlay muted></video>
            <motion.div  animate={{ opacity: 1 }} transition={{ delay: 4 }}  className="sidebar left-side absolute left-[30px] top-0 opacity-0" >
              <div className="mt-[30px] mb-[50px]">
                <span className="title">Forma</span>
                <StatisticsChart datas={homeDatas} />


              </div>
              <div className="mb-[50px]">
                <span className="title">Előző meccs</span>
                <div className="flex mt-[5px]">
                  <div className="mr-[10px]"><img src={'https://w7tips.fra1.digitaloceanspaces.com/images/teams/mu.png'} /></div>
                  <div className="self-center text-xs">Győzelem (2-1)</div>
                </div>
              </div>
              <div className="mb-[50px]">
                <span className="title">Liga pozíció</span>
                <div className="flex flex-row  mt-[5px]">
                  <div className="text-[32px] font-semibold mr-[4px]">7.</div>
                  <div className="flex flex-col justify-center">
                    <div className="text-xs">hely</div>
                    <div className="text-xs text-rgba-grey">(34 pont)</div>
                  </div>
                </div>
              </div>
              <div className="mb-[50px]">
                <span className="title">Hiányzók</span>
                <div className="missing mt-[5px]">
                  <div className="missing-item">
                    <div className="mr-[8px]"><div className="mark"><img src={'https://w7tips.fra1.digitaloceanspaces.com/images/missing/injured.png'} width="20" height="20" /></div></div>
                    <div>Roberto Firmino</div>
                  </div>
                  <div className="missing-item">
                    <div className="mr-[8px]"><div className="mark"><img src={'https://w7tips.fra1.digitaloceanspaces.com/images/missing/injured2.png'} /></div></div>
                    <div>Virgil van Dijk</div>
                  </div>
                  <div className="missing-item">
                    <div className="mr-[8px]"><div className="mark"><img src={'https://w7tips.fra1.digitaloceanspaces.com/images/missing/red.png'} /></div></div>
                    <div>Jordan Henderson</div>
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="center-content">
              <motion.div animate={{ opacity: 1 }} transition={{ delay: 1 }} className="left-side">
                <img src={'https://w7tips.fra1.digitaloceanspaces.com/images/players/salah.png'} />
              </motion.div>
              <motion.div  animate={{ opacity: 1 }} transition={{ delay: 3 }} className="center-side  opacity-0">
                <div className="flex-1 justify-start self-center">
                  <img src={"https://w7tips.fra1.digitaloceanspaces.com/images/leagues/cl.png"} />
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="text-sm mb-[10px]">2022. május 28. <strong>21:00</strong></div>
                  <div className="w-[340px]">
                    <CountdownTimer targetDate={dateTimeAfterThreeDays} />
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-end">
                  <div className="text-[20px] font-[500]">20 °C </div>
                  <div className="text-sm font-semibold mb-[50px]">Liverpool - Anfield</div>
                </div>
              </motion.div>
              <motion.div animate={{ opacity: 1 }} transition={{ delay: 2 }} className="right-side">
                <img src={'https://w7tips.fra1.digitaloceanspaces.com/images/players/benzema.png'} />
              </motion.div>
            </div>
            <motion.div animate={{ opacity: 1 }} transition={{ delay: 4 }} className="sidebar right-side absolute right-[30px] top-0 opacity-0">
              <div className="mt-[30px] mb-[50px] text-right">
                <span className="title">Forma</span>
                <StatisticsChart datas={awayDatas} />

              </div>
              <div className="mb-[50px] text-right">
                <span className="title">Előző meccs</span>
                <div className="flex mt-[5px]">
                  <div className="self-center text-xs ml-auto mr-[10px]">Vereség (1-4)</div>
                  <div className=" flex justify-end"><img src={'https://w7tips.fra1.digitaloceanspaces.com/images/teams/mu.png'} /></div>
                </div>
              </div>
              <div className="mb-[50px] text-right">
                <span className="title">Liga pozíció</span>
                <div className="flex flex-row  mt-[5px] justify-end">
                  <div className="text-[32px] font-semibold mr-[4px]">3.</div>
                  <div className="flex flex-col justify-center">
                    <div className="text-xs text-left">hely</div>
                    <div className="text-xs text-left text-rgba-grey">(34 pont)</div>
                  </div>
                </div>
              </div>
              <div className="mb-[50px] text-right">
                <span className="title">Hiányzók</span>
                <div className="missing mt-[5px]">
                  <div className="missing-item">
                    <div className="text-end ml-auto mr-[8px]">Eden Hazard</div>
                    <div><div className="mark"><img src={'https://w7tips.fra1.digitaloceanspaces.com/images/missing/injured.png'} width="20" height="20" /></div></div>
                  </div>
                  <div className="missing-item">
                    <div className="text-end ml-auto mr-[8px]">Rodrygo Goes</div>
                    <div className="flex justify-end"><div className="mark"><img src={'https://w7tips.fra1.digitaloceanspaces.com/images/missing/injured2.png'} /></div></div>
                  </div>
                  <div className="missing-item">
                    <div className="text-end ml-auto mr-[8px]">Lucas Vázquez</div>
                    <div><div className="mark"><img src={'https://w7tips.fra1.digitaloceanspaces.com/images/missing/red.png'} /></div></div>
                  </div>
                  <div className="missing-item">
                    <div className="text-end ml-auto mr-[8px]">Nacho Fernández</div>
                    <div><div className="mark"><img src={'https://w7tips.fra1.digitaloceanspaces.com/images/missing/red.png'} /></div></div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </Container>
  )
}