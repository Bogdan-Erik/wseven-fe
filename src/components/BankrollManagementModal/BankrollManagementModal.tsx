import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Icon, Modal, Button } from "../../components";
import "./index.scss";
import { AnimatePresence, motion } from "framer-motion";
import { PlayingTypeSchema } from "../../utils/validationUtils";
import { ErrorMessage, Field, Formik, getIn, useFormik } from "formik";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useAddTipForCustomerMutation } from "../../redux/MatchSlice";
import { useNotification } from "../../hooks/useNotification";
import SelectedImage from "../../assets/images/selected.svg";
import { useUpdateBankrollMutation } from "../../redux/CustomerSlice";

export interface BankrollManagementModalProps {
  showModal: boolean;
  setShowModal: any;
  confirmAction: any;
  isClosable?: boolean
  preselectedValue?: any
}

export interface BankrollItemProps {
  icon: string;
  title: string;
  subTitle: string;
  description: string;
  value: string;
  selected: boolean;
  setFieldValue: any;
  fieldProps: any;
}

export const BankrollManagementModal = ({
  showModal,
  setShowModal,
  confirmAction,
  isClosable = true,
  preselectedValue = '',
}: BankrollManagementModalProps) => {
  const customer = useSelector((state: RootState) => state.customer);
  const auth = useSelector((state: RootState) => state.auth);
  const [addTipForCustomer, { isLoading }] = useAddTipForCustomerMutation();
  const { newSuccessToast, newErrorToast } = useNotification({
    theme: "colored",
  });

  const [selected, setSelected] = useState<any>(preselectedValue);
  const [updateBankroll] = useUpdateBankrollMutation();

  const Box = ({
    icon,
    title,
    subTitle,
    description,
    value,
    selected,
    fieldProps,
    setFieldValue,
  }: BankrollItemProps) => {
    return (
      <motion.div
        animate={{ scale: selected ? 1.05 : 1 }}
        className={`${
          selected ? "active-border" : "inactive"
        } relative cursor-pointer`}
        onClick={() => {
          setSelected(icon);
          setFieldValue("selectedInput", icon);
        }}
      >
        {selected && (
          <div className="absolute z-[1000] top-[-10px] right-[-10px]">
            <img src={SelectedImage} />
          </div>
        )}

        <div className="p-[24px] color-gradient selected rounded-[6px]">
          <div className="text-[20px] font-[500] mb-[12px]">
            <Icon icon={icon} isGradient size="text-[48px]" />
          </div>
          <div className="text-[20px] font-[500] text-rgba-grey-08">
            {title}
          </div>
          <div className="text-[14px] mb-[12px] font-[600]">{subTitle}</div>
          <div className="text-[12px]  text-rgba-grey-08 mr-[12px]">
            {description}
          </div>
          <div className="text-[14px] font-[700] mt-[20px]">{value}</div>
        </div>
        <Field
          type="radio"
          name="selectedInput"
          id={"selectedInput"}
          className="hidden"
          value={icon}
          {...fieldProps}
        />
      </motion.div>
    );
  };
  return (
    <AnimatePresence>
      {showModal && (
        <Modal
          isClosable={isClosable}
          hasBg={false}
          isShowing={setShowModal}
          hide={() => {
            setShowModal(false);
          }}
          modalClasses=" w-[800px]  h-auto"
          title={<>Bankroll management</>}
        >
          <Formik
            initialValues={{
              selectedInput: preselectedValue,
            }}
            validationSchema={PlayingTypeSchema}
            onSubmit={async ({ selectedInput }) => {
                const payload = await updateBankroll({
                  customer_id: auth.userId,
                  playing_type: selectedInput,
                }).then(() => {
                  newSuccessToast('Sikeres beállítás', `Sikeresen beállítottad bankroll managemented!`)
                  setShowModal(false);
                }).catch(() => {
                  newErrorToast(
                    "Sikertelen beállítás",
                    `A bankroll management beállítása sikertelen volt!`
                  );
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
              } = formik;

              return (
                <form onSubmit={handleSubmit}>
                  <div>
                    <div className="text-[16px] font-[500] text-center">
                      Válaszd ki a neked megfelelő bankroll stratégiát!
                    </div>
                    <div className="grid grid-cols-2 gap-[24px] my-[24px]">
                      <Box
                        selected={selected === "fisher"}
                        setFieldValue={setFieldValue}
                        icon={"fisher"}
                        title={"Fisher"}
                        subTitle={"a megfontolt"}
                        description={`
              Inkább türelmes vagy és szereted a nagyobb biztonságot? Ez a stratégia
              több egységre osztja majd a bankodat, így sokkal biztonságosabb,
              viszont a profitod is kevesebb lesz majd.
              `}
                        value={"Egységnyi tét: a bankod 1/100-ad része"}
                        fieldProps={getFieldProps}
                      />
                      <Box
                        fieldProps={getFieldProps}
                        setFieldValue={setFieldValue}
                        selected={selected === "baller"}
                        icon={"baller"}
                        title={"Baller"}
                        subTitle={"a nagypályás"}
                        description={`
              Szeretnél gyorsabban nagyobb kockázatot vállalva játszani? Van lehetőséged utánpótolni a bankod? Akkor a Baller lesz a te fogadási stílusod. Nagyobb tét = nagyobb nyereség
              `}
                        value={"Egységnyi tét: a bankod 1/50-ad része"}
                      />
                    </div>
                    <ErrorMessage
                      className="text-red text-center"
                      name="selectedInput"
                      component="div"
                    />
                    <div className="text-[12px] text-center mt-[24px] mb-[12px]">
                      A beállításokban ezt később bármikor módosíthatod.
                    </div>
                    <div className="text-[16px] font-[500] text-center">
                      <Button type="submit" primary>
                        Mentés
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
