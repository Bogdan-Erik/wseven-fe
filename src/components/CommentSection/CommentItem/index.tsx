import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

export interface PageProps {
  customerImage: string;
  data: any;
  customerId: string;
}

export default ({ customerImage, customerId, data }: PageProps) => {
  return (
    <div className="comment-item flex">
      <div>
        <img
          src={customerImage}
          className="object-cover rounded-full w-[44px] h-[44px] object-center "
        />
      </div>
      <div className="ml-[20px] w-full">
        <div className="flex flex-row">
          <div className="text-[14px] font-[600] flex-[1]">
            {data?.customer?.nickname ?? data?.customer?.name}
          </div>
          <div className="text-[12px] font-[400] ml-auto">
            {moment(data?.updated_at).format("YYYY. MMMM D. HH:mm")}
          </div>
        </div>
        <div className="text-[16px] font-[400] mt-[8px]">{data.comment}</div>
        {data?.customer?.id === customerId && (
          <div className="text-[12px] text-rgba-grey-06 flex gap-[15px]">
            <div>Szerkesztés</div>
            <div>Törlés</div>
          </div>
        )}
      </div>
    </div>
  );
};
1;
