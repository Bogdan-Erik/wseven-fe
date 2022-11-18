import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, Container, FormInput, Input, PageTitle, ToggleSwitch } from '../../components';
import { Label } from '../../components/Label';
import { BaseDatasSchema } from './../../utils/validationUtils'
import BaseDatasForm from './BaseDatasForm';
import BillDatasForm from './BillDatasForm';

export interface PageProps {

}

export default ({ }: PageProps) => {

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
    <>
      <Container className="container 2xl:mx-auto max-w-[100%] 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl mx-auto mb-[80px]" padding>
        <div>
          <div className="flex">
            <div><img src={'https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png'} className="rounded-full w-[95px] h-[99px]" /></div>
            <div className="ml-[24px] self-center">
              <div className="text-white text-[14px] font-[600]">Profilkép módosítása</div>
              <div className="text-[12px] text-rgba-grey-06">Kattints ide új profilkép feltöltéséhez</div>
            </div>
          </div>
          <div className="mt-[40px]">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-8 md:gap-[20px] xl:gap-[170px]	">
              <div className="col-span-1  xl:col-span-3">
                <BaseDatasForm />
                <div className="justify-center flex mt-[30px]"><Button customClasses="text-white">Jelszó módosítása</Button></div>
              </div>
              <div className="col-span-1 mt-[40px] md:mt-0  xl:col-span-3">
                <BillDatasForm />
              </div>
            </div>
          </div>

          <div className="mt-[40px] flex flex-col xl:flex-row">
            <div className="flex-[1]">
              <PageTitle title="Email értesítések" />
              <div>
                <ToggleSwitch label='Értesítés új elemzésekről' value={true} name={'notifications[0]'} id={'notifications[0]'} />
              </div>
              <div className="mt-[34px]">
                <ToggleSwitch label='Értesítés új challenge-ről' value={true} name={'notifications[1]'} id={'notifications[2]'} />
              </div>
              <div className="mt-[34px]">
                <ToggleSwitch label='Értesítés megjátszott tipp sikerességéről' value={true} name={'notifications[2]'} id={'notifications[3]'} />
              </div>
              <div className="mt-[34px]">
                <ToggleSwitch label='Értesítés megjátszott tipp sikerességéről' value={false} name={'notifications[3]'} id={'notifications[4]'} />
              </div>
            </div>
            <div className="flex-[1] mt-[40px] xl:mt-0">
              <PageTitle title="Email értesítések" />
              <div>
                <ToggleSwitch label='Értesítés új elemzésekről' value={true} name={'notifications[0]'} id={'notifications[0]'} />
              </div>
              <div className="mt-[34px]">
                <ToggleSwitch label='Értesítés új challenge-ről' value={true} name={'notifications[1]'} id={'notifications[2]'} />
              </div>
              <div className="mt-[34px]">
                <ToggleSwitch label='Értesítés megjátszott tipp sikerességéről' value={true} name={'notifications[2]'} id={'notifications[3]'} />
              </div>
              <div className="mt-[34px]">
                <ToggleSwitch label='Értesítés megjátszott tipp sikerességéről' value={false} name={'notifications[3]'} id={'notifications[4]'} />
              </div>
            </div>
        </div>

        <div className="mt-[40px]">
          <div>
            <PageTitle title="Push értesítések" />
            <div>
              <ToggleSwitch label='Értesítés új elemzésekről' value={true} name={'notifications2[0]'} id={'notifications2[0]'} />
            </div>
            <div className="mt-[34px]">
              <ToggleSwitch label='Értesítés új challenge-ről' value={true} name={'notifications2[1]'} id={'notifications2[2]'} />
            </div>
            <div className="mt-[34px]">
              <ToggleSwitch label='Értesítés megjátszott tipp sikerességéről' value={true} name={'notifications2[2]'} id={'notifications2[3]'} />
            </div>
            <div className="mt-[34px]">
              <ToggleSwitch label='Értesítés megjátszott tipp sikerességéről' value={false} name={'notifications2[3]'} id={'notifications2[4]'} />
            </div>
          </div>
        </div>

      </div>
    </Container>
    </>
  )
}