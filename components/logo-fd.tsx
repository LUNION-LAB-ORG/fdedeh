import React from 'react'
import Image from 'next/image'

type Props = {
  className?: string
  width?: number
  height?: number
}

// 50 * 501 / 701 = 35.86

const LogoFd = (props: Props) => {
  return (
    <Image
      src="/logo-fd.png"
      alt="Logo Fd Prime"
      width={props.width || 50}
      height={props.width ? Math.round(props.width * 501 / 701) : 36}
      className={props.className}
      priority
    />
  )
}

export default LogoFd