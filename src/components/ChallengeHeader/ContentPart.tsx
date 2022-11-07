import React from 'react'
import { OddsItem } from '../';
import { Button } from '../';

export interface ChallengeBarStatus {
  fullBar: number,
  plannedBar: number,
  currentBar: number
}

export interface ChallengeBarProps {
  currentStatus: string,
  minValue: string,
  maxValue: string,
  barStatus: ChallengeBarStatus
}
export interface ContentPartDataProps {
  odds: string
  matchTitle: string
  matchBet: string
  challengeContent: string,
  challengeBar: ChallengeBarProps
}

export interface ContentPartProps {
  data: ContentPartDataProps,
  isMobile?: boolean
}


export const ContentPart = ({
  data,
  isMobile
}: ContentPartProps): JSX.Element => {

  return (

    <div className="mt-[30px]">
      <div className="text-[24px] font-[700]">{data.matchTitle}</div>
      <div className="flex my-[12px] ">
        <div className="mr-[20px]">
          <OddsItem odds={data.odds} />
        </div>
        <div className="self-center font-[500]">{data.matchBet}</div>
      </div>
      <div>
        {data.challengeContent}
      </div>
      <div className="mt-[80px]">
        <div className="text-[16px] mb-[7px]">Challenge állása: <span className="font-[700]">{ data.challengeBar.currentStatus}</span></div>
        <div>
          <div className="progress-bar ">
            <div className={`sub-progress`} style={{ width: `${((data.challengeBar.barStatus.plannedBar /data.challengeBar.barStatus.fullBar) * 100 )}%` }}></div>
            <div className={`current-progress`} style={{ width: `${((data.challengeBar.barStatus.currentBar /data.challengeBar.barStatus.fullBar) * 100 )}%` }}></div>
          </div>
          <div className="flex text-[16px] font-[600] mt-[6px]">
            <div className="flex-1">{data.challengeBar.minValue}</div>
            <div className="flex-1 text-right">{data.challengeBar.maxValue}</div>
          </div>
        </div>
      </div>
      <div className={`flex gap-[30px] mt-[40px] ${isMobile ? 'flex-col' : 'flex-row'}`}>
        <div><Button primary customClasses={isMobile ? 'w-full' : ''}>Napi tipp megjátszása</Button></div>
        <div><Button primary={false} backgroundColor={"#ffffff"} customClasses={`gradient-text ${isMobile ? 'w-full' : ''}`}>Kiszállok a challenge-ből</Button></div>
      </div>
    </div>
  )
}
