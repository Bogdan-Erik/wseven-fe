import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, FormInput, Icon, PageTitle } from "../../components";
import { BankrollManagementModal } from "../../components/BankrollManagementModal";
import { useNotification } from "../../hooks/useNotification";
import {
  useGetMyselfQuery,
  useUpdateBaseDatasMutation,
} from "../../redux/CustomerSlice";
import { RootState } from "../../redux/store";

export const BankrollForm = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const customer = useSelector((state: RootState) => state.customer);
  const { isLoading, data, refetch } = useGetMyselfQuery({});
  const { newSuccessToast, newErrorToast } = useNotification({
    theme: "colored",
  });
  const [showBankrollModal, setShowBankrollModal] = useState(false);

  const [updateBaseDatas, { isLoading: updateIsLoading, error }] =
    useUpdateBaseDatasMutation();

  if (!data) {
    return <></>;
  }

  return (
    <div>
      <PageTitle title="Bankroll management" />
      <div>
        <div className="bg-gradient-to-br rounded-[6px] from-rgba-grey-02 to-rgba-grey-01 w-full px-[24px] py-[14px] cursor-pointer" onClick={() => {setShowBankrollModal(true)}}>
          {customer.playingType ? (
            <div className="flex">
              <div className="flex items-center mr-[22px]">
                <Icon
                  icon={customer.playingType}
                  isGradient
                  size="text-[32px]"
                />
              </div>
              <div className="flex flex-col ">
                <div className="text-[20px] text-[500]">
                  {customer.playingType === "fisher" ? "Fisher" : "Baller"}
                </div>
                <div className="text-[14px] text-[600]">
                  {customer.playingType === "fisher"
                    ? "a megfontolt"
                    : "a nagypályás"}
                </div>
              </div>
              <div className="ml-auto flex items-center">
                <Icon icon="pencil" size="text-[16px]" />
              </div>
            </div>
          ) : (
            <div className="flex">
              <div className="flex items-center mr-[22px]">
                Jelenleg nincs kiválasztva Bankroll Management!
              </div>

              <div className="ml-auto flex items-center">
                <Icon icon="pencil" size="text-[16px]" />
              </div>
            </div>
          )}
        </div>
        {customer.playingType && (<div className="text-[14px] text-rgba-grey-08 font-[500] mt-[14px]">
            {customer.playingType === 'fisher' ? 'Egységnyi tét: a bankod 1/100-ad része' : 'Egységnyi tét: a bankod 1/50-ed része'}
        </div>)}
      </div>
      <BankrollManagementModal showModal={showBankrollModal} setShowModal={setShowBankrollModal} confirmAction={undefined} isClosable={true} preselectedValue={customer.playingType ?? ''}/>
    </div>
  );
};

export default BankrollForm;
