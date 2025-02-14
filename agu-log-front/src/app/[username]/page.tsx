import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import { BaseLayout } from '@/components/layout/BaseLayout'

interface Props {
  params: {
    username: string
  }
}

export default async function UserPage({ params }: Props) {
  const username = params.username

  const profile = await prisma.profile.findFirst({
    where: { username },
    include: {
      user: true,
    },
  })

  if (!profile) {
    notFound()
  }

  return (
    <BaseLayout>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-2xl font-bold mb-6'>{profile.displayName || username}の記事一覧</h1>
        {/* 記事一覧コンポーネント */}
      </div>
    </BaseLayout>
  )
}
