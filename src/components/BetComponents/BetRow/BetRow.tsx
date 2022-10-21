import React from 'react'
import { Button } from '../../Button';
import { Icon } from '../../Icon';
import { OddsItem } from '../OddsItem';
import './BetRow.scss';
import _ from "lodash";

export interface BetRowProps {
  odds: string,
  title: string,
  strength: number,
  suggestedBet: string,
  players: any[],
}

export const BetRow = ({ odds, title, strength, suggestedBet, players }: BetRowProps): JSX.Element => {
  return (
    <div className="bet-row">
      <div className="bet-row__title">
        <div className="self-center"><OddsItem odds={odds} /></div>
        <div className="ml-[15px] flex justify-center flex-col font-[500]">{title}</div>
      </div>
      <div className="my-[15px]"><hr className="text-rgba-grey-02" /></div>
      <div className="bet-row__content">
        <div className="left-side  flex-col xl:flex-row   items-center">
          <div className="flex mr-[30px] mt-[20px] xl:mt-0 xl:mt-[20px]">
            <div>Erősség:</div>
            <div className="ml-[6px]">
              {[...Array(strength)].map(() => {
                return <Icon icon='full_star' size={'text-xl'} isGradient />
              })}

              {[...Array(3 - strength)].map(() => {
                return <Icon icon='empty_star' size={'text-xl'} />
              })}

            </div>
          </div>
          <div>Ajánlott tét: <strong className="text-white">{suggestedBet}</strong></div>
        </div>
        <div className="right-side xl:ml-auto items-center  flex-col xl:flex-row">
          <div className="flex  flex-col xl:flex-row">
            <div className="mr-[10px] order-2 xl:order-1 ">{players.length} tagunk játszotta meg</div>
            <div className="flex min-w-[130px] order-1 xl:order-2 place-content-center xl:place-content-start mb-[10px] xl:mb-0">
              <>
                {_.sampleSize(players, 4).map((item, key) => {
                  return <div className="relative" style={{ left: -(key * 10) }} ><img src={item.image} className="rounded-full w-[26px] h-[26px] border-[2px] border-white" /></div>
                })}
                {players.length > 4 && (
                  <div className="relative left-[-40px]"><div className="more rounded-full w-[26px] h-[26px] border-[2px] border-white text-[11px] bg-black text-white flex flex-col justify-center text-center font-[600]">+8</div></div>
                )}
              </>
            </div>
          </div>
          <div className="hidden xl:flex w-full xl:w-auto"><Button customClasses={"w-full xl:w-auto py-[7px] font-[700]"} primary>Megjátszom</Button></div>
        </div>
        <div className="flex order-3 xl:hidden mt-[28px] "><Button customClasses={"w-full xl:w-auto py-[7px] font-[700]"} primary>Megjátszom</Button></div>
      </div>
    </div>
  )
}