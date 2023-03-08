import React, { useState } from 'react'
import { motion } from "framer-motion";

export interface BackdropProps {
  children?: JSX.Element,
  onClick?: () => void;
}


const Backdrop = ({ children, onClick }: BackdropProps) => {

  return (
    <motion.div
      onClick={onClick}
      className="bg-gradient-to-r from-gradient-1 to-gradient-2  w-full h-full fixed top-0 left-0 z-[1000] text-white"
      transition={{ duration:0.5 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;