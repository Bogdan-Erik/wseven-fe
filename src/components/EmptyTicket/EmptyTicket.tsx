import React from "react";
import "./EmptyTicket.css";
import NoTicket from './../../assets/images/no-ticket.svg'

export interface EmptyTicketProps {}

export const EmptyTicket = ({}: EmptyTicketProps): JSX.Element => {
  return (
    <div>
      <div className="bg-[url('/src/assets/images/szelveny_topbottom.svg')] w-full h-[14px]"></div>
      <div className="bg-rgba-grey-015 w-full px-[20px] h-[324px] flex justify-center flex-col">
        <div className="">
          <div className="flex justify-center">
            <img src={NoTicket} className="w-[144px] h-[144px]" />
          </div>
          <div className="text-[16px] font-[500] flex justify-center mt-[20px] max-w-[610px] ml-auto mr-auto text-center">
            Jelenleg nincs aktív szelvényünk, de hamarosan jelentkezünk egy
            újabbal. Értesíteni fogunk róla!
          </div>
        </div>
      </div>
      <div className="bg-[url('/src/assets/images/szelveny_topbottom.svg')] w-full h-[14px] rotate-180"></div>
    </div>
  );
};
