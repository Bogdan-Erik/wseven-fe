import React, { useEffect, useState } from "react";
import {
  Container,
  InformationItem,
  Input,
  Loader,
  NewsItem,
  PageTitle,
} from "../../components";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./index.scss";
import { useGetNewByIdQuery } from "../../redux/NewsSlice";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import WriteComment from "../../components/CommentSection/WriteComment";
import CommentItem from "../../components/CommentSection/CommentItem";
import moment from "moment";

export interface PageProps {}

export default ({}: PageProps) => {
  let { id } = useParams();
  const customer = useSelector((state: RootState) => state.customer);
  const auth = useSelector((state: RootState) => state.auth);
  const [comments, setComments] = useState([]); 

  const { isLoading, data, refetch } = useGetNewByIdQuery({ id });
 
 
  useEffect(() => {
    if (data) {
      setComments(data[0]?.news_comments ?? []);
    }
  }, [data])

  if (!data) {
    return;
  }

  return (
    <>
      <Container
        className="container 2xl:mx-auto max-w-[100%] 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl mx-auto mb-[80px]"
        padding
      >
        {isLoading ? (
          <div className="text-center text-[26px] text-rgba-grey-08 flex justify-center">
            <div className="flex items-center mr-[10px]">
              <Loader size={"30"} />
            </div>
            <div>Betöltés...</div>
          </div>
        ) : (
          <div className="max-w-[1115px] mx-auto">
            <div
              className={`bg-cover relative w-full h-[56vw] lg:max-w-[1115px] md:w-full md:h-[40vw] lg:max-h-[627px] max-w-full`}
              style={{
                backgroundImage: `url('${
                  import.meta.env.VITE_DO_IMAGE_HOST + data[0].cover
                }')`,
              }}
            >
              <div className="hidden lg:block absolute px-[20px] py-[12px] bottom-[24px] left-[24px] w-[631px] max-w-full h-auto bg-black">
                <div className="text-[28px] font-[600]">{data[0]?.title}</div>
                <div className="text-[12px] text-rgba-grey-08 font-[500]">
                  {moment(data[0]?.created_at).format('YYYY. MMMM D. HH:mm')}
                </div>
              </div>
            </div>
            <div className="block mt-[20px] lg:mt-[0px] lg:hidden ">
              <div className="text-[20px] font-[600]">{data[0]?.title}</div>
              <div className="text-[12px] text-rgba-grey-08 font-[500]">
                {data[0]?.created_at}
              </div>
            </div>
            <div
              className=" text-[12px] md:text-[16px]  mt-[20px] md:mt-[60px] new-content"
              dangerouslySetInnerHTML={{ __html: data[0]?.content }}
            ></div>
            {/*<div className="mt-[30px]">
              <div>
                <PageTitle title="Kommentek" />
              </div>
              <WriteComment customerImage={customer.image} newsId={data[0]?.id} customerId={auth.userId} />
              <div className="mt-[30px] font-[500]">
                {comments?.length === 0 && (<span>Még nem érkezett komment. Légy te az első!</span>)}
                {comments?.map((item: any, key: number) => {
                  return <div className="mb-[30px]" key={key}><CommentItem customerId={auth.userId} customerImage={customer.image} data={item} /></div>;  
                })}
              </div>
              </div>*/}
          </div>
        )}
      </Container>
    </>
  );
};
