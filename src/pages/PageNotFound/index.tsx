import React, { useEffect, useState } from "react";
import {
  Container,
  InformationItem,
  Loader,
  NewsItem,
  PageTitle,
} from "../../components";
import "./index.scss";

export interface PageProps {}

export default ({}: PageProps) => {

  return (
    <>
      <Container
        className="container 2xl:mx-auto max-w-[100%] 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl mx-auto mb-[80px]"
        padding
      >
        <div className="font-[700] text-[90px] text-center">404</div>
        <div className="font-[500] text-[40px]  text-center"> A keresett oldal nem található!</div>
      </Container>
    </>
  );
};
