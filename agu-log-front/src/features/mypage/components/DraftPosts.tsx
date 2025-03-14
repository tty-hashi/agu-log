import { Suspense } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/prisma'
import { ja } from 'date-fns/locale'
import Link from 'next/link'
import { PostStatus } from '@prisma/client'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'

interface DraftPostsProps {
  userId: string
}

async function DraftsList({ userId }: DraftPostsProps) {
  // 下書き一覧を取得
  const drafts = await prisma.post.findMany({
    where: {
      authorId: userId,
      status: PostStatus.draft,
    },
    orderBy: { updatedAt: 'desc' },
    include: {
      author: {
        include: {
          profile: true,
        },
      },
    },
  })

  if (drafts.length === 0) {
    return <div className='text-center py-12 text-muted-foreground'>下書きはありません。</div>
  }

  return (
    <div className='space-y-4'>
      {drafts.map((draft) => {
        const username = draft.author.profile?.username

        return (
          <Card key={draft.id}>
            <CardHeader className='pb-2'>
              <div className='flex justify-between'>
                <div className='text-xl font-bold'>{draft.title || '無題'}</div>
                <div className='text-sm text-muted-foreground'>
                  最終更新:{' '}
                  {formatDistanceToNow(new Date(draft.updatedAt), { locale: ja, addSuffix: true })}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className='line-clamp-2 text-gray-600'>
                {draft.content ? draft.content.replace(/<[^>]*>/g, '') : '内容なし'}
              </div>
              <div className='flex justify-end mt-3'>
                <Button asChild variant='outline' size='sm'>
                  <Link href={`/${username}/articles/${draft.postId}/edit`}>編集を続ける</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default function DraftPosts({ userId }: DraftPostsProps) {
  return (
    <Suspense fallback={<div className='text-center py-8'>読み込み中...</div>}>
      <DraftsList userId={userId} />
    </Suspense>
  )
}
