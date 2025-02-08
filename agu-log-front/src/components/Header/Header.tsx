'use client'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { useSession, signOut } from 'next-auth/react'

const Header = () => {
  const { data: session } = useSession()
  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className='container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0'>
        <div className='flex gap-6 md:gap-10'>
          <Link href='/' className='flex items-center space-x-2'>
            <span className='inline-block font-bold'>AGU Log</span>
          </Link>
          {/* <nav className='flex gap-6'>
            <Link
              href='/articles'
              className='flex items-center text-sm font-medium text-muted-foreground hover:text-primary'>
              記事一覧
            </Link>
            <Link
              href='/tags'
              className='flex items-center text-sm font-medium text-muted-foreground hover:text-primary'>
              タグ
            </Link>
          </nav> */}
        </div>
        <div className='flex flex-1 items-center justify-end space-x-4'>
          <nav className='flex items-center space-x-2'>
            {session ? (
              <>
                <Button asChild variant='ghost'>
                  <Link href='/articles/new'>投稿する</Link>
                </Button>
                <Button
                  variant='ghost'
                  className='text-sm font-medium text-muted-foreground hover:text-primary'
                  onClick={() => signOut()}>
                  ログアウト
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
