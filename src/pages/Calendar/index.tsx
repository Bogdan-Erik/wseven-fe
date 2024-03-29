// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Container, PageTitle, SmallTitle } from '../../components';
import "@fullcalendar/react/dist/vdom";
import './index.scss';

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import huLocale from '@fullcalendar/core/locales/hu';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { useLazyGetMatchesByDateQuery } from '../../redux/MatchSlice';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export interface PageProps {

}

export default ({ }: PageProps) => {
  const { height, width } = useWindowDimensions();

  const [trigger, result] = useLazyGetMatchesByDateQuery()
  const {calendar} = useSelector((state: RootState) => state.match)
  const auth = useSelector((state: RootState) => state.auth);


  const renderEventContent = (eventInfo: any) => {
    return (
      <div className="p-[6px] relative">
        <div className="flex">
          <div className="text-[12px] font-[700] flex-[1]">{eventInfo.timeText}</div>
          <div className='flex items-right absolute right-[5px] top-[5px]'><img src={eventInfo.event?.extendedProps?.tv?.logo ?? eventInfo.event?.extendedProps?.tv?.name} className="max-h-[30px] max-w-[100px]" /></div>
        </div>
        <div className="text-[12px] font-[600] whitespace	overflow-hidden	">{eventInfo.event.title}</div>
      </div>
    )
  }

  const daysNumber = () => {
    if (width > 1360) {
      return 2;
    } else if (width < 1360 && width > 1023) {
      return 2;
    } else if (width < 1023 && width > 768) {
      return 1;
    } else {
      return 1;
    }
  }
  return (
    <>
      <Container className="container 2xl:mx-auto max-w-[100%] 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl mx-auto" padding>
        <PageTitle title="Naptár" icon="calendar" />
        <div className='relative'>
        <FullCalendar
          plugins={[timeGridPlugin]}
         
          datesSet={(dateInfo) => {
            trigger({ dateFrom: moment(dateInfo.start).subtract(3, 'day').format('YYYY-MM-DD hh:mm:SS'), dateEnd: moment(dateInfo.end).add(3, 'day').format('YYYY-MM-DD hh:mm:SS'), customerId: auth.userId})
        }}
          initialView="timeGridFourDay"
          headerToolbar={{
            start: false, // will normally be on the left. if RTL, will be on the right
            center: '',
            end: 'prev,next' // will normally be on the right. if RTL, will be on the left
          }}
          locale={huLocale}
          duration={{ days: 4 }}
          timeZone={'local'}
          allDaySlot={false}
          slotEventOverlap={false}
          dayHeaderContent={function (arg) {
            //console.log(arg);
            const text = arg.text.split(' ');
            return (
              <><span>{text[0] + ' ' + text[1]}</span> <span className="font-[400] text-white">{text[2]}</span></>
            )
          }}
          height={'auto'}
          views={{
            timeGridFourDay: {
              type: 'timeGrid',
              duration: { days: daysNumber() }
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
          events={calendar}
          eventContent={renderEventContent}

        />
        </div>
      </Container>
    </>
  )
}