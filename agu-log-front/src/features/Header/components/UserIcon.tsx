'use client'

import React from 'react'
import Avatar from '@/components/Lv1/Avatar/Avatar'
import { signOut, useSession } from 'next-auth/react'
import DropDown from '@/components/Lv1/Dropdonwn/Dropdown'
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'

const UserIcon = () => {
  const { data: session } = useSession()

  return (
    <DropDown label='アカウント情報' trigger={<Avatar src={session?.user?.image || ''} />}>
      <DropdownMenuItem asChild>
        <Link href='/mypage'>マイ投稿一覧</Link>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => signOut()}>ログアウト</DropdownMenuItem>
    </DropDown>
  )
}

export default UserIcon
