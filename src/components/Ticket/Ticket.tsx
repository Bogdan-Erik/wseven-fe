import _ from 'lodash';
import moment from 'moment';
import React from 'react'
import { twMerge } from 'tailwind-merge';
import { useCountdown } from '../../hooks/useCountdownAlternative';
import { Button } from '../Button';
import './Ticket.css';
import 'moment/locale/hu'  // without this line it didn't work

export interface TitleProps {
  item: {
    id: string
    is_premium: boolean
    name: string
    type: string
    suggested_bet: number
    result: number
    status: number
    start_date: string
    tips: [{
      id: string
      odds: number
      result: number
      title: string
      description: string
    }]
  }
  setShowTipModal: any
}

export const Ticket = ({item, setShowTipModal}: TitleProps): JSX.Element => {
  
  const calculateOdds = () => {
    const numbers = item.tips?.map((tip: any)=> tip.odds);
    return _.reduce(numbers, _.multiply, 1).toFixed(2);
  }
  const [hours, minutes, seconds, isFinished] = useCountdown(item.start_date);

  return (
    <div className="max-w-[350px]">
      <div className="bg-[url('/src/assets/images/szelveny_topbottom.svg')] w-full h-[14px]"></div>
      <div className="bg-rgba-grey-015 w-full px-[20px]">
        <div className="text-[24px] text-white text-center font-[600] pt-[20px]">{item.name}</div>
        <div className='text-rgba-grey-08 text-[14px] text-center font-[500] mb-[30px]'>{moment(item.start_date).locale('hu').format('YYYY. MMMM DD.')}</div>
        <div>
          <div className="flex border-b-[1px] border-rgba-grey-01">
            <div className="flex-2 text-rgba-grey-08 text-[16px] font-[500] py-[10px]">Meccsek száma</div>
            <div className='text-rgba-grey-08 text-[16px] text-center font-[700] py-[10px]'>{item.tips.length}db</div>
          </div>
          <div className="flex border-b-[1px] border-rgba-grey-01">
            <div className="flex-2 text-rgba-grey-08 text-[16px] font-[500] py-[10px]">Eredő odds</div>
            <div className='text-rgba-grey-08 text-[16px] text-center font-[700] py-[10px]'>{calculateOdds()}</div>
          </div>
          <div className="flex">
            <div className="flex-2 text-rgba-grey-08 text-[16px]  font-[500] py-[10px]">Fogadási határidő</div>
            <div className='text-rgba-grey-08 text-[16px] text-center font-[700] py-[10px]'>{(!isFinished) ? `${hours}:${minutes}:${seconds}` : 'LEJÁRT'}</div>
          </div>
          <div className="py-[30px]">
            <Button onClick={() => setShowTipModal()} customClasses={"w-full font-[700]"} type="button" primary>Részletek</Button>
          </div>
        </div>
      </div>
      <div className="bg-[url('/src/assets/images/szelveny_topbottom.svg')] w-full h-[14px] rotate-180"></div>
    </div>
  )
}