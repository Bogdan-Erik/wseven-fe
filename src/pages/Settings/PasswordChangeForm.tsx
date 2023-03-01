import { Formik, ErrorMessage } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { Button, FormInput, PageTitle } from "../../components";
import { useNotification } from "../../hooks/useNotification";
import { useNewPasswordMutation } from "../../redux/api/authApiSlice";
import {
  useGetMyselfQuery,
  useUpdateBaseDatasMutation,
} from "../../redux/CustomerSlice";
import { RootState } from "../../redux/store";
import {
  BaseDatasSchema,
  userPasswordChangeSchema,
  userSettingsSchema,
} from "./../../utils/validationUtils";

export const PasswordChangeForm = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const { isLoading, data, refetch } = useGetMyselfQuery({});
  const { newSuccessToast, newErrorToast } = useNotification({
    theme: "colored",
  });

  const [newPassword, { isLoading: updateIsLoading }] =
    useNewPasswordMutation();

  if (!data) {
    return <></>;
  }

  return (
    <Formik
      initialValues={{
        password: "",
        passwordRepeat: "",
      }}
      validationSchema={userPasswordChangeSchema}
      onSubmit={async ({ password, passwordRepeat },{resetForm}) => {
        newPassword({
          password: password,
          passwordRepeat: passwordRepeat,
          accessToken: auth.accessToken,
        })
          .then((data: any) => {
            if (data?.data?.status === "success") {
              newSuccessToast(
                "Sikeres művelet",
                `Sikeresen frissítetted jelszavad!`
              );
            } else {
              newErrorToast(
                "Sikertelen művelet",
                `Jelszavad frissítése sikertelen volt!`
              );
            }
            resetForm();
          })
          .catch((err) => {});
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
              <PageTitle title="Jelszó módosítása" />
              <div>
                <FormInput
                  name="password"
                  label="Új jelszó"
                  placeholder="Új jelszó"
                  className="my-5 grow"
                  required
                  type="password"
                  onChange={handleChange}
                  value={values.password}
                />
                <ErrorMessage
                  className="text-red"
                  name="password"
                  component="div"
                />
              </div>
              <div className="mt-[30px]">
                <FormInput
                  name="passwordRepeat"
                  label="Új jelszó mégegyszer"
                  placeholder="Új jelszó mégegyszer"
                  className="my-5 grow"
                  required
                  onChange={handleChange}
                  type="password"
                  value={values.passwordRepeat}
                />
                <ErrorMessage
                  className="text-red"
                  name="passwordRepeat"
                  component="div"
                />
              </div>

              <div className="mt-[40px]">
                <Button type="submit" primary customClasses="w-full">
                  Jelszó módosítása
                </Button>
              </div>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default PasswordChangeForm;
