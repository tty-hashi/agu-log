import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import prisma from '@/lib/prisma'

interface TagCloudProps {
  limit?: number
  showCount?: boolean
}

export default async function TagCloud({ limit = 20, showCount = true }: TagCloudProps) {
  // タグとその使用回数を取得
  const tags = await prisma.tag.findMany({
    include: {
      _count: {
        select: {
          postTags: true,
        },
      },
    },
    orderBy: {
      postTags: {
        _count: 'desc',
      },
    },
    take: limit,
  })

  // 投稿のあるタグのみをフィルタリング
  const tagsWithPosts = tags.filter((tag) => tag._count.postTags > 0)

  if (tagsWithPosts.length === 0) {
    return <div className='text-muted-foreground'>タグはまだありません。</div>
  }

  return (
    <div className='flex flex-wrap gap-2'>
      {tagsWithPosts.map((tag) => (
        <Link key={tag.id} href={`/tags/${tag.slug}`}>
          <Badge variant='outline' className='hover:bg-accent cursor-pointer transition-colors'>
            {tag.name}
            {showCount && tag._count.postTags > 0 && (
              <span className='ml-1 text-xs text-muted-foreground'>({tag._count.postTags})</span>
            )}
          </Badge>
        </Link>
      ))}
    </div>
  )
}
