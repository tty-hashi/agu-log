import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import { BaseLayout } from '@/components/layout/BaseLayout'

interface Props {
  params: {
    username: string
    postId: string
  }
}

export default async function ArticlePage({ params }: Props) {
  const { username, postId } = params

  // 記事データの取得
  const post = await prisma.post.findFirst({
    where: {
      postId,
      author: {
        profile: {
          username,
        },
      },
    },
    include: {
      author: {
        include: {
          profile: true,
        },
      },
      tags: {
        include: {
          tag: true,
        },
      },
    },
  })

  if (!post) {
    notFound()
  }

  return (
    <BaseLayout>
      <article className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
        <div className='mb-4 text-gray-600'>
          <span>{post.author.profile?.displayName || username}</span>
          <time className='ml-4'>
            {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
          </time>
        </div>
        <div className='prose max-w-none' dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </BaseLayout>
  )
}
