import { Formik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  FormInput,
  Icon,
  PageTitle,
  ToggleSwitch,
} from "../../components";
import { BankrollManagementModal } from "../../components/BankrollManagementModal";
import { useNotification } from "../../hooks/useNotification";
import {
  useGetMyselfQuery,
  useUpdateNotificationsMutation,
} from "../../redux/CustomerSlice";
import { RootState } from "../../redux/store";

export const NotificationForm = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const customer = useSelector((state: RootState) => state.customer);
  const { isLoading, data, refetch } = useGetMyselfQuery({});
  const { newSuccessToast, newErrorToast } = useNotification({
    theme: "colored",
  });

  const [updateNotifications, { isLoading: updateIsLoading, error }] =
  useUpdateNotificationsMutation();


  if (!data) {
    return <></>;
  }

  return (
    <Formik
      initialValues={{
        email_notifications: true,
        ...customer.settings
      }}
      // validationSchema={userSettingsSchema}
      onSubmit={async ({ email_notifications }) => {
        const form = 
            {
                email_notifications,
            };
        
        updateNotifications({customer_id: auth.userId, settings: form})
      }}
    >
      {(formik) => {
        const {
          values,
          handleChange,
          handleSubmit,
          isValid,
          dirty,
        } = formik;

        return (
          <form onSubmit={handleSubmit}>
            <div className="mt-[40px] flex flex-col xl:flex-row">
              <div className="flex-[1]">
                <PageTitle title="Email értesítések" />
                <div>
                  <ToggleSwitch
                    label="Kérek e-mail értesítéseket"
                    value={values.email_notifications}
                    name={"email_notifications"}
                    id={"email_notifications"}
                    onChange={(e:any) => {
                        handleChange(e);
                        setTimeout(handleSubmit, 0);
                    }}
                  />
                </div>
              </div>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default NotificationForm;
