import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import { ja } from 'date-fns/locale'
import Link from 'next/link'
import prisma from '@/lib/prisma'

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
    },
  })

  return (
    <div className='space-y-4'>
      {posts.map((post) => (
        <Card key={post.postId}>
          <CardHeader>
            <Link
              href={`/${username}/articles/${post.postId}`}
              className='text-xl font-bold hover:underline'>
              {post.title}
            </Link>
            <div className='text-sm text-gray-500'>
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
                locale: ja,
              })}
            </div>
          </CardHeader>
          <CardContent>
            <div className='line-clamp-3 text-gray-600'>{post.content.replace(/<[^>]*>/g, '')}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
