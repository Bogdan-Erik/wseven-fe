import React, { useEffect, useState } from 'react';
import { BankItem, Container, TransactionRow } from '../../components';
import { TransactionRowProps } from '../../components/TransactionRow/TransactionRow';


export interface PageProps {

}

export default ({ }: PageProps) => {
  const datas = [
    {
      isUpload: true,
      icon: 'money',
      title: <div><span className="font-[500]">Virtuális bank</span> tranzakció</div>,
      label: 'Virtuális egyenleg feltöltés',
      amount: '+30 000 HUF',
      date: '2022. július 23. 13:42',
    },
    {
      isUpload: true,
      icon: 'coin',
      title: <div><span className="font-[500]">Token</span> tranzakció - Elemzés vásárlása (Liverpool - Real Madrid)</div>,
      label: 'Kredit vásárlás',
      amount: '+20 kredit',
      date: '2022. július 23. 13:42',
    },
    {
      isUpload: false,
      icon: 'coin',
      title: <div><span className="font-[500]">Token</span> tranzakció</div>,
      label: 'Kredit költés',
      amount: '-20 kredit',
      date: '2022. július 23. 13:42',
    },
    {
      isUpload: false,
      icon: 'coin',
      title: <div><span className="font-[500]">Virtuális bank</span> tranzakció</div>,
      label: 'Virtuális egyenleg kifizetés',
      amount: '-50 000 HUF',
      date: '2022. július 23. 13:42',
    }
  ]
  return (
    <>
      <Container className="container 2xl:mx-auto px-[20px] pt-[30px] max-w-[100%] 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl mx-auto" padding={false}>
        <div className="flex flex-col lg:flex-row gap-[40px]">
          <div className="flex-1">
            <BankItem icon={'money'} title={'Virtuális bank'} amount={'520 400 HUF'} actions={[
              {
                icon: 'money',
                title: 'Virtuális egyenleg feltöltés',
                onClick: () => console.log('clicked')
              },
              {
                icon: 'money',
                title: 'Virtuális egyenleg kifizetés',
                onClick: () => console.log('clicked')
              }
            ]}
            />
          </div>
          <div className="flex-1">
            <BankItem icon={'coin'} title={'W7 tokenek'} amount={'55 token'} actions={[
              {
                icon: 'money',
                title: 'Token vásárlása',
                onClick: () => console.log('clicked')
              },
            ]}
            />
          </div>
        </div>

        <div>
          <div className="font-[600] text-[20px] mt-[60px] mb-[17px]">Korábbi tranzakciók</div>
          {datas.map((item: TransactionRowProps, key: number)  => {
            return (
              <TransactionRow isSecondary={key % 2 ? true : false} isUpload={item.isUpload} icon={item.icon} title={item.title} label={item.label} amount={item.amount} date={item.date} />
            )
          })}
        </div>
      </Container>
    </>
  )
}