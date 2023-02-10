import React, { useEffect, useState } from 'react';
import { Button, Container, FormInput } from '../../../components';
import Hand from './../../../assets/images/auth/hand.png'
import { Formik, useFormik } from 'formik';
import { LoginDataSchema } from './../../../utils/validationUtils'
import { useLoginMutation } from './../../../redux/api/authApiSlice'
import { setCredentials } from './../../../redux/authSlice';
import { useAppDispatch } from './../../../redux/store';
import { useNavigate } from 'react-router';

export interface PageProps {

}

interface LoginError {
  data: {
    message: string
  }
  status: string
}

export default ({ }: PageProps) => {
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate();

  const [login, { isLoading, isError }] = useLoginMutation()
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginDataSchema,
    onSubmit: async ({ email, password }) => {
      try {
        const { data: userData } = await login({ email, password }).unwrap()
        dispatch(setCredentials({ ...userData, userId: userData.customer.id }))
        return navigate('/dashboard');
      } catch (err) {
        if (!(err as LoginError)?.status) {
          setErrorMessage('No Server Response')
        } else {
          setErrorMessage((err as LoginError).data?.message)
        }
      }
    },
  })
  const { errors, touched } = formik

  return (
    <>
      <Container className="container 2xl:mx-auto max-w-[100%] 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl mx-auto mb-[80px]" padding>
        <div className="grid grid-cols-12 mt-[80px]">
          <div className="col-span-12 md:col-start-2 md:col-span-8 lg:col-start-2 lg:col-span-4 text-white">

            <div>
              <div className="text-[32px] font-[700] flex"><img src={Hand} /> <span className="flex self-center ml-[20px]">Üdv újra nálunk!</span></div>
              <div className="text-[16px] text-rgba-grey-08 font-[500] mt-[20px]">Jelentkezz be a legfrissebb elemzések és tippek megtekintéséhez! Még nincs fiókod? </div>
              <div className="py-[40px] border-b-[1px] border-b-rgba-grey-02">Social </div>
              <div>
                <Formik
                  initialValues={
                    {
                      email: '',
                      password: '',
                    }
                  }
                  validationSchema={LoginDataSchema}
                  onSubmit={async ({ email, password }) => {
                    try {
                      const { data: userData } = await login({ email, password }).unwrap()
                      dispatch(setCredentials({ ...userData, userId: userData.customer.id }))
                      return navigate('/dashboard');
                    } catch (err) {
                      if (!(err as LoginError)?.status) {
                        setErrorMessage('No Server Response')
                      } else {
                        setErrorMessage((err as LoginError).data?.message)
                      }
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
                    } = formik

                    return (
                      <form onSubmit={handleSubmit}>
                        <div>
                          <FormInput
                            name="email"
                            type="email"
                            label="E-mail cím"
                            placeholder="Add meg az e-mail címed"
                            className="my-5 grow"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            error={
                              errors.email && touched.email ? errors.email : undefined
                            }
                          />
                        </div>
                        <div className="col-span-2">
                          <FormInput
                            name="password"
                            label="Jelszó"
                            type="password"
                            placeholder="Add meg a jelszavad"
                            className=" grow"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            error={
                              errors.password && touched.password ? errors.password : undefined
                            }
                          />
                        </div>
                        {isError ? <div className="mb-6 text-red">{errorMessage}</div> : null}
                        <div className="mt-[40px]">
                          <Button type="submit" primary customClasses="w-full" isLoading={isLoading}>Bejelentkezés</Button>
                        </div>
                      </form>
                    )
                  }}

                </Formik>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}