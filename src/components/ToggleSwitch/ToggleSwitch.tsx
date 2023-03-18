import React from 'react'
import './ToggleSwitch.css';

export interface ToggleSwitchProps {
  label?: string
  id: string
  name: string
  classNames?: string
  value: any,
  onChange?: any
}

export const ToggleSwitch = ({ label, name, id, classNames, value, onChange }: ToggleSwitchProps): JSX.Element => {
  return (
    <label htmlFor={id} className="inline-flex relative items-center cursor-pointer">
      <input type="checkbox" value={value ?? ''} name={name} id={id} className="sr-only peer" onChange={onChange} defaultChecked={value === true} />
        <div className="w-[58px] h-8 bg-gradient-to-r from-rgba-grey-01 to-rgba-grey-02 peer-focus:outline-none outline-none peer-focus:ring-0 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[6px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-bg-gradient-to-r peer-checked:from-[#4487CF] peer-checked:to-[#9E43EE]"></div>
      <span className="ml-3 text-[16px] font-medium text-white-900 dark:text-gray-300">{label}</span>
    </label>
  )
}