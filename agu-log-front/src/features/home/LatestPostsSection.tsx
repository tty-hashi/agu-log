import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import prisma from '@/lib/prisma'
import { ja } from 'date-fns/locale'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import { HeartButton } from '@/components/Lv2/HeartButton/HeartButton'

export default async function LatestPostsSection() {
  // 最新の公開記事を10件取得
  const posts = await prisma.post.findMany({
    where: {
      status: 'published',
    },
    orderBy: {
      publishedAt: 'desc',
    },
    take: 8,
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
  })

  return (
    <div id='latest-posts' className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
      {posts.map((post) => (
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

            <div className='text-xs text-muted-foreground'>
              {formatDistanceToNow(new Date(post.publishedAt || post.createdAt), {
                addSuffix: true,
                locale: ja,
              })}
            </div>
            <div className='text-xs text-muted-foreground'>
              <HeartButton isLiked={false} likeCount={post._count.likes} />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
