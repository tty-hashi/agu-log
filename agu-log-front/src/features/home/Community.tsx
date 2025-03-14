import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import prisma from '@/lib/prisma'

export default async function CommunitySection() {
  // アクティブユーザーを取得（例: 最近記事を投稿したユーザー）
  const activeUsers = await prisma.user.findMany({
    where: {
      posts: {
        some: {
          status: 'published',
        },
      },
    },
    include: {
      profile: true,
      _count: {
        select: {
          posts: true,
        },
      },
    },
    orderBy: {
      posts: {
        _count: 'desc',
      },
    },
    take: 8,
  })

  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
      {activeUsers.map((user) => (
        <Link
          key={user.id}
          href={`/${user.profile?.username}`}
          className='flex flex-col items-center p-4 bg-white rounded-lg border hover:shadow-md transition-shadow'>
          <Avatar className='h-16 w-16 mb-2'>
            <AvatarImage src={user.image || ''} />
            <AvatarFallback>{user.profile?.displayName?.[0] || 'U'}</AvatarFallback>
          </Avatar>
          <h3 className='font-semibold text-center'>{user.profile?.displayName}</h3>
          <p className='text-sm text-muted-foreground text-center'>{user._count.posts}件の投稿</p>
        </Link>
      ))}
    </div>
  )
}
