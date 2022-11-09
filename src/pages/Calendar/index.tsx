// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Container, PageTitle, SmallTitle } from '../../components';
import "@fullcalendar/react/dist/vdom";
import './index.scss';

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import huLocale from '@fullcalendar/core/locales/hu';

export interface PageProps {

}

export default ({ }: PageProps) => {

  const dataSet = [
    {
      title: 'Liverpool - Real Madrid', start: '2022-11-09 08:00:00', end: '2022-11-09 09:30:00', className: ["event", "football"], extendedProps: {
        tv: 'M4'
      }
    },
    {
      title: 'Rafael Nadal - Novak Djokovic', start: '2022-11-09 12:00:00', end: '2022-11-09 13:30:00', className: ["event", "tennis"], extendedProps: {
        tv: 'Spiler'
      }
    },
    { title: 'Liverpool - Real Madrid', start: '2022-11-10 10:00:00', end: '2022-11-10 11:30:00', className: ["event", "football"] },
    { title: 'Rafael Nadal - Novak Djokovic', start: '2022-11-10 10:00:00', end: '2022-11-10 12:00:00', className: ["event", "tennis"] },
    { title: 'Liverpool - Real Madrid', start: '2022-11-11 08:00:00', end: '2022-11-11 09:30:00', className: ["event", "football"] },
    { title: 'Rafael Nadal - Novak Djokovic', start: '2022-11-11 12:00:00', end: '2022-11-11 13:30:00', className: ["event", "tennis"] },
    { title: 'Liverpool - Real Madrid', start: '2022-11-12 13:00:00', end: '2022-11-12 14:30:00', className: ["event", "football"] },

  ];

  const renderEventContent = (eventInfo: any) => {
    return (
      <div className="p-[6px]">
        <div className="flex">
          <div className="text-[12px] font-[700] flex-[1]">{eventInfo.timeText}</div>
          <div>{eventInfo.event?.extendedProps?.tv}</div>
        </div>
        <div className="text-[12px] font-[600] whitespace-nowrap	overflow-hidden	">{eventInfo.event.title}</div>
      </div>
    )
  }
  return (
    <>
      <Container className="container 2xl:mx-auto max-w-[100%] 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl mx-auto" padding>
        <PageTitle title="Naptár" icon="calendar" />
        <FullCalendar
          plugins={[timeGridPlugin]}
          initialView="timeGridFourDay"
          headerToolbar={false}
          locale={huLocale}
          duration={{ days: 4 }}
          timeZone={'local'}
          allDaySlot={false}
          slotEventOverlap={false}
          dayHeaderContent={function (arg) {
            console.log(arg);
            const text = arg.text.split(' ');
            return (
              <><span>{text[0] + ' ' + text[1]}</span> <span className="font-[400] text-white">{text[2]}</span></>
            )
          }}
          height={'auto'}
          views={{
            timeGridFourDay: {
              type: 'timeGrid',
              duration: { days: 4 }
            }
          }}
          slotLabelFormat={{
            hour: 'numeric',
            minute: '2-digit',
            omitZeroMinute: false,
            meridiem: 'short'
          }}
          dayHeaderFormat={{ weekday: 'long', month: 'long', day: 'numeric', omitCommas: true }}
          scrollTime={'05:00:00'}
          events={dataSet}
          eventContent={renderEventContent}

        />
      </Container>
    </>
  )
}