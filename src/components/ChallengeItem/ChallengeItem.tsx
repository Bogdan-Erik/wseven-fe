import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge';
import { Badge } from '../Badge';
import { BadgeType } from '../Badge/Badge';
import { Icon } from '../Icon';
import { MatchItem } from '../MatchItem';
import './ChallengeItem.scss';
import { motion } from "framer-motion";

export interface ChallengeItemProps {
  title: any,
  subTitle: string,
  label: string,
  isUpload: boolean,
  date: string,
  isSecondary?: boolean,
  matches?: any[],
  isParticipated?: boolean
  onClick?: () => void;
}

export const ChallengeItem = ({
  title,
  subTitle,
  label,
  isUpload,
  date,
  matches,
  isParticipated,
  isSecondary = false
}: ChallengeItemProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const mainClass = twMerge(`hidden xl:flex cursor-pointer md:cursor-initial w-full pointer text-white px-[15px] py-[20px] ${isSecondary ? 'bg-rgba-transparent-02' : 'bg-rgba-grey-007'}`)
  
  const variants = {
    open: { opacity: 1, y: 0,  },
    closed: { opacity: 0, y: "-100%" },
  }
  return (
    <>
      <div className={mainClass}  onClick={() => setIsOpen((value) => !value)}>
        <div className=" flex flex-col justify-center">
          <div className="text-[14px] w-[250px] 2xl:w-[auto]  text-white "><span className="font-[600]">{title}</span> <span className="font-[400] ml-[12px]">{subTitle}</span></div>
        </div>
        {
          isParticipated && (
            <div className=" flex flex-col justify-center ml-[30px]">
              <div className="text-[14px]  2xl:w-[auto]  text-white "><Badge type={BadgeType.Primary} label="Résztvettél" /></div>
            </div>
          )
        }
        <div className="hidden xl:flex flex-col justify-center ml-auto mr-[20px]">
          <div className={"rounded-md px-[15px] py-[6px] text-xs flex flex-row justify-center items-center text-white py-1 " + (isUpload ? ' bg-light-green' : ' bg-light-red')}>
            <span className={`font-icomoon justify-center text-lg text-${isUpload ? 'green' : 'red'} icon-${isUpload ? 'success' : 'error'} text-sm mr-2`}> </span>{label}
          </div>
        </div>
        <div className="hidden xl:flex flex-col justify-center text-[14px] font-[400] ml-[37px]">
          {date}
        </div>
        <div className="flex ml-[26px] self-center"><motion.div
        animate={{
          rotate: isOpen ? 180 : 0
        }}
        ><Icon icon={'expand'} size={'text-2xl'} /></motion.div></div>
      </div >
      <div className="xl:hidden  mb-5" onClick={() => setIsOpen((value) => !value)}>
        <div className="flex flex-col justify-center">
          <div className={"rounded-t-md text-xs flex flex-row justify-center items-center text-white py-1" + (isUpload ? ' bg-light-green' : ' bg-light-red')}>
            <div className="flex"><span className={`font-icomoon justify-center text-lg text-${isUpload ? 'green' : 'red'} icon-${isUpload ? 'success' : 'error'} text-sm mr-2`}> </span></div><div>{label}</div>
          </div>
        </div>
        <div className="w-full grey-linear-gradient rounded-b-md text-white p-2.5 flex flex-col">
          <div className="w-full">
            <div className="flex flex-col justify-center">
              <div className=" text-center text-white text-[14px]"><span className="font-[600]">{title}</span> <span className="font-[400] ml-[12px]">{subTitle}</span></div>
              <div className=" text-center text-white text-[14px] mt-[6px]">{date}</div>
              {
                isParticipated && (
                  <div className=" flex flex-col justify-center self-center mt-[9px]">
                    <div className="text-[14px]  2xl:w-[auto]  text-white "><Badge type={BadgeType.Primary} label="Résztvettél" /></div>
                  </div>
                )
              }
              <div className="text-[14px] text-rgba-grey-08 self-center mt-[9px]">Részletek</div>
            </div>
          </div>
        </div>

      </div>
      <motion.div className="match-items"
       animate={isOpen ? "open" : "closed"}
        variants={variants}
        style={{display: isOpen ? 'block' : 'none', marginBottom: '10px'}}
      >
        {matches?.map(item => {
          return (
            <div className="mt-[10px]">
            <MatchItem balance={item.balance} date={item.date} time={item.time} home={item.home} away={item.away} winner={item.winner} odds={item.odds} tippString={item.tippString} isWinner={item.isWinner} winningPrice={item.winningPrice} />
              </div>
          )
        })}

      </motion.div>


    </>
  )
}