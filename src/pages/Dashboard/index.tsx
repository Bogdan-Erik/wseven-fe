import React, { useEffect, useState } from 'react';
import { Container } from '../../components';
import { BankrollManagementModal } from '../../components/BankrollManagementModal';


export interface PageProps {

}

export default ({ }: PageProps) => {

  const [showBankrollModal, setShowBankrollModal] = useState(false);
  return (
    <>
      <Container className="container 2xl:mx-auto px-[20px] pt-[30px] max-w-[100%] 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl mx-auto mb-[100px]" padding={false}>
      <div onClick={() => setShowBankrollModal(true)}>Dasboard</div>
      
      </Container>
      <BankrollManagementModal showModal={showBankrollModal} setShowModal={setShowBankrollModal} confirmAction={undefined} />
    </>
  )
}