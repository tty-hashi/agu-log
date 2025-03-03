import React from 'react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const GoogleSingIn = () => {
  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/', redirect: true })
  }

  return (
    <Button variant='outline' className='w-full' onClick={handleGoogleSignIn}>
      <Image src='/google.svg' alt='Google' width={20} height={20} className='mr-2' />
      Googleでログイン
    </Button>
  )
}

export default GoogleSingIn
