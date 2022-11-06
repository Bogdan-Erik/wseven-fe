import React from 'react'
import { twMerge } from 'tailwind-merge';
import './BlackBox.scss';
import { motion } from 'framer-motion';

export interface BlackBoxProps {
  children?: any,
  extraClass?: string,
  hoverEffect?: boolean
}

export const BlackBox = ({ children, extraClass, hoverEffect }: BlackBoxProps): JSX.Element => {
  const classes = twMerge(`p-[24px] black-box ${extraClass}`)
  return (
    <motion.div className={classes} whileHover={{
      scale: (hoverEffect) ? 1.1 : 1
    }}>
      {children}
    </motion.div>
  )
}