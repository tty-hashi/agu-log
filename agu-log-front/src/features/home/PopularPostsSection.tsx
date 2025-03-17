import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import prisma from '@/lib/prisma'
import { HeartButton } from '@/components/Lv2/HeartButton/HeartButton'

export default async function PopularPostsSection() {
  // 現在の日付を取得
  const now = new Date()

  // 24時間前の日時を計算
  const oneDayBefore = new Date(now)
  oneDayBefore.setHours(oneDayBefore.getHours() - 72)

  // 24時間以内に作成されたいいねの多い投稿を取得
  const popularPosts = await prisma.post.findMany({
    where: {
      status: 'published',
      // いいねが1つ以上ある投稿に絞る
      likes: {
        some: {
          createdAt: {
            gte: oneDayBefore,
          },
        },
      },
    },
    include: {
      author: {
        include: {
          profile: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
    orderBy: {
      likes: {
        _count: 'desc',
      },
    },
    take: 3, // 上位4件を表示
  })

  if (popularPosts.length === 0) {
    return (
      <div className='text-center py-12 bg-gray-50 rounded-lg'>
        <p className='text-muted-foreground'>現在、人気の投稿はありません。</p>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
      {popularPosts.map((post) => (
        <Card key={post.id} className='hover:shadow-md transition-shadow'>
          <CardHeader className='pb-2'>
            <Link
              href={`/${post.author.profile?.username}/articles/${post.postId}`}
              className='text-lg font-bold hover:text-blue-600 transition-colors line-clamp-2'>
              {post.title}
            </Link>
          </CardHeader>

          <CardContent>
            <p className='text-muted-foreground text-sm line-clamp-3'>
              {post.content.replace(/<[^>]*>/g, '').substring(0, 120) + '...'}
            </p>
          </CardContent>

          <CardFooter className='border-t pt-4 flex justify-between'>
            <Link href={`/${post.author.profile?.username}`} className='flex items-center gap-2'>
              <Avatar className='h-6 w-6'>
                <AvatarImage src={post.author.image || ''} />
                <AvatarFallback>{post.author.profile?.displayName?.[0] || 'U'}</AvatarFallback>
              </Avatar>
              <span className='text-sm'>{post.author.profile?.displayName}</span>
            </Link>

            <div className='flex items-center gap-1 text-xs'>
              <HeartButton isLiked={false} likeCount={post._count.likes} />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
