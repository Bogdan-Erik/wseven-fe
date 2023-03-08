import React from 'react'
import { twMerge } from 'tailwind-merge';
import { Icon } from '../Icon';
import './TransactionRow.css';

export interface TransactionRowProps {
  icon: string,
  title: any,
  label: string,
  amount: string,
  isUpload: boolean,
  date: string,
  isSecondary: boolean,
  onClick?: () => void;
}

export const TransactionRow = ({
  icon,
  title,
  label,
  amount,
  isUpload,
  date,
  isSecondary = false
}: TransactionRowProps): JSX.Element => {
  const mainClass = twMerge(`hidden xl:flex  md:cursor-initial w-full text-white px-[15px] py-[20px] ${isSecondary ? 'bg-rgba-transparent-02' : 'bg-rgba-grey-007'}`)
  return (
    <>
      <div className={mainClass}>
        <div className="flex justify-center flex-col mr-[16px]">
          <Icon icon={icon} size={'text-xl'} />
        </div>
        <div className=" flex flex-col justify-center">
          <div className="text-[14px] w-[250px] 2xl:w-[auto]  text-white ">{title}</div>
        </div>
        <div className="hidden xl:flex flex-col justify-center ml-auto mr-[20px]">
          <div className={"rounded-md px-[15px] py-[6px] text-xs flex flex-row justify-center items-center text-white py-1 " + (isUpload ? ' bg-light-green' : ' bg-light-red')}>
            <span className={`font-icomoon justify-center text-lg text-${isUpload ? 'green' : 'red'} icon-${isUpload ? 'arrow_up' : 'arrow_down'} text-sm mr-2`}> </span>{label}
          </div>
        </div>
        <div className="hidden xl:flex flex-col justify-center text-right text-[16px] font-[700] w-[100px]  ml-[62px]   mr-[50px]">
          {amount}
        </div>
        <div className="hidden xl:flex flex-col justify-center text-[14px] font-[400]">
          {date}
        </div>
        <div className="flex ml-auto xl:hidden"><Icon icon={'expand'} size={'text-2xl'} /></div>

      </div >

      <div className="xl:hidden  mb-5">
        <div className="flex flex-col justify-center">
          <div className={"rounded-t-md text-xs flex flex-row justify-center items-center text-white py-1" + (isUpload ? ' bg-light-green' : ' bg-light-red')}>
            <div className="flex"><span className={`font-icomoon justify-center text-lg text-${isUpload ? 'green' : 'red'} icon-${isUpload ? 'arrow_up' : 'arrow_down'} text-sm mr-2`}> </span></div><div>{label}</div>
          </div>
        </div>
        <div className="w-full grey-linear-gradient rounded-b-md text-white p-2.5 flex flex-col">
          <div className="w-full">
            <div className="flex flex-col justify-center">
              <div className=" text-center text-white font-semibold">{title}</div>
              <div className=" text-center text-white">{date}</div>
            </div>
          </div>
         
          <div className=" mt-5">
            <div className="justify-center">
              <div className="text-center text-[24px] font-[700]">
              {amount}
              </div>
            </div>
          </div>

        </div>

      </div>


    </>
  )
}