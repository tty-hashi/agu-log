import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'
import { BaseLayout } from '@/components/layout/BaseLayout'
import PostView from '@/features/posts/post/PostView'
import { authOptions } from '@/lib/auth/config'
import { Prisma } from '@prisma/client'

interface Props {
  params: Promise<{
    username: string
    postId: string
  }>
}

const postGetPayload = {
  author: {
    include: {
      profile: true,
    },
  },
  likes: true,
  _count: {
    select: {
      likes: true,
      tags: true,
    },
  },
}
export type PostWithRelations = Prisma.PostGetPayload<{
  include: typeof postGetPayload
}>

export default async function ArticlePage({ params }: Props) {
  const { username, postId } = await params
  const session = await getServerSession(authOptions)

  // 記事データの取得
  const post = await prisma.post.findFirst({
    where: {
      postId,
      status: 'published',
      author: {
        profile: {
          username,
        },
      },
    },
    include: postGetPayload,
  })

  if (!post) {
    notFound()
  }

  return (
    <BaseLayout>
      <PostView post={post} currentUserId={session?.user?.id} />
    </BaseLayout>
  )
}
