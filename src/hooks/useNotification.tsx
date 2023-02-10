import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

export interface ToastProps {
  type: string
  title: string
  message: string
}

export const useNotification = (props: object) => {
  const newWarningToast = (message = '') => {
    toast.warn(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      ...props,
    })
  }

  const newSuccessToast = (title = '', message = '') => {
    toast.success(<>
      <div className="text-[14px] text-white font-[600]">{title}</div>
      <div className="text-[11px] text-rgba-grey-08 font-[400] mt-[3px]">{message}</div>
    </>, {
      position: toast.POSITION.BOTTOM_RIGHT,
      icon: ({ theme, type }) =>  <span className="font-icomoon justify-center text-lg text-green icon-success text-[20px] mr-2" />,
      ...props,
    })
  }

  const newErrorToast = (title = '', message = '') => {
    toast.error(<>
      <div className="text-[14px] text-white font-[600]">{title}</div>
      <div className="text-[11px] text-rgba-grey-08 font-[400] mt-[3px]">{message}</div>
    </>, {
      position: toast.POSITION.BOTTOM_RIGHT,
      icon: ({ theme, type }) =>  <span className="font-icomoon justify-center text-lg text-red icon-error text-[20px] mr-2" />,
      ...props,
    })
  }

  const newInfoToast = (message = '') => {
    toast.info(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      ...props,
    })
  }

  const newPushToast = (title = '', message = '') => {
    toast(<>
      <div className="text-[14px] text-white font-[600]">{title}</div>
      <div className="text-[11px] text-rgba-grey-08 font-[400] mt-[3px]">{message}</div>
    </>, {
      position: toast.POSITION.BOTTOM_RIGHT,
      ...props,
    })
  }


  return { newWarningToast, newSuccessToast, newErrorToast, newInfoToast, newPushToast }
}
