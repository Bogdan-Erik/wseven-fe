import { useFormik } from 'formik';
import React from 'react';
import { Button, FormInput, PageTitle } from '../../components';
import { BaseDatasSchema } from './../../utils/validationUtils'

export const BaseDatasForm = () => {

  const formik = useFormik({
    initialValues: {
      fullName: '',
      username: '',
      email: '',
    },
    validationSchema: BaseDatasSchema,
    onSubmit: async (values) => {
      //const { password, firstName, lastName } = values

      console.log('posted');
    },
  })
  const { errors, touched } = formik
  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <PageTitle title="Alap adatok" />
        <div>
          <FormInput
            name="fullName"
            label="Teljes név"
            placeholder="Teljes név"
            className="my-5 grow"
            onChange={formik.handleChange}
            value={formik.values.fullName}
            error={
              errors.fullName && touched.fullName ? errors.fullName : undefined
            }
          />
        </div>
        <div className="mt-[30px]">
          <FormInput
            name="username"
            label="Felhasználónév"
            placeholder="Felhasználónév"
            className="my-5 grow"
            onChange={formik.handleChange}
            value={formik.values.username}
            error={
              errors.username && touched.username ? errors.username : undefined
            }
          />
        </div>

        <div className="mt-[30px]">
          <FormInput
            name="email"
            label="E-mail cím"
            placeholder="Email cím"
            className="my-5 grow"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={
              errors.email && touched.email ? errors.email : undefined
            }
          />
        </div>
        <div className="mt-[40px]">
          <Button type="submit" primary customClasses="w-full">Módosítások mentése</Button>
        </div>
      </div>
    </form>
  )
}

export default BaseDatasForm;