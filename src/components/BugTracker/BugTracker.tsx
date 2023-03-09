import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import "./BugTracker.scss";
import { motion } from "framer-motion";
import { Button, FormInput, Modal } from "../";
import { ErrorMessage, Formik } from "formik";
import { BetSchema, BugReportSchema } from "../../utils/validationUtils";
import { Label } from "../Label";
import { useInsertBugReportMutation } from "../../redux/BugReportSlice";
import { useNotification } from "../../hooks/useNotification";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export interface BugTrackerProps {}

export const BugTracker = ({}: BugTrackerProps): JSX.Element => {
  const [showFull, setShowFull] = useState(false);
  const [showBugModal, setShowBugModal] = useState(false);
  const auth = useSelector((state: RootState) => state.auth)

  const [insertBugReport, { isLoading }] = useInsertBugReportMutation();
  const { newSuccessToast, newErrorToast } = useNotification({
    theme: 'colored',
  })


  return (
    <div className="bugtracker">
      <motion.div
        onClick={() => setShowBugModal(true)}
        className="tracker-btn fixed right-[-30px] bottom-[74px] md:bottom-[24px] h-[50px] rounded-lg pl-[18px] pr-[40px] cursor-pointer z-[1000]"
        onMouseOver={() => setShowFull(true)}
        onMouseLeave={() => setShowFull(false)}
      >
        <FontAwesomeIcon icon={faBug} className="text-md " />{" "}
        {showFull && <span className="ml-[10px]">Hiba jelentése</span>}
      </motion.div>

      {showBugModal && (
        <Modal
          hasBg={false}
          isShowing={showBugModal}
          isClosable={true}
          hide={() => {
            setShowBugModal(false);
          }}
          modalClasses=" w-[800px]  h-auto max-h-full overflow-auto"
          title={<>Hibajelentés küldése</>}
        >
          <div>
            <div className="text-rgba-grey-08 text-[14px]">
              Kérjük fejtsd ki nekünk, hogy hol és hogyan találkoztál a
              hibajelenséggel, illetve mi volt az?
            </div>
            <div>
              <Formik
                initialValues={{
                  title: '',
                  text: '',
                
                }}
                validationSchema={BugReportSchema}
                onSubmit={async ({ title, text }) => {
                  insertBugReport({
                    customerId: auth.userId,
                    title: title,
                    text: text,
                  }).then(data => {
                    setShowBugModal(false);
                    newSuccessToast('Sikeres rögzítés', `Köszönjük szépen a jelentést, hamarosan feldolgozzuk!`)
                  }).catch(err => {
                    setShowBugModal(false);
                    newErrorToast('Sikertelen rögzítés', `A hiba jelentése sikertelen volt! Kérjük ismételd meg később!`)
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
                      <div className="flex flex-col gap-[0px]">
                      <div className='flex-1'>
                            <FormInput
                              name="title"
                              label="Cím"
                              type="text"
                              placeholder=""
                              onChange={handleChange}
                              value={values.title}
                              required
                            />
                          </div>
                          <div className='flex-1'>
                          <div className="mb-[5px]"><Label required={true}>Leírás</Label></div>
                          <textarea
                              name="text"
                              placeholder=""
                              onChange={handleChange}
                              value={values.text}
                              className="w-full   placeholder-light-white
                              border-2 border-transparent grey-linear-gradient
                              leading-[18px] px-3.5 py-3 rounded-md outline-none 
                              text-white
                              w-full 
                              focus:border-2 focus:border-gray-500  focus:shadow-input focus:border-light-grey"
                            />
                          </div>
                      </div>
                      <div className='flex-1 flex flex-col justify-end mt-[30px]'>
                        <ErrorMessage className="text-red" name="title" component="div"/>
                        <ErrorMessage className="text-red" name="text" component="div"/>
                        <Button isLoading={isLoading} disabled={isLoading} type="submit" primary size='small' customClasses='w-full' >Hiba beküldése</Button>
                      </div>
                    </form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
