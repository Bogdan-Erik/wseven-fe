import React, { useEffect, useState } from 'react';
import { Icon } from '../../components';
import './index.scss';

import { AnimatePresence, motion, useScroll } from 'framer-motion';

export interface PageProps {

}

export default ({ }: PageProps) => {

  return (
    <>
      <div className="hero-bg absolute top-[-80px] left-0 w-full h-[100vh] z-[-1]"></div>
      <div className="success-bg absolute top-[-80px] left-0 w-full h-[100vh] z-[-1]"></div>
      <div className="hero-bg-secondary text-white h-[87vh]">
        <div className="relative sub-container">
          <div className="container 2xl:mx-auto max-w-[100%] 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl mx-auto">

            <div className="py-[20px]  text-center max-w-[752px] mx-auto">
              <div className="mb-[25px]">
                <motion.div
                  animate={{
                    scale: [1, 2, 2, 1, 1],
                    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                  }}
                ><Icon size="text-[2xl]" iconClasses="text-[58px]" isGradient={true} icon="success" />
                </motion.div>
              </div>
              <div className="text-[40px] font-semibold	text-white mb-[15px]">Gratulálunk, sikeres feliratkozás!</div>
              <div className="text-lg 	text-white mb-[40px] max-w-[660px] ml-auto mr-auto">Most már biztosan megkapod a 90%-os kedvezményünket! Kövess be minket social felületünkön, hogy ingyenes tippeket kaphass indulásunking!
              </div>
              <div className="h-[1px] w-full bg-rgba-grey-02 mb-[20px]"></div>
              <div className="text-md text-rgba-grey-08 mb-[20px]">Kövess minket közösségi oldalainkon is az ingyenes tippekért és információkért!</div>
              <div className="">
                <div className="flex-1 justify-center flex flex-column mt-2  md:mt-0 order-1 md:order-2">
                  <div className="mr-8"><a href="https://www.facebook.com/w7tips/" target={'blank'}><span className={`font-icomoon icon icon-facebook text-[30px] text-rgba-grey-08`} /></a></div>
                  <div><a href="https://www.instagram.com/w7tips_eu/" target={'blank'}><span className={`font-icomoon icon icon-instagram  text-[30px] text-rgba-grey-08`} /></a></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>



    </>
  )
}