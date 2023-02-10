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
      className="backdrop-blur-lg bg-black/30 w-full h-full fixed top-0 left-0 z-10 text-white"
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;