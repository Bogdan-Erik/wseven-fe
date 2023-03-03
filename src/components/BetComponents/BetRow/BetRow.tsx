import React from 'react'
import { Button } from '../../Button';
import { Icon } from '../../Icon';
import { OddsItem } from '../OddsItem';
import './BetRow.scss';
import _ from "lodash";
import { TipStatusBadge } from '../TipStatusBadge';
import moment from 'moment';

export interface MatchData {
  liga: string,
  date: string,
  time: string,
  home: string,
  away: string,
  highlightedTeam: string,
}
export interface BetRowProps {
  odds: string
  title: string
  strength: number
  suggestedBet: string
  players: any[]
  playersNumber?: any,
  contentText?: string
  matchDatas?: MatchData
  action?: any
  disabled?: boolean
  played?: boolean
  playedAmount?: any
  isClosed?:boolean
  result?: string
  dateStart?: string
}

export const BetRow = ({ odds, dateStart, playersNumber = 0, result = undefined, isClosed = false, title, strength, suggestedBet, players, contentText, matchDatas, action, disabled = false, played = false, playedAmount = null}: BetRowProps): JSX.Element => {

  const resultLabel = () => {
    if (result === undefined) {
      if (moment(dateStart).isBefore(moment())) {
        return {
          text: 'Folyamatban',
          icon: 'schedule',
          color: 'white',
        };
      } else {
        return null;
      }
    } else {
      if (result === 'win') {
        return {
          text: 'Nyertes tipp',
          icon: 'success',
          color: 'green',
        };
      } else if (result === 'loose') {
        return {
          text: 'Vesztes tipp',
          icon: 'error',
          color: 'red',
        };
      } else if (result === 'push') {
        return {
          text: 'Érvénytelenítve',
          icon: 'disturb',
          color: 'neon',
        };
      } else {
        return null;
      }
    }
    return null;
  }
  return (
    <div className="bet-row">
       {matchDatas && (
          <div className="flex xl:hidden mb-[20px] xl:mb-0">
            <div className="pr-4 flex justify-center flex-col"><img src={matchDatas.liga} style={{ maxHeight: '42px', maxWidth: '60px' }} /></div>
            <div className=" flex flex-col justify-center w-32 md:w-32 ">
              <div className="text-xs  text-white font-semibold">{matchDatas.date}</div>
              <div className="text-xs font-normal">{matchDatas.time}</div>
            </div>
            <div className="flex flex-col justify-center  w-32 md:w-32">
              <div className={"text-xs text-white" + (matchDatas.highlightedTeam === 'home' ? ' font-semibold' : ' font-normal')}>{matchDatas.home}</div>
              <div className={"text-xs text-white " + (matchDatas.highlightedTeam === 'away' ? ' font-semibold' : ' font-normal')}>{matchDatas.away}</div>
            </div>
          </div>
        )}
      <div className="bet-row__title">
        {matchDatas && (
          <div className="hidden xl:flex">
            <div className="pr-4 flex justify-center flex-col"><img src={matchDatas.liga} style={{ maxHeight: '42px', maxWidth: '60px'  }} /></div>
            <div className=" flex flex-col justify-center w-32 md:w-32 ">
              <div className="text-xs  text-white font-semibold">{matchDatas.date}</div>
              <div className="text-xs font-normal">{matchDatas.time}</div>
            </div>
            <div className="flex flex-col justify-center  w-32 md:w-32">
              <div className={"text-xs text-white" + (matchDatas.highlightedTeam === 'home' ? ' font-semibold' : ' font-normal')}>{matchDatas.home}</div>
              <div className={"text-xs text-white " + (matchDatas.highlightedTeam === 'away' ? ' font-semibold' : ' font-normal')}>{matchDatas.away}</div>
            </div>
          </div>
        )}
        <div className="self-center"><OddsItem odds={odds} /></div>
        <div className="ml-[15px] flex justify-center flex-col font-[500]">{title}</div>
        {resultLabel() && (<div className="ml-auto flex justify-center flex-col font-[500]">{resultLabel() !== null && (<TipStatusBadge text={resultLabel()?.text} color={resultLabel()?.color} icon={resultLabel()?.icon} />)}</div>)}
      </div>
      {contentText && (<div className="py-[15px] text-[14px]">{contentText}</div>)}
      <div className="my-[15px]"><hr className="border-rgba-grey-02" /></div>
      <div className="bet-row__content">
        <div className="left-side  flex-col xl:flex-row   items-center">
          <div className="flex mr-[30px] mt-[20px] xl:mt-0 ">
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
          {!playedAmount ? (<div>Ajánlott tét: <strong className="text-white">{suggestedBet}</strong></div>) : (<div>Megjátszva: <strong className="text-white">{playedAmount?.tet?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' Ft'}</strong></div>)}
        </div>
        <div className="right-side xl:ml-auto items-center  flex-col xl:flex-row">
          <div className="flex  flex-col xl:flex-row">
            <div className="mr-[10px] order-2 xl:order-1 ">{/*playersNumber > 0 ? `${playersNumber}  tagunk játszotta meg` : ''*/}</div>
            <div className="flex min-w-[130px] order-1 xl:order-2 place-content-center xl:place-content-start mb-[10px] xl:mb-0">
              {/*<>
                {_.sampleSize(players, 4).map((item, key) => {
                  return <div className="relative" style={{ left: -(key * 10) }} ><img src={item.image} className="rounded-full w-[26px] h-[26px] border-[2px] border-white" /></div>
                })}
                {players.length > 4 && (
                  <div className="relative left-[-40px]"><div className="more rounded-full w-[26px] h-[26px] border-[2px] border-white text-[11px] bg-black text-white flex flex-col justify-center text-center font-[600]">+8</div></div>
                )}
                </>*/}
            </div>
          </div>
          <div className="hidden xl:flex w-full xl:w-auto">{!isClosed ? <Button disabled={disabled} onClick={() => action()} customClasses={"w-full xl:w-auto py-[7px] font-[700]"} primary>{!played ? 'Megjátszom' : 'Megjátszva'}</Button> : ''}</div>
        </div>
        <div className="flex order-3 xl:hidden mt-[28px] ">{!isClosed ? <Button disabled={disabled} onClick={() => action()} customClasses={"w-full xl:w-auto py-[7px] font-[700]"} primary>{!played ? 'Megjátszom' : 'Megjátszva'}</Button>: ''}</div>
      </div>
    </div>
  )
}