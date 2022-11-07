import React from 'react'
import { Icon } from '../Icon';
import './BankItem.scss';

export interface BankItemAction {
  icon: string,
  title: string,
  onClick: any
}

export interface BankItemProps {
  icon: string,
  title: string,
  amount: string,
  actions: BankItemAction[]
}

export const BankItem = ({ icon, title, amount, actions }: BankItemProps): JSX.Element => {
  return (
    <div className="bank-item rounded-[6px] p-[27px] h-full">
      <div className="head flex flex-row">
        <div className=" flex flex-row flex-3">
          <div className="mr-[16px] flex flex-col justify-center"><Icon icon={icon} size={'text-2xl'} isGradient /></div>
          <div className="text-[20px] font-[600] text-white">{title}</div>
        </div>
        <div className="flex-1 flex justify-end"><Icon icon='info' size={'text-2xl'} /></div>
      </div>
      <div className="my-[22px]">
        <hr className="text-rgba-grey-02" />
      </div>
      <div className='content'>
        <div className=' flex flex-col'>
          <div className="text-[14px] font-[600] text-rgba-grey-06">Egyenleg</div>
          <div className="text-[40px] font-[600] text-white">{amount}</div>
        </div>
        <div className="actions mt-[15px]  flex flex-col md:flex-row">
          {actions.map((item: BankItemAction) => {
            return (
              <div className="cursor-pointer mr-[20px] xl:mr-[40px] mt-[20px] md:mt-[0px]"><Icon icon={'arrow_up'} size={'text-2xl'} iconClasses="mr-[5px] relative top-[3px]" /> Virtuális egyenleg feltöltése</div>
            )
          })}
          <div></div>
        </div>
      </div>
    </div>
  )
}