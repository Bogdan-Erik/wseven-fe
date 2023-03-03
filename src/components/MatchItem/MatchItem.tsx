// @ts-nocheck
import React from 'react'
import './MatchItem.css';
import LigaLogo from './../../assets/images/liga_logo.png';
import { twMerge } from 'tailwind-merge';

export interface MatchItemProps {
  matchId?: string,
  date: string,
  time: string,
  home: string,
  away: string,
  winner: string | null,
  isDailyTipp?: boolean | null,
  odds: string,
  tippString: string,
  isWinner: boolean,
  winningPrice: string,
  balance?: string,
  isSecondary?: boolean,
  turnOffMore?: boolean,
  logo?: any
  onClick?: () => void;
}

export const MatchItem = ({
  matchId = '',
  date = '2022. június 01.',
  time = '20:30',
  home = 'Real Madrid',
  away = 'Barcelona',
  winner = 'home',
  isDailyTipp = false,
  odds = '1.68',
  tippString = 'Tipp: Real Madrid győzelem',
  isWinner = true,
  winningPrice = '+10 egység',
  balance,
  isSecondary,
  turnOffMore,
  logo = '',
  onClick = () => {}
}: MatchItemProps): JSX.Element => {
  const contClass = twMerge(`${isSecondary ? 'bg-rgba-grey-dark-02' : ' bg-eerie-black'} w-full  text-white p-2.5 hidden xl:flex cursor-pointer`)

  const resultLabel = (version = 'desktop') => {
      if (isWinner === 'win') {
        return (
          <div className={twMerge(`bg-light-green ${version === 'desktop' ? 'rounded-md' : 'rounded-b-md'} px-5 py-[5px] text-xs flex flex-row justify-${version === 'desktop' ? 'start' : 'center'} items-center`)}>
            <span className={`font-icomoon text-lg text-green icon-success text-sm mr-2`}> </span>Nyertes tipp <span className="ml-2 font-semibold">{winningPrice}</span>
          </div>
        );
      } else if (isWinner === 'loose') {
        return (
          <div className={twMerge(`bg-light-red ${version === 'desktop' ? 'rounded-md' : 'rounded-b-md'} px-5 py-[5px] text-xs flex flex-row justify-${version === 'desktop' ? 'start' : 'center'} items-center`)}>
            <span className={`font-icomoon text-lg text-red icon-error text-sm mr-2`}> </span>Vesztes tipp <span className="ml-2 font-semibold">{winningPrice}</span>
          </div>
        );
      } else if (isWinner === 'push') {
        return (
          <div className={twMerge(`bg-light-yellow ${version === 'desktop' ? 'rounded-md' : 'rounded-b-md'} px-5 py-[5px] text-xs flex flex-row justify-${version === 'desktop' ? 'start' : 'center'} items-center`)}>
            <span className={`font-icomoon text-lg text-neon icon-disturb text-sm mr-2`}> </span>Érvénytelenítve 
          </div>
        );
      }

    return null;
  }
  
  return (
    <>
      <div className={contClass} onClick={() => onClick(matchId)}>
        <div className="pr-4 flex justify-center flex-col min-w-[76px] items-center"><img src={logo ?? LigaLogo} style={{ maxHeight: '36px', maxWidth: '50px' }} /></div>
        <div className=" flex flex-col justify-center w-32 md:w-32 ">
          <div className="text-xs  text-white font-semibold">{date}</div>
          <div className="text-xs font-normal">{time}</div>
        </div>
        <div className="flex flex-col justify-center  w-32 md:w-32">
          <div className={"text-xs text-white" + (winner === 'home' ? ' font-semibold' : ' font-normal')}>{home}</div>
          <div className={"text-xs text-white " + (winner === 'away' ? ' font-semibold' : ' font-normal')}>{away}</div>
        </div>
        <div className="flex-3 flex flex-row justify-center">
          <div className="mr-5 flex flex-col justify-center">
            <div className="bg-light-green rounded-md px-5 py-[5px] text-xs">
              <span className="font-icomoon icon-stat text-green"> </span>{parseFloat(odds).toFixed(2)}
            </div>
          </div>
          <div className="flex flex-4  flex-col justify-center text-sm">{'tippString'}</div>
          {/*<div className="flex flex-col justify-center">A nap tippje</div>*/}
        </div>
        <div className=" flex flex-col justify-center mx-4">
          {resultLabel()}
        </div>
        {!turnOffMore && (
          <div className="text-center flex flex-col justify-center text-white mr-[20px] ml-[60px]">{!balance ? <span className="text-white font-icomoon icon-arrow"> </span> : <span className="text-[16px] font-[700]">{balance}</span>}</div>
        )}
      </div >


      <div className="xl:hidden">
        <div className="w-full grey-linear-gradient rounded-t-md text-white p-2.5 flex flex-col">
          <div className="flex flex-row w-full">
            <div className="flex flex-row w-2/4">
              <div className="pr-4 flex justify-center flex-col"><img src={logo ?? LigaLogo} style={{ maxHeight: '36px', maxWidth: '50px' }} /></div>
              <div className="flex flex-col justify-center">
                <div className="text-xs  text-white font-semibold">{date}</div>
                <div className="text-xs font-normal">{time}</div>
              </div>
            </div>
            <div className="flex flex-row justify-end flex-1 w-2/4">

              <div className="flex flex-col justify-center">
                <div className={"text-xs text-white text-right" + (winner === 'home' ? ' font-semibold' : ' font-normal')}>{home}</div>
                <div className={"text-xs text-white text-right" + (winner === 'away' ? ' font-semibold' : ' font-normal')}>{away}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full mt-5">
            <div className="mr-5 flex flex-col justify-center">
              <div className="bg-light-green rounded-md px-5 py-[5px] text-xs">
                <span className="font-icomoon icon-stat text-green"> </span>{parseFloat(odds).toFixed(2)}
              </div>
            </div>
            {isDailyTipp && (<div className="blue-linear-gradient text-white text-xs rounded-md py-2 px-4">A nap tippje</div>)}
          </div>
          <div className="flex flex-4 mt-5 flex-col justify-center text-sm mb-2">{tippString}</div>

        </div>
        <div className="flex flex-col justify-center">
        {resultLabel('mobile')}
        </div>
      </div>
    </>
  )
}