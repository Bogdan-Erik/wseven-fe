import _ from 'lodash';
import React from 'react'
import './PlayersGame.css';

export interface PlayerItem {
  image: string
}

export interface PlayersGameProps {
  players: PlayerItem[]
}

export const PlayersGame = ({ players }: PlayersGameProps): JSX.Element => {
  return (
    <div className="flex flex-row flex flex-1 justify-end">
      <div className="mr-[10px] text-[14px] text-rgba-grey-08">{players.length} tagunk játszotta meg</div>
      <div className="flex min-w-[130px]  place-content-center xl:place-content-start mb-[10px] xl:mb-0">
        <>
          {_.sampleSize(players, 4).map((item, key) => {
            return <div className="relative" style={{ left: -(key * 10) }} ><img src={item.image} className="rounded-full w-[26px] h-[26px] border-[2px] border-white" /></div>
          })}
          {players.length > 4 && (
            <div className="relative left-[-40px]"><div className="more rounded-full w-[26px] h-[26px] border-[2px] border-white text-[11px] bg-black text-white flex flex-col justify-center text-center font-[600]">+{players.length - 4}</div></div>
          )}
        </>
      </div>
    </div>
  )
}