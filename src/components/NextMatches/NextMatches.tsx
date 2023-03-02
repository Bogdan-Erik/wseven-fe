import React from "react";
import { Icon } from "../Icon";
import { PageTitle } from "../PageTitle";
import { NextMatchElement } from "./NextMatchElement";
import "./NextMatches.scss";

export interface NextMatchesProps {
  matches: any[];
}

export const NextMatches = ({
  matches = [],
}: NextMatchesProps): JSX.Element => {
  return (
    <div className="next-matches w-full p-[24px]">
      <PageTitle title="Következő meccseid" />

      <div className="flex flex-col gap-[24px]">
        {matches.length === 0 && (
          <div>
            <div className="text-center mb-[16px] mt-[10px]"><Icon icon="calendar" size={'text-[34px]'} iconClasses={
                  "text-rgba-grey-08" 
                }/></div>
            <div className="text-[16px] font-[500] text-rgba-grey-08 text-center">
            v  A megjátszott meccseid bekerülnek a naptáradba, így mindig tudni
              fogod, hogy mi mikor következik.
            </div>
          </div>
        )}
        {matches?.map((item: any, key: any) => {
          return (
            <div key={key}>
              <NextMatchElement eventInfo={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
