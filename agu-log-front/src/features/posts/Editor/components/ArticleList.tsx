import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import { ja } from 'date-fns/locale'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import { HeartComponent } from '@/components/Lv2/HeartButton/HeartComponent'

interface ArticleListProps {
  username: string
}

export default async function ArticleList({ username }: ArticleListProps) {
  // サーバーサイドでデータを取得
  const posts = await prisma.post.findMany({
    where: {
      author: {
        profile: {
          username,
        },
      },
      status: 'published',
    },
    orderBy: { createdAt: 'desc' },
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
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
      {posts.map((post) => (
        <Card key={post.id} className='hover:shadow-md transition-shadow'>
          <CardHeader className='pb-6  h-32'>
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

          <CardFooter className='border-t pt-4 flex flex-col justify-start items-start gap-4'>
            <div className='flex justify-between items-center gap-2 w-full'>
              <div className='text-xs text-muted-foreground'>
                {formatDistanceToNow(new Date(post.publishedAt || post.createdAt), {
                  addSuffix: true,
                  locale: ja,
                })}
              </div>
              <HeartComponent likeCount={post._count.likes} />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
