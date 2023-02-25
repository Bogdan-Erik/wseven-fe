// @ts-nocheck
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { BankItem, Container, DataPaginator, TransactionRow } from '../../components';
import { TransactionRowProps } from '../../components/TransactionRow/TransactionRow';
import { useGetBankQuery, useLazyGetBalanceQuery } from '../../redux/BankSlice';
import BetModal from './CashModal';


export interface PageProps {

}

export default ({ }: PageProps) => {
  
  const [showTipModal, setShowTipModal] = useState(false);
  const [selectedFunction, setSelectedFunction] = useState(null);

  const { isLoading, data, refetch } = useGetBankQuery({});
  const [triggerBalance] = useLazyGetBalanceQuery();

  const NoResult = () => {
    return (<div>Nem található tranzakció!</div>)
  }

  if (!data) {
    return <></>;
  }

  return (
    <>
      <Container className="container 2xl:mx-auto px-[20px] pt-[30px] max-w-[100%] 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl mx-auto mb-[100px]" padding={false}>
        <div className="flex flex-col lg:flex-row gap-[40px]">
          <div className="flex-1">
            <BankItem icon={'money'} title={'Virtuális bank'} amount={data.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' Ft'} actions={[
              {
                icon: 'money',
                title: 'Virtuális egyenleg feltöltés',
                onClick: () => {
                  setSelectedFunction({
                  type: 'upload',
                  title: 'Virtuális egyenleg feltöltés',
                  infoBlock: (<>
                  Töltsd fel virtuális egyenleged, hogy pontosan meg tudjuk határozni az egységnyi téted. <strong>A feltöltés kizárólag virtuális jellegű</strong>. Nem terheljük meg bankkártyádat.
                  </>),
                  inputTitle: 'Feltöltés (Ft)',
                  buttonText: 'Feltöltöm'
                })
                setShowTipModal(true);
              }
              },
              {
                icon: 'money',
                title: 'Virtuális egyenleg kifizetés',
                onClick: () => {
                  setSelectedFunction({
                  type: 'out',
                  title: 'Virtuális egyenleg kifizetés',
                  infoBlock: (<>
                  TAmennyiben kiutaltál fogadói számládról, úgy kérjük távolítsd el azt az összeget innen is, hogy továbbra is pontosan tudjuk meghatározni az egységnyi téted.
                  </>),
                  inputTitle: 'Kifizetés (Ft)',
                  buttonText: 'Kifizetem'
                })
                setShowTipModal(true);
              }
              }
            ]}
            />
          </div>
          <div className="flex-1 relative">
            <div className='w-full h-full absolute flex justify-center items-center z-[2] text-rgba-grey-06 text-[24px]'>Hamarosan...</div>
            <BankItem icon={'coin'} title={'W7 tokenek'} amount={'0 token'} actions={[
              {
                icon: 'money',
                title: 'Token vásárlása',
                onClick: () => console.log('clicked')
              },
            ]}
            extraClass={"opacity-[.2]"}
          />
          </div>
        </div>

        <div>
          <div className="font-[600] text-[20px] mt-[60px] mb-[17px]">Korábbi tranzakciók</div>
          <DataPaginator NoResultComponent={NoResult} Component={TransactionRow} datas={data?.transactions.map((item:any, key: number) => { return {
            isSecondary: key % 2 ? true : false,
            isUpload: item.source_type === "App\\Models\\Upload" ? true : false,
            icon: 'money',
            title: <><span className='font-[700]'>Virtuális bank</span> tranzakció</>,
            label: item.source_type === "App\\Models\\Upload" ? 'Virtuális egyenleg feltöltés' : 'Virtuális egyenleg kifizetés',
            amount: item.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' Ft',
            date: moment(item.created_at).format('YYYY. MMMM DD. HH:mm')
          }})} additionalComponentProps={{ turnOffMore: true }}></DataPaginator>


        </div>
        <BetModal  selectedFunction={selectedFunction} showTipModal={showTipModal} confirmAction={() => {
          refetch();
          triggerBalance();
        }} setShowTipModal={setShowTipModal} />
      </Container>
    </>
  )
}