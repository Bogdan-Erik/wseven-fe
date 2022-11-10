import React, { useState } from 'react'
import './InformationItem.css';
import { motion } from "framer-motion";
import { Icon } from '../Icon';

export interface InformationItemProps {
  title: string,
  children: any,
}

export const InformationItem = ({ title, children }: InformationItemProps): JSX.Element => {
  const variants = {
    open: { opacity: 1, y: 0, },
    closed: { opacity: 0, y: "-100%" },
  }
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="gradient-bg rounded-[6px]" onClick={() => setIsOpen(lastVal => !lastVal)}>
      <div className="py-[12px] px-[20px] flex cursor-pointer">
        <div className='mr-auto self-center'>{title}</div>
        <div className=" self-center">
          <div className=" self-center"><motion.div
            animate={{
              rotate: isOpen ? 180 : 0
            }}
            className={"flex"}
          ><Icon icon={'expand'} size={'text-2xl'} /></motion.div></div>
        </div>
      </div>
      <motion.div className="match-items px-[20px] py-[20px]"
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        style={{ display: isOpen ? 'block' : 'none', marginBottom: '10px' }}
      >{children}</motion.div>
    </div>
  )
}