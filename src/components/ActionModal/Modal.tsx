import React, { useState } from 'react'
import { Icon } from '../Icon';
import './Modal.css';
import { twMerge } from 'tailwind-merge'
import ReactDOM from 'react-dom';
import { AnimatePresence, motion } from "framer-motion"
import Backdrop from './Backdrop';

const dropIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,

  },
  exit: {
    opacity: 0,
  },
}

export interface ModalProps {
  children?: JSX.Element,
  modalClasses?: string,
  isShowing: boolean,
  hide: any,
  hasBg?: boolean,
}

export const Modal = ({ children, modalClasses, isShowing, hide, hasBg = true }: ModalProps): JSX.Element => {
  const [isVisible, setIsVisible] = useState(true);
  const modalClass = twMerge(
    `  bg-[#000012] ${hasBg ? 'modal-bg' : ''} rounded-md max-h-full relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[100%]  ${modalClasses}`,
  )

  return (
    <Backdrop onClick={hide}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={modalClass}

      >
        <div className="absolute top-0 right-0 text-white p-[24px] cursor-pointer" onClick={hide}><Icon icon={'cross'} size={'text-lg'} /></div>
        <div>{children}</div>
      </div>
    </Backdrop>
  )
  return isShowing ? ReactDOM.createPortal(
    <React.Fragment>
      <AnimatePresence initial={false}
        // Only render one component at a time.
        // The exiting component will finish its exit
        // animation before entering component is rendered
        exitBeforeEnter={true}
        // Fires when all exiting nodes have completed animating out
        onExitComplete={() => null}>
        {isVisible && (
          <motion.div className="backdrop-blur-lg bg-black/30 w-full h-full fixed top-0 left-0 z-10 text-white">
            <motion.div animate={{ opacity: isShowing ? 1 : 0 }} className={modalClass}>
              <div className="absolute top-0 right-0 text-white p-[24px] cursor-pointer" onClick={hide}><Icon icon={'cross'} size={'text-lg'} /></div>
              <div>{children}</div>
            </motion.div>
          </motion.div>
        )
        }
      </AnimatePresence>
    </React.Fragment>, document.body
  ) : <></>;
}