// @ts-nocheck
import React, { useEffect, useState } from 'react'
import './NotificationItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

export interface NotificationItemProps {
  title: string
  content: string
  date: string
  onClick?: any
  removeAction?: any
  seenProp: boolean
}

export const NotificationItem = ({ title, content, date, onClick, removeAction, seenProp = false }: NotificationItemProps): JSX.Element => {
  const [showRemove, setShowRemove] = useState(false);
  const [seen, setSeen] = useState(true);

  useEffect(() => {
    setSeen(seenProp);
  }, [seenProp])

  const onClickLocal = () => {
    onClick();
    setSeen(true);
  }

  const prettyDate = (time: any) => {
    var date = new Date((time || "").replace(/-/g, "/").replace(/[TZ]/g, " ")),
      diff = (((new Date()).getTime() - date.getTime()) / 1000),
      day_diff = Math.floor(diff / 86400);

    if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31)
      return;

    return day_diff == 0 && (
      diff < 60 && "Most" ||
      diff < 120 && "1 perce" ||
      diff < 3600 && Math.floor(diff / 60) + " perce" ||
      diff < 7200 && "1 órája" ||
      diff < 86400 && Math.floor(diff / 3600) + " órája") ||
      day_diff == 1 && "Tegnap" ||
      day_diff < 7 && day_diff + " napja" ||
      day_diff < 31 && Math.ceil(day_diff / 7) + " hete";
  }

  const holderClass = twMerge(`p-[10px] rounded-[6px]  border-[1px] border-dark-bg bg-gradient-to-r from-rgba-grey-02 to-rgba-grey-01 hover:from-rgba-grey-003 hover:to-rgba-grey-02`);
  return (
    <motion.div animate={{ opacity: seen ? 0.5 : 1 }} className={holderClass} onMouseOver={() => setShowRemove(true)} onMouseLeave={() => setShowRemove(false)}>
      <div className="flex">
        <div className="text-white text-[14px] font-[600] flex  cursor-pointer" onClick={() => onClickLocal()} >

          {!seen && (<div className="relative top-[5px] rounded-full h-[12px] w-[12px] bg-gradient-to-br from-gradient-blue-start to-gradient-purple-end mr-[5px]"></div>)}

          {title}</div>
        <div className="ml-auto" >{showRemove && <div className="cursor-pointer" onClick={() => removeAction()}><div className="rounded-full w-[21px] h-[21px] bg-gradient-to-r from-rgba-grey-02 to-rgba-grey-01 text-center"><FontAwesomeIcon icon={faXmark} /></div></div>}</div>
      </div>
      <div className="text-[12px] text-rgba-grey-08 mt-[2px] cursor-pointer" onClick={() => onClickLocal()} >{content}</div>
      <div className="text-[12px] text-white font-[600] mt-[2px]">{prettyDate(date)}</div>
    </motion.div>

  )
}