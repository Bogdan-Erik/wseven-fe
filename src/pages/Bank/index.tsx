// @ts-nocheck
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BankItem, Container, DataPaginator, TransactionRow } from '../../components';
import { TransactionRowProps } from '../../components/TransactionRow/TransactionRow';
import { useGetBankQuery, useLazyGetBalanceQuery } from '../../redux/BankSlice';
import BetModal from './CashModal';


export interface PageProps {

}

export default ({ }: PageProps) => {
  
  const [showTipModal, setShowTipModal] = useState(false);
  const [selectedFunction, setSelectedFunction] = useState(null);
  const bank = useSelector((state: RootState) => state.bank);

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
            <BankItem icon={'money'} title={'Virtuális bank'} amount={bank?.balance} actions={[
              {
                icon: 'arrow_up',
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
                icon: 'arrow_down',
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
            <BankItem icon={'coin'} title={'W7 tokenek'} amount={0} isToken actions={[
              {
                icon: 'arrow_up',
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
          <DataPaginator NoResultComponent={NoResult} Component={TransactionRow} datas={data?.transactions.map((item:any, key: number) => { 
            const transactionType = () => {
              if (["App\\Models\\Upload", "App\\Models\\Out"].includes(item.source_type)) {
                return (<><span className='font-[700]'>Virtuális bank</span> tranzakció</>);
              } else if (item.source_type === "App\\Models\\Tip") {
                return (<><span className='font-[700]'>Fogadás: </span> {item.description}</>);
              } else if (["App\\Models\\CustomerTicket", "App\\Models\\Ticket"].includes(item.source_type)) {
                return (<><span className='font-[700]'>Szelvény: </span> {item.description}</>);
              }
            }

            const itemLabel = () => {
              if (item.source_type === "App\\Models\\Upload") {
                return 'Virtuális egyenleg feltöltés';
              }else if (item.source_type === "App\\Models\\Out") {
                return 'Virtuális egyenleg kifizetés';
              }else if (item.source_type === "App\\Models\\Tip") {
                return 'Tipp művelet';
              } else if (["App\\Models\\CustomerTicket", "App\\Models\\Ticket"].includes(item.source_type)) {
                return 'Szelvény művelet';
              }
            }

            const itemIcon = () => {
              if (["App\\Models\\Upload", "App\\Models\\Out"].includes(item.source_type)) {
                return 'money';
              } else if (["App\\Models\\Tip"].includes(item.source_type)) {
                return 'stat-bordered';
              } else if (["App\\Models\\Ticket", "App\\Models\\CustomerTicket"].includes(item.source_type)) {
                return 'ticket-new';
              } else {
                return 'coin';
              }
            }

            return {
            isSecondary: key % 2 ? true : false,
            isUpload: (item.source_type === "App\\Models\\Upload" || item.amount > 0) ? true : false,
            icon: itemIcon(),
            title: transactionType(),
            label: itemLabel(),
            amount: (Math.round(item.amount)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' Ft',
            date: moment(item.created_at).format('YYYY. MMMM D. HH:mm')
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