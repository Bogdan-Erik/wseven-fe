import { useEffect, useState } from 'react';

const useCountdown = (targetDate:any)=> {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown: any) => {
  // calculate time left
  const dayCalc = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const days = dayCalc < 10 ? '0' + dayCalc : dayCalc;

  const hourCalc = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const hours = hourCalc < 10 ? '0' + hourCalc : hourCalc;
 
  const minutesCalc = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const minutes = minutesCalc < 10 ? '0' + minutesCalc : minutesCalc;

  const secondsCalc = Math.floor((countDown % (1000 * 60)) / 1000);
  const seconds = secondsCalc < 10 ? '0' + secondsCalc : secondsCalc;

  return [days, hours, minutes, seconds];
};

export { useCountdown };