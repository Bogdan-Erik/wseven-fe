import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import "./index.scss";
import { motion } from "framer-motion";
import {
  Container,
  DataPaginator,
  Loader,
  MatchItem,
  PageTitle,
  SportCard,
} from "../../components";
import {
  useGetActiveMatchesQuery,
  useLazyGetTipsByDateRangeQuery,
} from "../../redux/MatchSlice";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import Datepicker from "react-tailwindcss-datepicker";
import moment from "moment";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import NoAnalyse from "./../../assets/images/no-analyse.svg";

export interface PageProps {}

export default ({}: PageProps) => {
  const location = useLocation();
  let { id } = useParams();
  let navigate = useNavigate();

  const { isLoading, data, refetch } = useGetActiveMatchesQuery({
    sportId: id ?? null,
  });
  const { activeMatches, filteredTips } = useSelector(
    (state: RootState) => state.match
  );

  const [show, setShow] = useState(false);
  const [value, setValue] = useState({
    //  startDate: moment().subtract(7, "days").format("YYYY-MM-DD"),
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    refetch();
  }, [location]);

  const handleValueChange = (newValue: any) => {
    setValue(newValue);
  };

  const [trigger] = useLazyGetTipsByDateRangeQuery();

  useEffect(() => {
    trigger({
      dateFrom:
        value.startDate ?? moment().startOf("year").format("YYYY-MM-DD"),
      dateTo: value.endDate
        ? moment(value.endDate).add(1, "day").format("YYYY-MM-DD")
        : moment().add(1, "day").format("YYYY-MM-DD"),
    });
  }, []);

  useEffect(() => {
    trigger({
      dateFrom:
        value.startDate ?? moment().startOf("year").format("YYYY-MM-DD"),
      dateTo: value.endDate
        ? moment(value.endDate).add(1, "day").format("YYYY-MM-DD")
        : moment().add(1, "day").format("YYYY-MM-DD"),
    });
  }, [value]);

  const NoResult = () => {
    return <div>Jelenleg nincs találat erre az időszakra!</div>;
  };
  return (
    <Container
      className="dark container 2xl:mx-auto px-[20px] pt-[30px] max-w-[100%] 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl mx-auto"
      padding={false}
    >
      {isLoading ? (
        <div className="text-center text-[26px] text-rgba-grey-08 flex justify-center"><div className="flex items-center mr-[10px]"><Loader size={"30"} /></div><div>Betöltés...</div></div>
      ) : (
        <div className="analyses ">
          {activeMatches.length === 0 && (
            <div>
              <div className="flex justify-center">
                <img src={NoAnalyse} className="w-[216px] h-[216px]" />
              </div>
              <div className="text-[20px] font-[500] flex justify-center mt-[20px] max-w-[610px] ml-auto mr-auto text-center px-[40px]">
                Jelenleg nincs elérhető elemzés, de hamarosan jelentkezünk egy
                újabbal. Értesíteni fogunk róla!
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-[40px]">
            {/*<div className="col-span-1 lg:col-span-2 2xl:col-span-2 ">
            <SportCard daily={true} colorScheme={"blue"} size={"large"} images={['https://w7tips.fra1.digitaloceanspaces.com/images/players/salah.png', 'https://w7tips.fra1.digitaloceanspaces.com/images/players/benzema.png']} sportType={'football'} />
             </div>*/}

            {activeMatches?.map((item: any, key: number) => {
              if (item.isDaily) {
                return (
                  <div className="col-span-1 lg:col-span-2 2xl:col-span-2 " key={key}>
                    <Link to={`/analyses/${item.id}`}>
                      <SportCard
                        leagueLogo={item.league?.image}
                        daily={true}
                        size={"large"}
                        hazai={item.home}
                        vendeg={item.away}
                        images={[item.homeImage, item.awayImage]}
                        date={item.dateStart}
                        colorScheme={item.sport.color ?? "blue"}
                        sportType={
                          item?.sport?.value?.toLowerCase() ?? "football"
                        }
                      />
                    </Link>
                  </div>
                );
              }
              return (
                <div key={key}>
                  <Link to={`/analyses/${item.id}`}>
                    <SportCard
                      leagueLogo={item.league?.image}
                      hazai={item.home}
                      vendeg={item.away}
                      images={[item.homeImage]}
                      size={item.size}
                      date={item.dateStart}
                      daily={false}
                      colorScheme={item.sport.color ?? "blue"}
                      sportType={
                        item?.sport?.value?.toLowerCase() ?? "football"
                      }
                    />
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="mt-[80px] mb-[80px]">
            <div className="flex flex-col md:flex-row">
              <div className="md:mr-auto">
                <PageTitle title="Korábbi meccsek" />
              </div>
              <div className="mb-[20px] md:mb-0 min-w-[279px] ">
                <Datepicker
                  i18n={"hu"}
                  inputClassName="dark:bg-transparent outline-none border-none"
                  value={value}
                  separator={"-"}
                  displayFormat={"YYYY. MM DD."}
                  primaryColor={"violet"}
                  containerClassName={"z-[1000]"}
                  onChange={handleValueChange}
                  placeholder="Szűrés dátum alapján"
                />
              </div>
            </div>

            <DataPaginator
              NoResultComponent={NoResult}
              Component={MatchItem}
              datas={filteredTips}
              additionalComponentProps={{
                turnOffMore: true,
                onClick: (item: any) => {
                  navigate("/analyses/" + item);
                },
              }}
            ></DataPaginator>
          </div>
        </div>
      )}
    </Container>
  );
};
