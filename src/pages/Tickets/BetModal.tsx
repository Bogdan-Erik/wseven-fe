// @ts-nocheck
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
import { TicketSchema } from "../../utils/validationUtils";
import { Formik, getIn, useFormik } from "formik";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useAddTipForCustomerMutation } from "../../redux/MatchSlice";
import { useNotification } from "../../hooks/useNotification";
import Backdrop from "../../components/Modal/Backdrop";
import moment from "moment";
import _ from "lodash";
import { useAddTicketForCostumerMutation } from "../../redux/TicketSlice";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLazyGetBalanceQuery } from "../../redux/BankSlice";
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
  confirmAction,
}: BetModalProps) => {
  const customer = useSelector((state: RootState) => state.customer);
  const auth = useSelector((state: RootState) => state.auth);
  const [addTicketForCostumer, { isLoading }] =
    useAddTicketForCostumerMutation();
  const { newSuccessToast, newErrorToast } = useNotification({
    theme: "colored",
  });

  const [triggerBalance] = useLazyGetBalanceQuery();

  const [editBet, setEditBet] = useState(true);
  const tip_types = [
    { type: "kettes_kotes", value: "2-es kötés" },
    { type: "harmas_kotes", value: "3-as kötés" },
    { type: "negyes_kotes", value: "4-es kötés" },
    { type: "otos_kotes", value: "5-ös kötés" },
    { type: "hatos_kotes", value: "6-os kötés" },
    { type: "hetes_kotes", value: "7-es kötés" },
  ];

  const calcOdds = (tips: any) => {
    const numbers = tips?.map((tip: any) => tip.odds);
    return _.reduce(numbers, _.multiply, 1).toFixed(2);
  };

  const TicketForm = () => {
    return (
      <Formik
        initialValues={{
          tips: selectedTicket.tips.map((item: any) => {
            return {
              id: item.id,
              odds: parseFloat(item.odds).toFixed(2),
              title: item.title,
              description: item.description,
              result: item.result,
              editing: false,
            };
          }),
          bet: customer.defaultUnit * selectedTicket.suggested_bet,
        }}
        validationSchema={TicketSchema}
        onSubmit={async ({ bet, tips }) => {
          await triggerBalance().then((data) => {
            if ((data?.data?.current_balance ?? 0) < bet) {
              setShowTipModal(false);
              newErrorToast(
                "Sikertelen rögzítés",
                `A megjátszani kívánt tét magasabb mint a bankod! Ismételd meg megfelelő összeggel!`
              );
              return;
            } else {
              addTicketForCostumer({
                customer_id: auth.userId,
                ticket_id: selectedTicket.id,
                bet: bet,
                sourceType: "App\\Models\\CustomerTicket",
                description:
                  "Szelvény #" + selectedTicket.number + " rögzítése",
                customer_ticket_tips: tips.map((item: any) => {
                  return {
                    customer_id: auth.userId,
                    ticket_tip_id: item.id,
                    odds: item.odds?.toString(),
                  };
                }),
              })
                .then((data) => {
                  confirmAction();
                  setShowTipModal(false);
                  newSuccessToast(
                    "Sikeres rögzítés",
                    `A ${selectedTicket.name} szelvény rögzítése sikeres volt!`
                  );
                })
                .catch((err) => {
                  confirmAction();
                  setShowTipModal(false);
                  newErrorToast(
                    "Sikertelen rögzítés",
                    `A ${selectedTicket.name} szelvény rögzítése sikertelen volt!`
                  );
                });
            }
          });
        }}
      >
        {(formik) => {
          const {
            values,
            handleChange,
            errors,
            touched,
            handleSubmit,
            resetForm,
            getFieldProps,
            isValid,
            dirty,
            setFieldValue,
          } = formik;

          return (
            <form onSubmit={handleSubmit}>
              <div>
                <div>
                  <div className="text-[24px] text-white text-center font-[600] pt-[20px]">
                    Szelvény #{selectedTicket.number}
                  </div>
                  <div className="text-rgba-grey-08 text-[14px] text-center font-[500] mb-[30px]">
                    {moment(selectedTicket.start_date)
                      .locale("hu")
                      .format("YYYY. MMMM DD.")}
                  </div>
                </div>
                <div className="min-h-[300px]">
                  {formik.values.tips.map((tip: any, key: number) => {
                    return (
                      <div
                        className={`py-[20px] flex ${
                          key + 1 < selectedTicket.tips.length
                            ? " border-b-[1px] border-rgba-grey-01"
                            : ""
                        }`}
                        key={key}
                      >
                        <div>
                          <div className="text-[16px] font-[600] text-white mb-[8px]">
                            {tip.title}
                          </div>
                          <div className="flex">
                            {tip.editing === true ? (
                              <div>
                                <input
                                  name={`tips[${key}].odds`}
                                  value={formik.values.tips[key].odds}
                                  onChange={formik.handleChange}
                                  type="number"
                                  placeholder=""
                                  className="w-[82px] bg-light-green rounded-md px-[13px] py-[5px] h-[28px] grow text-xs "
                                  min={"0"}
                                  step={"0.01"}
                                />
                              </div>
                            ) : (
                              <div
                                className="flex cursor-pointer"
                                onClick={() =>
                                  setFieldValue(`tips[${key}].editing`, true)
                                }
                              >
                                <OddsItem
                                  odds={parseFloat(tip.odds).toFixed(2)}
                                  editMark={true}
                                />
                              </div>
                            )}

                            <div className="ml-[10px] text-[16px] font-[400]">
                              Tipp: {tip.description}
                            </div>
                          </div>
                        </div>
                        <div className="ml-auto">
                          <span
                            className={`font-icomoon justify-center text-xl  ${
                              tip.result === null
                                ? "icon-schedule text-white"
                                : tip.result === "win"
                                ? "icon-success text-green"
                                : "icon-error text-red"
                            } text-sm mr-2`}
                          ></span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex mt-[30px]">
                <div className="mr-auto">
                  <div className="text-[14px] text-rgba-grey-02' font-[500] mb-[9px]">
                    Fogadás típusa
                  </div>
                  <div className="text-[24px] uppercase font-[600]">
                    {tip_types.filter(
                      (item: any) => selectedTicket.type === item.type
                    )[0]?.value ?? "-"}
                  </div>
                </div>
                <div className="ml-auto mr-auto">
                  <div className="text-[14px] text-rgba-grey-02' font-[500] mb-[9px]">
                    Ajánlott tét
                  </div>
                  <div className="text-[24px] uppercase font-[600] min-w-[100px]">
                    {editBet ? (
                      <div>
                        <input
                          name={`bet`}
                          value={formik.values.bet}
                          onChange={formik.handleChange}
                          type="number"
                          placeholder=""
                          className="w-[90px] bg-light-green rounded-md px-[13px] py-[5px] h-[40px] grow text-xl "
                          min={"0"}
                          step={"0.01"}
                        />{" "}
                        Ft
                      </div>
                    ) : (
                      <div>
                        {(
                          customer.defaultUnit * selectedTicket.suggested_bet +
                          " Ft"
                        )
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        <span
                          className="ml-[10px] cursor-pointer"
                          onClick={() => setEditBet(true)}
                        >
                          <FontAwesomeIcon
                            icon={faPencil}
                            className="text-sm"
                          />
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="ml-auto">
                  <div className="text-[14px] text-rgba-grey-02' font-[500] mb-[9px]">
                    Odds
                  </div>
                  <div className="text-[24px] uppercase font-[600]">
                    {calcOdds(getFieldProps("tips").value)}
                  </div>
                </div>
              </div>
              <div className="mt-[28px]">
                <div>
                  <Button type="submit" customClasses="w-full" primary>
                    Megjátszottam
                  </Button>
                </div>
                <div className="mt-[10px]">
                  <Button
                    type="button"
                    customClasses="w-full text-white border-none shadow-none	"
                    onClick={() => {
                      setShowTipModal(false);
                    }}
                  >
                    Bezárás
                  </Button>
                </div>
              </div>
            </form>
          );
        }}
      </Formik>
    );
  };

  const TicketView = () => {
    const ticketSource =
      selectedTicket?.customer_tickets[0]?.customer_ticket_tips ??
      selectedTicket.tips;
    return (
      <div>
        <div>
          <div className="text-[24px] text-white text-center font-[600] pt-[20px]">
            Szelvény #{selectedTicket.number}
          </div>
          <div className="text-rgba-grey-08 text-[14px] text-center font-[500] mb-[30px]">
            {moment(selectedTicket.start_date)
              .locale("hu")
              .format("YYYY. MMMM DD.")}
          </div>
        </div>
        <div className="min-h-[300px]">
          {ticketSource?.map((tip: any, key: number) => {
            const tipObject = tip?.ticket_tip ?? tip;
            return (
              <div
                className={`py-[20px] flex ${
                  key + 1 < selectedTicket.tips.length
                    ? " border-b-[1px] border-rgba-grey-01"
                    : ""
                }`}
                key={key}
              >
                <div>
                  <div className="text-[16px] font-[600] text-white mb-[8px]">
                    {tipObject.title}
                  </div>
                  <div className="flex">
                    <div className="flex">
                      <OddsItem odds={parseFloat(tip.odds).toFixed(2)} />
                    </div>

                    <div className="ml-[10px] text-[16px] font-[400]">
                      Tipp: {tipObject.description}
                    </div>
                  </div>
                </div>
                <div className="ml-auto">
                  <span
                    className={`font-icomoon justify-center text-xl  ${
                      tipObject.result === null
                        ? "icon-schedule text-white"
                        : tipObject.result === "win"
                        ? "icon-success text-green"
                        : tipObject.result === "push"
                        ? "icon-disturb text-neon"
                        : "icon-error text-red"
                    } text-sm mr-2`}
                  ></span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex mt-[30px]">
          <div className="mr-auto">
            <div className="text-[14px] text-rgba-grey-02' font-[500] mb-[9px]">
              Fogadás típusa
            </div>
            <div className="text-[24px] uppercase font-[600]">
              {tip_types.filter(
                (item: any) => selectedTicket.type === item.type
              )[0]?.value ?? "-"}
            </div>
          </div>
          <div className="ml-auto mr-auto">
            <div className="text-[14px] text-rgba-grey-02' font-[500] mb-[9px]">
              {!selectedTicket?.customer_tickets[0]?.bet
                ? "Ajánlott tét"
                : "Megjátszott tét"}
            </div>
            <div className="text-[24px] uppercase font-[600] min-w-[100px]">
              <div>
                {!selectedTicket?.customer_tickets[0]?.bet
                  ? selectedTicket.suggested_bet + " egység"
                  : (selectedTicket?.customer_tickets[0]?.bet)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " Ft"}
              </div>
            </div>
          </div>
          <div className="ml-auto">
            <div className="text-[14px] text-rgba-grey-02' font-[500] mb-[9px]">
              Odds
            </div>
            <div className="text-[24px] uppercase font-[600]">
              {calcOdds(
                selectedTicket?.customer_tickets[0]?.customer_ticket_tips
              )}
            </div>
          </div>
        </div>
        <div className="mt-[28px]">
          <div className="mt-[10px]">
            <Button
              type="submit"
              customClasses="w-full text-white border-none shadow-none	"
              onClick={() => {
                setShowTipModal(false);
              }}
            >
              Bezárás
            </Button>
          </div>
        </div>
      </div>
    );
  };

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
          {selectedTicket.customer_tickets?.length === 0 &&
          moment().isBefore(
            moment(selectedTicket?.start_date).format("YYYY-MM-DD")
          ) ? (
            <TicketForm />
          ) : (
            <TicketView />
          )}
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
        ? "bg-[url('/src/assets/images/ticket-modal/bg-secondary.png')] bg-cover	"
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

        <div className="max-w-[588px] ml-auto mr-auto">
          <div className="bg-[url('/src/assets/images/ticket-modal/szelveny_modal_top2.svg')] w-full relative h-[13px]"></div>
          <div className="px-[24px]  min-h-[640px]  bg-dark-blue relative backdrop-blur-sm">
            <div className="">{children}</div>
          </div>
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default BetModal;
