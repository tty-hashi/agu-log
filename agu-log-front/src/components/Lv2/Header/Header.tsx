'use client'
import Link from 'next/link'
import React from 'react'
import { Button } from '../../ui/button'
import { useSession } from 'next-auth/react'
import UserIcon from '@/components/Lv2/Header/components/UserIcon'

const Header = () => {
  const { data: session } = useSession()
  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className='container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 mx-auto'>
        <div className='flex gap-6 md:gap-10'>
          <Link href='/' className='flex items-center space-x-2'>
            <span className='inline-block font-bold'>AGU Log</span>
          </Link>
        </div>
        <div className='flex flex-1 items-center justify-end space-x-4'>
          <nav className='flex items-center space-x-2'>
            {session ? (
              <>
                <UserIcon />
                <Button asChild variant='ghost'>
                  <Link href='/articles/new'>投稿する</Link>
                </Button>
              </>
            ) : (
              <Button asChild variant='ghost'>
                <Link href='/signin'>ログイン</Link>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
