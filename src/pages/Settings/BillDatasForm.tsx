import { useFormik } from 'formik';
import React from 'react';
import { Button, FormInput, PageTitle } from '../../components';
import { BillingDatasSchema } from './../../utils/validationUtils'

export const BillDatasForm = () => {

  const formik = useFormik({
    initialValues: {
      country: '',
      zipCode: '',
      city: '',
      street: '',
    },
    validationSchema: BillingDatasSchema,
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
            name="country"
            label="Ország"
            placeholder="Ország"
            className="my-5 grow"
            onChange={formik.handleChange}
            value={formik.values.country}
            error={
              errors.country && touched.country ? errors.country : undefined
            }
          />
        </div>
        <div className=" grid grid-cols-6 gap-[40px]">
          <div className="col-span-2">
            <FormInput
              name="zipCode"
              label="Ir. szám"
              placeholder="Ir. szám"
              className=" grow"
              onChange={formik.handleChange}
              value={formik.values.zipCode}
              error={
                errors.zipCode && touched.zipCode ? errors.zipCode : undefined
              }
            />
          </div>
          <div className=" col-span-4">
            <FormInput
              name="city"
              label="Település"
              placeholder="Település"
              className=" grow"
              onChange={formik.handleChange}
              value={formik.values.city}
              error={
                errors.city && touched.city ? errors.city : undefined
              }
            />
          </div>
        </div>
        <div className="mt-[30px]">
          <FormInput
            name="city"
            label="Utca, házszám"
            placeholder="Utca, házszám"
            className="my-5 grow"
            onChange={formik.handleChange}
            value={formik.values.street}
            error={
              errors.street && touched.street ? errors.street : undefined
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

export default BillDatasForm;