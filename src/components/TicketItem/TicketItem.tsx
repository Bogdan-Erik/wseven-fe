import React from 'react'
import './TicketItem.css';
import LigaLogo from './../../assets/images/liga_logo.png';
import { twMerge } from 'tailwind-merge';
import { number } from 'yup';

export interface TicketItemProps {
  number: number
  date: string
  odds: string
  matchesNumber: number
  isWinner: boolean,
  winningPrice: string,
  isSecondary?: boolean,
  onClick?: () => void;
  item: any
}

export const TicketItem = ({
  number = 1,
  date = '2022. június 01.',
  odds = '1.68',
  isWinner,
  winningPrice = '+10',
  isSecondary,
  matchesNumber = 3,
  onClick,
  item
}: TicketItemProps): JSX.Element => {
  const contClass = twMerge(`${isSecondary ? 'bg-rgba-grey-dark-02' : ' bg-eerie-black'} w-full cursor-pointer  text-white p-2.5 hidden xl:flex`)
  console.log('item', item)
  return (
    <>
      <div className={contClass} onClick={() => onClick(item)}>
        <div className="pr-4 flex justify-center flex-col"><span className="font-icomoon icon icon-ticket-new text-2xl text-white"></span></div>
        <div className=" flex flex-col justify-center w-32 md:w-32 ">
          <div className="text-xs  text-white font-normal ">Szelvény</div>
          <div className="text-xs font-semibold">#{number}</div>
        </div>
        <div className="flex flex-col justify-center  w-32 md:w-32">
          <div className={"text-xs text-white font-semibold"}>{date}</div>
        </div>
        <div className="flex-3 flex flex-row justify-center">
          <div className="mr-5 flex flex-col justify-center">
            <div className="bg-light-green rounded-md px-5 py-[5px] text-xs">
              <span className="font-icomoon icon-stat text-green"> </span>{odds}
            </div>
          </div>
          <div className="flex flex-4  flex-col justify-center font-semibold text-sm">Meccsek száma: {matchesNumber}db</div>
          {/*<div className="flex flex-col justify-center">A nap tippje</div>*/}
        </div>
        <div className=" flex flex-col justify-center mx-4">
          <div className={`${isWinner ? 'bg-light-green' : 'bg-light-red'} rounded-md px-5 py-[3px] text-xs flex flex-row justify-start items-center`}>
            <span className={`font-icomoon text-lg ${isWinner ? 'text-green icon-success' : 'text-red icon-error text-lg'} text-sm mr-2`}> </span>{isWinner ? 'Nyertes tipp' : 'Vesztes tipp'}<span className="ml-2 font-semibold">{winningPrice} egység</span>
          </div>
        </div>
        
      </div >

{/*
      <div className="xl:hidden">
        <div className="w-full grey-linear-gradient rounded-t-md text-white p-2.5 flex flex-col">
          <div className="flex flex-row w-full">
            <div className="flex flex-row w-2/4">
              <div className="pr-4 flex justify-center flex-col"><img src={LigaLogo} style={{ maxHeight: '42px' }} /></div>
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
                <span className="font-icomoon icon-stat text-green"> </span>{odds}
              </div>
            </div>
            {isDailyTipp && (<div className="blue-linear-gradient text-white text-xs rounded-md py-2 px-4">A nap tippje</div>)}
          </div>
          <div className="flex flex-4 mt-5 flex-col justify-center text-sm mb-2">{tippString}</div>

        </div>
        <div className="flex flex-col justify-center">
          <div className={"rounded-b-md text-xs flex flex-row justify-center items-center text-white py-1" + (isWinner ? ' bg-light-green' : ' bg-light-red')}>
            <span className={"font-icomoon justify-center text-lg icon-success text-sm mr-2" + (isWinner ? ' text-green' : ' text-red')}> </span>{isWinner ? 'Nyertes tipp' : 'Vesztes tipp'}: <span className="ml-2 font-semibold">{balance ?? winningPrice}</span>
          </div>
        </div>
      </div>

*/}
    </>
  )
}