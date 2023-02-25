// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Modal, FormInput, Button } from "../../components";
import "./index.scss";
import { AnimatePresence, motion } from "framer-motion";
import { UploadSchema } from "../../utils/validationUtils";
import { Formik, getIn, useFormik } from "formik";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useNotification } from "../../hooks/useNotification";
import {
  useLazyGetBalanceQuery,
  useUploadBankMutation,
} from "../../redux/BankSlice";
import moment from "moment";

export interface BetModalProps {
  showTipModal: boolean;
  setShowTipModal: any;
  selectedFunction: any;
  confirmAction: any;
}

const BetModal = ({
  selectedFunction,
  showTipModal,
  setShowTipModal,
  confirmAction,
}: BetModalProps) => {
  const customer = useSelector((state: RootState) => state.customer);
  const auth = useSelector((state: RootState) => state.auth);
  const [uploadBank, { isLoading }] = useUploadBankMutation();
  const { newSuccessToast, newErrorToast } = useNotification({
    theme: "colored",
  });
  const [triggerBalance] = useLazyGetBalanceQuery();

  return (
    <AnimatePresence>
      {showTipModal && (
        <Modal
          hasBg={false}
          isShowing={showTipModal}
          hide={() => {
            setShowTipModal(false);
          }}
          modalClasses=" w-[580px]  h-auto"
          title={
            <div className="text-[20px] font-[500]">
              {selectedFunction.title}
            </div>
          }
        >
          <Formik
            initialValues={{
              amount: 0,
            }}
            validationSchema={UploadSchema}
            onSubmit={async ({ amount }) => {
              if (selectedFunction.type !== "upload") {
                await triggerBalance().then((data) => {
                  console.log(data.data);
                  if (data?.data?.current_balance < amount) {
                    setShowTipModal(false);
                    newErrorToast(
                      "Sikertelen rögzítés",
                      `A kifizetett osszeg magasabb mint a bankod. Ismételd meg megfelelő összeggel`
                    );
                    return;
                  } else {
                    uploadBank({
                      customerId: auth.userId,
                      amount:
                        selectedFunction.type === "upload" ? amount : -amount,
                      sourceId: "40e6215d-b5c6-4896-987c-f30f3678f608",
                      sourceType:
                        selectedFunction.type === "upload"
                          ? "App\\Models\\Upload"
                          : "App\\Models\\Out",
                      description:
                        selectedFunction.type === "upload"
                          ? "Virtuális egyenleg feltöltés"
                          : "Virtuális egyenleg kifizetés",
                      createdAt: moment().utcOffset(0, true).format(),
                    })
                      .then((data) => {
                        confirmAction();
                        setShowTipModal(false);
                        newSuccessToast(
                          selectedFunction.type === "upload"
                            ? "Sikeres feltöltés"
                            : "Sikeres kifizetés",
                          selectedFunction.type === "upload"
                            ? "Sikeresen feltöltötted virtuális egyenleged!"
                            : "Sikeresen kifizetted virutális egyenleged!"
                        );
                      })
                      .catch((err) => {
                        setShowTipModal(false);
                        newErrorToast(
                          "Sikertelen rögzítés",
                          `A művelet rögzítése sikertelen volt!`
                        );
                      });
                  }
                });
              } else {
                uploadBank({
                  customerId: auth.userId,
                  amount: selectedFunction.type === "upload" ? amount : -amount,
                  sourceId: "40e6215d-b5c6-4896-987c-f30f3678f608",
                  sourceType:
                    selectedFunction.type === "upload"
                      ? "App\\Models\\Upload"
                      : "App\\Models\\Out",
                  description:
                    selectedFunction.type === "upload"
                      ? "Virtuális egyenleg feltöltés"
                      : "Virtuális egyenleg kifizetés",
                  createdAt: moment().utcOffset(0, true).format(),
                })
                  .then((data) => {
                    confirmAction();
                    setShowTipModal(false);
                    newSuccessToast(
                      selectedFunction.type === "upload"
                        ? "Sikeres feltöltés"
                        : "Sikeres kifizetés",
                      selectedFunction.type === "upload"
                        ? "Sikeresen feltöltötted virtuális egyenleged!"
                        : "Sikeresen kifizetted virutális egyenleged!"
                    );
                  })
                  .catch((err) => {
                    setShowTipModal(false);
                    newErrorToast(
                      "Sikertelen rögzítés",
                      `A művelet rögzítése sikertelen volt!`
                    );
                  });
              }
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
                  <div className="flex flex-col gap-[24px]">
                    <div className="text-[14px]">
                      {selectedFunction.infoBlock}
                    </div>
                    <div>
                      <div className="flex-1">
                        <FormInput
                          name="amount"
                          label={selectedFunction.inputTitle}
                          type="number"
                          placeholder=""
                          className="grow"
                          onChange={handleChange}
                          value={values.amount}
                          min={"0"}
                          step={"0.1"}
                          error={
                            getIn(touched, "amount") &&
                            getIn(errors, "caamountsh")
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <Button
                        isLoading={isLoading}
                        disabled={isLoading}
                        type="submit"
                        primary
                        size="small"
                        customClasses="w-full"
                      >
                        {selectedFunction.buttonText}
                      </Button>
                    </div>
                  </div>
                </form>
              );
            }}
          </Formik>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default BetModal;
