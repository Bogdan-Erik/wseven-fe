import React from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { Button } from "../Button";
import { Icon } from "../Icon";
import "./BankItem.scss";

export interface BankItemAction {
  icon: string;
  title: string;
  onClick: any;
}

export interface BankItemProps {
  icon: string;
  title: string;
  amount: number;
  extraClass?: any;
  actions: BankItemAction[];
  isDashboard?: boolean;
  isToken?:boolean
}

export const BankItem = ({
  extraClass,
  icon,
  title,
  amount,
  actions,
  isDashboard = false,
  isToken = false,
}: BankItemProps): JSX.Element => {
  const extra = twMerge(
    `${extraClass} bank-item rounded-[6px] p-[27px] h-full`
  );
  const navigate = useNavigate();

  return (
    <div className={extra}>
      <div className="head flex flex-row">
        <div className=" flex flex-row flex-3">
          <div className="mr-[16px] flex flex-col justify-center">
            <Icon icon={icon} size={"text-2xl"} isGradient />
          </div>
          <div className="text-[20px] font-[600] text-white">{title}</div>
        </div>
        <div className="flex-1 flex justify-end">
          <Icon icon="info" size={"text-2xl"} iconClasses="text-rgba-grey-08" />
        </div>
      </div>
      <div className="my-[22px]">
        <hr className="border-rgba-grey-02" />
      </div>
      <div className="content">
        <div className=" flex flex-col">
          <div className="text-[14px] font-[600] text-rgba-grey-06">
            Egyenleg
          </div>
          <div className="text-[40px] font-[600] text-white">{
          Math.round(amount)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".") +  (isToken ? " token" : " Ft")
          }</div>
        </div>
        {actions.length > 0 && (
          <div className="actions mt-[15px]  flex flex-col md:flex-row">
            {actions.map((item: BankItemAction) => {
              return (
                <div
                  className="cursor-pointer mr-[20px] xl:mr-[40px] mt-[20px] md:mt-[0px]"
                  onClick={() => item.onClick()}
                >
                  <Icon
                    icon={item.icon}
                    size={"text-2xl"}
                    iconClasses="mr-[5px] relative top-[3px]"
                  />{" "}
                  {item.title}
                </div>
              );
            })}
            <div></div>
          </div>
        )}
        {(isDashboard && amount === 0) && (
          <div>
            <div className="text-center mb-[16px] mt-[10px]">
              <Icon
                icon="money"
                size={"text-[34px]"}
                iconClasses={"text-rgba-grey-08"}
              />
            </div>
            <div className="text-[16px] font-[500] text-rgba-grey-08 text-center">
            A virtuális bank segítségével követheted az egyenleged és ennek segítségével tudunk ajánlást adni neked az egyes tétekhez.
            </div>
            <div className="text-center mt-[24px]">
              <Button onClick={() => navigate('/bank')} customClasses="max-w-[308px] w-[308px] bg-gradient-to-r text-white from-rgba-grey-02 to-rgba-grey-01" size="small">Virtuális Egyenleg feltöltése</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
