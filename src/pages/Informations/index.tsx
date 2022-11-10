import React, { useEffect, useState } from 'react';
import { Container, InformationItem, PageTitle } from '../../components';


export interface PageProps {

}

export default ({ }: PageProps) => {

  return (
    <>
      <Container className="container 2xl:mx-auto max-w-[100%] 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl mx-auto mb-[80px]" padding>
        <PageTitle title="Információk" icon="info" />
        <div>
          <PageTitle title="Gyakori kérdések" />

          <div className="flex flex-col xl:flex-row gap-0 md:gap-[40px]">
            <div className="flex-[1] space-y-[30px]">
              <div>
                <InformationItem title={"Hogy vehetek részt egy challange-n?"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </InformationItem>
              </div>
              <div>
                <InformationItem title={"Hogy vehetek részt egy challange-n?"}>
                  Lorem ipsum dolor sidt amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </InformationItem>
              </div>
              <div>
                <InformationItem title={"Hogy vehetek részt egy challange-n?"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </InformationItem>
              </div>
              <div>
                <InformationItem title={"Hogy vehetek részt egy challange-n?"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </InformationItem>
              </div>

            </div>
            <div className="flex-[1] space-y-[30px] mt-[30px] xl:mt-0">
              <div>
                <InformationItem title={"Hogy vehetek részt egy challange-n?"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </InformationItem>
              </div>
              <div>
                <InformationItem title={"Hogy vehetek részt egy challange-n?"}>
                  Lorem ipsum dolor sidt amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </InformationItem>
              </div>
              <div>
                <InformationItem title={"Hogy vehetek részt egy challange-n?"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </InformationItem>
              </div>
              <div>
                <InformationItem title={"Hogy vehetek részt egy challange-n?"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </InformationItem>
              </div>


            </div>
          </div>
        </div>
      </Container>
    </>
  )
}