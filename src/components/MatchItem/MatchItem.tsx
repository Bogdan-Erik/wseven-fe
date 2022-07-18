import React from 'react'
import './MatchItem.css';
import LigaLogo from './../../assets/images/liga_logo.png';

export interface MatchItemProps {

}

export const MatchItem = ({ }: MatchItemProps): JSX.Element => {
  return (
    <div className="flex w-full bg-black text-white p-2.5">
      <div className="pr-4"><img src={LigaLogo} style={{ maxHeight: '42px' }} /></div>
      <div className=" flex flex-col w-36 justify-center">
        <div className="text-xs  text-white font-semibold">2022.július 01.</div>
        <div className="text-xs font-normal">20:30</div>
      </div>
      <div className="flex flex-col  w-36  justify-center">
        <div className="text-xs  text-white font-semibold">Real Madrid</div>
        <div className="text-xs font-normal">Barcelona</div>
      </div>
      <div className="flex-3 flex flex-row justify-center">
        <div className="mr-5 flex flex-col justify-center">
          <div className="bg-light-green rounded-md px-5 py-[5px] text-xs">
            <span className="font-icomoon icon-stat text-green"> </span>1.68
          </div>
        </div>
        <div className="flex flex-4  flex-col justify-center text-sm">Tipp: Real Madrid győzelem</div>
        {/*<div className="flex flex-col justify-center">A nap tippje</div>*/}
      </div>
      <div className=" flex flex-col justify-center mx-4">
        <div className="bg-light-green rounded-md px-5 py-[3px] text-xs flex flex-row justify-start items-center">
          <span className="font-icomoon text-lg text-green icon-success text-sm mr-2"> </span>Nyertes tipp: <span className="ml-2 font-semibold">+10 egység</span>
        </div>
      </div>
      <div className=" w-10 text-center flex flex-col justify-center text-white"><span className="text-white font-icomoon icon-arrow"> </span></div>
    </div >
  )
}