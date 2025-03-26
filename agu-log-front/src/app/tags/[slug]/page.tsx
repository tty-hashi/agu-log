import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import { ja } from 'date-fns/locale'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface Props {
  params: Promise<{
    slug: string
  }>
}

export default async function TagPage({ params }: Props) {
  const { slug } = await params

  // タグの情報を取得
  const tag = await prisma.tag.findUnique({
    where: { slug },
    include: { category: true },
  })

  if (!tag) {
    notFound()
  }

  // タグに関連する記事を取得
  const posts = await prisma.post.findMany({
    where: {
      status: 'published',
      tags: {
        some: {
          tagId: tag.id,
        },
      },
    },
    orderBy: { publishedAt: 'desc' },
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
    <BaseLayout>
      <div className='max-w-4xl mx-auto'>
        <header className='mb-8'>
          <h1 className='text-3xl font-bold flex items-center gap-2'>
            <Badge>{tag.category.name}</Badge>
            <span>{tag.name}</span>
          </h1>
          {tag.description && <p className='text-muted-foreground mt-2'>{tag.description}</p>}
          <p className='mt-4'>{posts.length}件の記事</p>
        </header>

        {posts.length === 0 ? (
          <div className='text-center py-12 bg-gray-50 rounded-lg'>
            <p className='text-muted-foreground'>このタグの記事はまだありません。</p>
          </div>
        ) : (
          <div className='grid gap-6'>
            {posts.map((post) => (
              <Card key={post.id} className='hover:shadow-md transition-shadow'>
                <CardHeader className='pb-2'>
                  <Link
                    href={`/${post.author.profile?.username}/articles/${post.postId}`}
                    className='text-xl font-bold hover:text-blue-600 transition-colors line-clamp-2 h-14'>
                    {post.title}
                  </Link>
                </CardHeader>

                <CardContent>
                  <p className='text-muted-foreground text-sm line-clamp-3'>
                    {post.content.replace(/<[^>]*>/g, '').substring(0, 120) + '...'}
                  </p>
                </CardContent>

                <CardFooter className='border-t pt-4 flex justify-between'>
                  <Link
                    href={`/${post.author.profile?.username}`}
                    className='flex items-center gap-2'>
                    <Avatar className='h-6 w-6'>
                      <AvatarImage src={post.author.image || ''} />
                      <AvatarFallback>
                        {post.author.profile?.displayName?.[0] || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <span className='text-sm'>{post.author.profile?.displayName}</span>
                  </Link>

                  <div className='text-xs text-muted-foreground'>
                    {formatDistanceToNow(new Date(post.publishedAt || post.createdAt), {
                      addSuffix: true,
                      locale: ja,
                    })}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </BaseLayout>
  )
}
