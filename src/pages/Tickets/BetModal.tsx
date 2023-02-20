import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  Icon,
  Modal,
  PlayersGame,
  FormInput,
  Button,
  OddsItem,
} from "../../components";
import "./index.scss";
import { AnimatePresence, motion } from "framer-motion";
import { BetSchema } from "../../utils/validationUtils";
import { Formik, getIn, useFormik } from "formik";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useAddTipForCustomerMutation } from "../../redux/MatchSlice";
import { useNotification } from "../../hooks/useNotification";
import Backdrop from "../../components/Modal/Backdrop";
import moment from "moment";

export interface BetModalProps {
  showTipModal: boolean;
  setShowTipModal: any;
  selectedTicket: any;
  confirmAction: any;
}

const BetModal = ({
  selectedTicket,
  showTipModal,
  setShowTipModal,
}: BetModalProps) => {
  const customer = useSelector((state: RootState) => state.customer);
  const auth = useSelector((state: RootState) => state.auth);
  const [addTipForCustomer, { isLoading }] = useAddTipForCustomerMutation();
  const { newSuccessToast, newErrorToast } = useNotification({
    theme: "colored",
  });

  

  return (
    <AnimatePresence>
      {showTipModal && (
        <CustomModal
          hasBg={true}
          isShowing={showTipModal}
          hide={() => {
            setShowTipModal(false);
          }}
          modalClasses="  w-[800px]  h-auto"
        >
          <div>
            <div>
              <div className="text-[24px] text-white text-center font-[600] pt-[20px]">
                {selectedTicket.name}
              </div>
              <div className="text-rgba-grey-08 text-[14px] text-center font-[500] mb-[30px]">
                {moment(selectedTicket.start_date)
                  .locale("hu")
                  .format("YYYY. MMMM DD.")}
              </div>
            </div>
            {selectedTicket?.tips?.map((tip: any, key: number) => {
              return (
                <div className={`py-[20px] flex ${key + 1 < selectedTicket.tips.length ? ' border-b-[1px] border-rgba-grey-01' : ''}`} key={key}>
                  <div>
                    <div className="text-[16px] font-[600] text-white mb-[8px]">
                      {tip.title}
                    </div>
                    <div className="flex">
                      <div>
                        <OddsItem odds={parseInt(tip.odds).toFixed(2)} />
                      </div>
                      <div className="ml-[10px] text-[16px] font-[400]">
                        Tipp: {tip.description}
                      </div>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <span className={`font-icomoon justify-center text-xl  ${tip.result === null ? 'icon-schedule text-white' : (tip.result === 'win' ? 'icon-success text-green' : 'icon-error text-red')} text-sm mr-2`}></span>
                  </div>
                </div>
              );
            })}
          </div>
        </CustomModal>
      )}
    </AnimatePresence>
  );
};

const dropIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

export interface ModalProps {
  children?: JSX.Element;
  modalClasses?: string;
  isShowing: boolean;
  hide: any;
  hasBg?: boolean;
  title?: JSX.Element;
}

export const CustomModal = ({
  children,
  title,
  modalClasses,
  isShowing,
  hide,
  hasBg = true,
}: ModalProps): JSX.Element => {
  const [isVisible, setIsVisible] = useState(true);
  const modalClass = twMerge(
    `  ${
      hasBg
        ? "bg-[url('/src/assets/images/ticket-modal/bg-secondary.png')]"
        : ""
    } pt-[45px] relative rounded-md relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[100%]  ${modalClasses}`
  );

  return (
    <Backdrop onClick={hide}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={modalClass}
        variants={dropIn}
        transition={{ duration: 0.1 }}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="bg-[url('/src/assets/images/ticket-modal/bg.png')] absolute top-[-40px] left-0 w-full h-full bg-no-repeat bg-contain"></div>
        <div className="px-[24px]  min-h-[640px] max-w-[588px] ml-auto mr-auto bg-dark-blue relative backdrop-blur-sm">
          <div className="">{children}</div>
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default BetModal;
