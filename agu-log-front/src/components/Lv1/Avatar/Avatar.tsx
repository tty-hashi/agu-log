import Image from 'next/image'
import React from 'react'

type Props = {
  src: string
  size?: number
}
const Avatar: React.FC<Props> = ({ src, size = 32 }) => {
  return (
    <Image
      src={src || ''}
      alt='プロフィール画像'
      width={size}
      height={size}
      className='rounded-full'
    />
  )
}

export default Avatar
