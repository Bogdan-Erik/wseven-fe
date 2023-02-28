// @ts-nocheck

import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Container,
  FormInput,
  Input,
  PageTitle,
  ToggleSwitch,
} from "../../components";
import { Label } from "../../components/Label";
import { useNotification } from "../../hooks/useNotification";
import { usePictureUploadMutation } from "../../redux/api/authApiSlice";
import { RootState } from "../../redux/store";
import { BaseDatasSchema } from "./../../utils/validationUtils";
import BaseDatasForm from "./BaseDatasForm";
import BillDatasForm from "./BillDatasForm";
import { PasswordChangeForm } from "./PasswordChangeForm";
import ReactLoading from 'react-loading';
import { useLazyGetMyselfQuery } from "../../redux/CustomerSlice";
import BankrollForm from "./BankrollForm";

export interface PageProps {}

export default ({}: PageProps) => {
  const auth = useSelector((state: RootState) => state.auth);
  const customer = useSelector((state: RootState) => state.customer);
  const [trigger] = useLazyGetMyselfQuery();
  const [pictureUpload, {isLoading}] = usePictureUploadMutation();
  const { newSuccessToast, newErrorToast } = useNotification({
    theme: "colored",
  });
  const [src, setSrc] = useState<any>(
    customer.image
  );
  const [file, setFile] = useState<any>(null);

  useEffect(() => {
    setSrc(customer.image)
  }, [customer.image])
  const uploadImage = (e:any) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
    };
    reader.readAsDataURL(file);


    const formData = new FormData();
    formData.append('image', file);
    formData.append('accessToken', auth.accessToken);

    pictureUpload(formData)
    .then((data:any) => {
      newSuccessToast(
        "Sikeres képfeltöltés",
        `Sikeresen feltöltötted profilképed!`
      );
      trigger({});
    })
    .catch((e:any) => {
      newErrorToast(
        "Sikertelen képfeltöltés",
        `A kép mérete túl nagy! Próbálj meg kisebb fájlt feltölteni!`
      );
    })
  };
  return (
    <>
      <Container
        className="container 2xl:mx-auto max-w-[100%] 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl mx-auto mb-[80px]"
        padding
      >
        <div>
          <div className="flex">
            <div className="relative">

              <input id="file-upload" className="hidden" type="file" onChange={uploadImage} />

              <label className="cursor-pointer relative" htmlFor="file-upload" >
                {(isLoading || !src) && (<div className="w-[95px] h-[99px] rounded-full bg-black opacity-[.8] absolute flex justify-center items-center">
                <ReactLoading type={'spin'} color={'#ffffff'} height={40} width={40} />
                </div>)}
                <img
                src={src}
                className="object-cover rounded-full w-[95px] h-[99px] cursor-pointer object-center"
              /></label>
            </div>
            <div className="ml-[24px] self-center">
              <div className="text-white text-[14px] font-[600]">
              <label className="cursor-pointer" htmlFor="file-upload" >Profilkép módosítása</label>
              </div>
              <div className="text-[12px] text-rgba-grey-06" >
                <label className="cursor-pointer" htmlFor="file-upload" >Kattints ide új profilkép feltöltéséhez</label>
              </div>
            </div>
          </div>
          <div className="mt-[40px]">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-8 md:gap-[20px] xl:gap-[170px]	">
              <div className="col-span-1  xl:col-span-3">
                <div><BaseDatasForm /></div>
                <div className="mt-[80px]">
                  <BankrollForm />
                </div>
                {/*<div className="justify-center flex mt-[30px]">
                  <Button customClasses="text-white">Jelszó módosítása</Button>
  </div>*/}
              </div>
              <div className="col-span-1 mt-[40px] md:mt-0  xl:col-span-3">
                {/*<BillDatasForm />*/}
                <PasswordChangeForm />
              </div>
            </div>
          </div>

          {/*<div className="mt-[40px] flex flex-col xl:flex-row">
            <div className="flex-[1]">
              <PageTitle title="Email értesítések" />
              <div>
                <ToggleSwitch
                  label="Értesítés új elemzésekről"
                  value={true}
                  name={"notifications[0]"}
                  id={"notifications[0]"}
                />
              </div>
              <div className="mt-[34px]">
                <ToggleSwitch
                  label="Értesítés új challenge-ről"
                  value={true}
                  name={"notifications[1]"}
                  id={"notifications[2]"}
                />
              </div>
              <div className="mt-[34px]">
                <ToggleSwitch
                  label="Értesítés megjátszott tipp sikerességéről"
                  value={true}
                  name={"notifications[2]"}
                  id={"notifications[3]"}
                />
              </div>
              <div className="mt-[34px]">
                <ToggleSwitch
                  label="Értesítés megjátszott tipp sikerességéről"
                  value={false}
                  name={"notifications[3]"}
                  id={"notifications[4]"}
                />
              </div>
            </div>
            <div className="flex-[1] mt-[40px] xl:mt-0">
              <PageTitle title="Email értesítések" />
              <div>
                <ToggleSwitch
                  label="Értesítés új elemzésekről"
                  value={true}
                  name={"notifications[0]"}
                  id={"notifications[0]"}
                />
              </div>
              <div className="mt-[34px]">
                <ToggleSwitch
                  label="Értesítés új challenge-ről"
                  value={true}
                  name={"notifications[1]"}
                  id={"notifications[2]"}
                />
              </div>
              <div className="mt-[34px]">
                <ToggleSwitch
                  label="Értesítés megjátszott tipp sikerességéről"
                  value={true}
                  name={"notifications[2]"}
                  id={"notifications[3]"}
                />
              </div>
              <div className="mt-[34px]">
                <ToggleSwitch
                  label="Értesítés megjátszott tipp sikerességéről"
                  value={false}
                  name={"notifications[3]"}
                  id={"notifications[4]"}
                />
              </div>
            </div>
          </div>*/}

          {/*<div className="mt-[40px]">
            <div>
              <PageTitle title="Push értesítések" />
              <div>
                <ToggleSwitch
                  label="Értesítés új elemzésekről"
                  value={true}
                  name={"notifications2[0]"}
                  id={"notifications2[0]"}
                />
              </div>
              <div className="mt-[34px]">
                <ToggleSwitch
                  label="Értesítés új challenge-ről"
                  value={true}
                  name={"notifications2[1]"}
                  id={"notifications2[2]"}
                />
              </div>
              <div className="mt-[34px]">
                <ToggleSwitch
                  label="Értesítés megjátszott tipp sikerességéről"
                  value={true}
                  name={"notifications2[2]"}
                  id={"notifications2[3]"}
                />
              </div>
              <div className="mt-[34px]">
                <ToggleSwitch
                  label="Értesítés megjátszott tipp sikerességéről"
                  value={false}
                  name={"notifications2[3]"}
                  id={"notifications2[4]"}
                />
              </div>
            </div>
        </div>*/}
        </div>
      </Container>
    </>
  );
};
