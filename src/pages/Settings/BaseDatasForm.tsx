// @ts-nocheck
import { ErrorMessage, Formik, getIn, useFormik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { Button, FormInput, PageTitle } from "../../components";
import { useNotification } from "../../hooks/useNotification";
import {
  useGetMyselfQuery,
  useUpdateBaseDatasMutation,
} from "../../redux/CustomerSlice";
import { RootState } from "../../redux/store";
import {
  BaseDatasSchema,
  userSettingsSchema,
} from "./../../utils/validationUtils";

export const BaseDatasForm = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const { isLoading, data, refetch } = useGetMyselfQuery({});
  const { newSuccessToast, newErrorToast } = useNotification({
    theme: "colored",
  });

  const [updateBaseDatas, { isLoading: updateIsLoading, error }] =
    useUpdateBaseDatasMutation();

  if (!data) {
    return <></>;
  }

  return (
    <Formik
      initialValues={{
        fullname: data[0]?.name ?? "",
        username: data[0]?.nickname ?? "",
        email: data[0]?.email ?? "",
      }}
      validationSchema={userSettingsSchema}
      onSubmit={async ({ fullname, username, email }) => {
        updateBaseDatas({
          customer_id: auth.userId,
          name: fullname,
          nickname: username,
        })
          .then((data: any) => {
            if (
              error?.data?.response?.errors[0]?.extensions?.code ===
              "constraint-violation"
            ) {
              newErrorToast(
                "Sikertelen művelet",
                `Ez a felhasználói név már foglalt!`
              );
            } else {
              newSuccessToast(
                "Sikeres művelet",
                `Sikeresen frissítetted adataidat!`
              );
            }

            refetch();
          })
          .catch((err) => {
            newErrorToast(
              "Sikertelen művelet",
              `Adataid frissítése sikertelen volt!`
            );
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
              <PageTitle title="Alap adatok" />
              <div>
                <FormInput
                  name="fullname"
                  label="Teljes név"
                  placeholder="Teljes név"
                  className="my-5 grow"
                  required
                  onChange={handleChange}
                  value={values.fullname}
                />
                <ErrorMessage
                  className="text-red"
                  name="fullname"
                  component="div"
                />
              </div>
              <div className="mt-[30px]">
                <FormInput
                  name="username"
                  label="Felhasználónév"
                  placeholder="Felhasználónév"
                  className="my-5 grow"
                  required
                  onChange={handleChange}
                  value={values.username}
                />
                <ErrorMessage
                  className="text-red"
                  name="username"
                  component="div"
                />
              </div>
              <div className="mt-[30px]">
                <FormInput
                  name="email"
                  label="E-mail cím"
                  placeholder="Email cím"
                  className="my-5 grow"
                  disabled
                  onChange={formik.handleChange}
                  value={values.email}
                />
              </div>
              <div className="mt-[40px]">
                <Button
                  type="submit"
                  primary
                  customClasses="w-full"
                  isLoading={updateIsLoading}
                >
                  Módosítások mentése
                </Button>
              </div>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default BaseDatasForm;
