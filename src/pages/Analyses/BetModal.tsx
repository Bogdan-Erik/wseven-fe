// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Icon, Modal, PlayersGame, FormInput, Button } from '../../components';
import './index.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { BetSchema } from '../../utils/validationUtils';
import { ErrorMessage, Formik, getIn, useFormik } from 'formik';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { useAddTipForCustomerMutation } from '../../redux/MatchSlice';
import { useNotification } from '../../hooks/useNotification'
import { useLazyGetBalanceQuery } from '../../redux/BankSlice';
import BetHelper from '../../utils/BetHelper';

export interface BetModalProps {
  showTipModal: boolean
  setShowTipModal: any
  selectedBet: any
  confirmAction: any
}

const BetModal = ({ selectedBet, showTipModal, setShowTipModal, confirmAction }: BetModalProps) => {
  const customer = useSelector((state: RootState) => state.customer)
  const auth = useSelector((state: RootState) => state.auth)
  const bank = useSelector((state: RootState) => state.bank)
  const [addTipForCustomer, { isLoading }] = useAddTipForCustomerMutation();
  const { newSuccessToast, newErrorToast } = useNotification({
    theme: 'colored',
  })
  const [triggerBalance] = useLazyGetBalanceQuery();


  return (
    <AnimatePresence>
      {showTipModal && (
        <Modal hasBg={false} isShowing={showTipModal} hide={() => { setShowTipModal(false) }} modalClasses=" w-[800px]  h-auto"
          title={<>
            {selectedBet.name}
          </>}>
          <Formik
            initialValues={{
              odds: selectedBet.odds ?? 0,
              bet: BetHelper(customer?.playingType ?? '', bank?.balance ?? 0, selectedBet.tet ?? 0),
            }}
            validationSchema={BetSchema}
            onSubmit={async ({ odds, bet }) => {
              await triggerBalance().then((data) => {
                if ((data?.data?.current_balance ?? 0) < bet) {
                  setShowTipModal(false);
                  newErrorToast(
                    "Sikertelen rögzítés",
                    `A megjátszani kívánt tét magasabb mint a bankod! Ismételd meg megfelelő összeggel!`
                  );
                  return;
                } else {
                  addTipForCustomer({
                    customerId: auth.userId,
                    tipId: selectedBet.id,
                    description: selectedBet.name + ' fogadás rögzítése',
                    sourceType: "App\\Models\\Tip",
                    odds,
                    bet
                  }).then(data => {
                    confirmAction();
                    setShowTipModal(false);
                    newSuccessToast('Sikeres rögzítés', `A ${selectedBet.name} fogadás rögzítése sikeres volt!`)
                    triggerBalance();
                  }).catch(err => {
                    setShowTipModal(false);
                    newErrorToast('Sikertelen rögzítés', `A ${selectedBet.name} fogadás rögzítése sikertelen volt!`)
                  })
                }
              })

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
              } = formik

              return (
                <form onSubmit={handleSubmit}>
                  <div className='flex flex-col md:flex-row gap-[24px]'>
                    <div className='left-side flex-1 flex flex-col'>
                      <div className='flex flex-col flex-[4]'>
                        <div className="left-side flex flex-col md:flex-row ">
                          <div className="flex md:mr-[30px]  xl:mt-0 ">
                            <div className="text-[14px] text-rgba-grey-06">Erősség:</div>
                            <div className="ml-[6px]">
                              {[...Array(selectedBet.rating)].map(() => {
                                return <Icon icon='full_star' size={'text-xl'} isGradient />
                              })}

                              {[...Array(3 - selectedBet.rating)].map(() => {
                                return <Icon icon='empty_star' size={'text-xl'} color={'#999999'} />
                              })}

                            </div>
                          </div>
                          <div className="text-[14px]  text-rgba-grey-06">Ajánlott tét: <strong className="text-white">{(BetHelper(customer?.playingType ?? '', bank?.balance ?? 0, selectedBet.tet ?? 0) + ' Ft').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</strong></div>
                        </div>
                        <div className='flex gap-[24px] flex-1 items-center'>
                          <div className='flex-1'>
                            <FormInput
                              name="odds"
                              label="Odds"
                              type="number"
                              placeholder=""
                              className=" grow"
                              onChange={handleChange}
                              value={values.odds}
                              min={1}
                              step="any"
                              subStep={0.1}
                            />
                          </div>
                          <div className='flex-1'>
                            <FormInput
                              name="bet"
                              label="Tét (Ft)"
                              type="number"
                              placeholder=""
                              className=" grow"
                              onChange={handleChange}
                              value={values.bet}
                              step="any"
                              subStep={100}
                              min={1}
                              pattern="([0-9]+.{0,1}[0-9]*,{0,1})*[0-9]"
                            />
                          </div>
                        </div>
                      </div>
                      <div className='flex-1 flex flex-col justify-end'>
                        <ErrorMessage className="text-red" name="tet" component="div"/>
                        <ErrorMessage className="text-red" name="odds" component="div"/>
                        <Button isLoading={isLoading} disabled={isLoading} type="submit" primary size='small' customClasses='w-full' >Megjátszottam</Button>
                      </div>
                    </div>
                    <div className='right-side flex-1 flex items-end'>
                      {/*<div className='mb-[43px]'>
                      <PlayersGame players={[{ image: "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png" }, { image: "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png" }, { image: "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png" }, { image: "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png" }, { image: "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png" }, { image: "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png" }, { image: "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png" }, { image: "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png" }, { image: "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png" }, { image: "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png" }]} />
                          </div>*/}
                      <div className='text-[14px]'>
                        <p>
                          Amennyiben megjátszottad ezt a tippet, akkor kattints a megjátszottam gombra és a mérkőzés bekerül a személyre szabott statisztikádba. Az ajánlott téten lehetőleg ne változtass, de amennyiben más oddson tudtad megtenni a tippet, akkor állítsd át egyszerűen.
                        </p>
                        <p className="mt-[10px] text-rgba-grey-06">
                          Kérjük fogadásodat pontosan mentsd el, mert később már nem tudsz rajta változtatni, mely befolyásolhatja a statisztikai adataid!
                        </p>
                      </div>

                    </div>
                  </div>
                </form>

              )
            }}

          </Formik>
        </Modal>
      )}
    </AnimatePresence>
  )
}

export default BetModal;