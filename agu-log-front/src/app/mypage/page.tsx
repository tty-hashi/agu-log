import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { authOptions } from '@/lib/auth/config'
import prisma from '@/lib/prisma'
import MyPostsList from '@/features/mypage/MyPostList'

export default async function MyPage() {
  const session = await getServerSession(authOptions)

  // 未ログインの場合はログインページへリダイレクト
  if (!session?.user?.id) {
    redirect('/signin')
  }

  // ユーザープロフィールを取得
  const profile = await prisma.profile.findUnique({
    where: { id: session.user.id },
    include: { user: true },
  })

  if (!profile) {
    redirect('/signin')
  }

  return (
    <BaseLayout>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-2xl font-bold mb-6'>マイ投稿一覧</h1>
        <MyPostsList userId={session.user.id} />
      </div>
    </BaseLayout>
  )
}
