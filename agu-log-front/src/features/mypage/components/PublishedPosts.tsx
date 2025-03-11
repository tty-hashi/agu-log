// src/features/mypage/components/PublishedPosts.tsx
import { Suspense } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import prisma from '@/lib/prisma'
import { formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale'
import Link from 'next/link'
import { PostStatus } from '@prisma/client'

interface PublishedPostsProps {
  userId: string
}

async function PostsList({ userId }: PublishedPostsProps) {
  // 公開済み記事一覧を取得
  const posts = await prisma.post.findMany({
    where: {
      authorId: userId,
      status: PostStatus.published,
    },
    orderBy: { updatedAt: 'desc' },
    include: {
      author: {
        include: {
          profile: true,
        },
      },
      _count: {
        select: {
          likes: true,
          Comment: true,
        },
      },
    },
  })

  if (posts.length === 0) {
    return <div className='text-center py-12 text-muted-foreground'>公開中の記事はありません。</div>
  }

  return (
    <div className='space-y-4'>
      {posts.map((post) => {
        const username = post.author.profile?.username

        return (
          <Card key={post.id}>
            <CardHeader className='pb-2'>
              <div className='flex justify-between'>
                <Link
                  href={`/${username}/articles/${post.postId}`}
                  className='text-xl font-bold hover:underline'>
                  {post.title}
                </Link>
                <div className='flex items-center gap-3 text-sm text-muted-foreground'>
                  <span>いいね {post._count.likes}</span>
                  <span>コメント {post._count.Comment}</span>
                </div>
              </div>
              <div className='text-sm text-muted-foreground'>
                {post.publishedAt
                  ? `公開日: ${new Date(post.publishedAt).toLocaleDateString('ja-JP')}`
                  : '未公開'}
                · 更新:{' '}
                {formatDistanceToNow(new Date(post.updatedAt), { locale: ja, addSuffix: true })}
              </div>
            </CardHeader>
            <CardContent>
              <div className='line-clamp-2 text-gray-600'>
                {post.content.replace(/<[^>]*>/g, '')}
              </div>
              <div className='flex gap-2 mt-3'>
                <Link
                  href={`/${username}/articles/${post.postId}`}
                  className='text-sm text-blue-600 hover:underline'>
                  記事を見る
                </Link>
                <Link
                  href={`/${username}/articles/${post.postId}/edit`}
                  className='text-sm text-blue-600 hover:underline'>
                  編集する
                </Link>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default function PublishedPosts({ userId }: PublishedPostsProps) {
  return (
    <Suspense fallback={<div className='text-center py-8'>読み込み中...</div>}>
      <PostsList userId={userId} />
    </Suspense>
  )
}
