import React from 'react'

export interface IconsProps {
  size: string
}
const IconWrapper = ({ icon = '', size = '' }) => {
  return (
    <div>
      <div className="text-center">
        <span className={`font-icomoon icon icon-${icon} text-${size} text-white`} />
      </div>
      <div className="text-center text-white">icon-{icon}</div>
    </div>
  )
}
export const Icons = ({ size = 'sm' }: IconsProps): JSX.Element => {
  return (
    <div
      className=" grid gap-5"
      style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}
    >
      <IconWrapper icon={'facebook'} size={size} />
      <IconWrapper icon={'instagram'} size={size} />
      <IconWrapper icon={'exit'} size={size} />
      <IconWrapper icon={'bell'} size={size} />
      <IconWrapper icon={'stat'} size={size} />
      <IconWrapper icon={'x'} size={size} />
      <IconWrapper icon={'success'} size={size} />
      <IconWrapper icon={'arrow'} size={size} />
      <IconWrapper icon={'user'} size={size} />
      <IconWrapper icon={'football'} size={size} />
      <IconWrapper icon={'tennis'} size={size} />

    </div>
  )
}
