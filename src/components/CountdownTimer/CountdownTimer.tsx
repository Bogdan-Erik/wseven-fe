import React from 'react'
import './CountdownTimer.css';
import { useCountdown } from './../../hooks/useCountdown';

export interface CountdownTimerProps {

}

const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span>Vége a mérkőzésnek!</span>
    </div>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds } : {days: any, hours: any, minutes: any, seconds: any}) => {
  return (
    <div className="show-counter">
      <div
        className="countdown-holder"
      >
        <DateTimeDisplay value={days} type={'nap'} isDanger={false} />
        <p className="separator">:</p>
        <DateTimeDisplay value={hours} type={'óra'} isDanger={false} />
        <p className="separator">:</p>
        <DateTimeDisplay value={minutes} type={'perc'} isDanger={false} />
        <p className="separator">:</p>
        <DateTimeDisplay value={seconds} type={'mp'} isDanger={false} />
      </div>
    </div>
  );
};

const DateTimeDisplay = ({ value, type, isDanger } : {value: string, type: string, isDanger: boolean}) => {
  return (
    <div className={isDanger ? 'countdown danger' : 'countdown'}>
      <p>{value}</p>
      <span>{type}</span>
    </div>
  );
};


export const CountdownTimer = ({ targetDate }: {targetDate: any}) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
// @ts-ignore 
  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};
