import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import ArticleView from '@/features/articles/ArticleView'

interface Props {
  params: {
    username: string
    postId: string
  }
}

export default async function ArticlePage({ params }: Props) {
  const { username, postId } = params
  const session = await getServerSession(authOptions)

  // 記事データの取得
  const post = await prisma.post.findFirst({
    where: {
      postId,
      author: {
        profile: {
          username,
        },
      },
      // 非公開記事は著者本人のみ閲覧可能
      OR: [
        { status: 'published' },
        {
          status: 'draft',
          authorId: session?.user?.id,
        },
      ],
    },
    include: {
      author: {
        include: {
          profile: true,
        },
      },
    },
  })

  if (!post) {
    notFound()
  }

  return (
    <BaseLayout>
      <ArticleView post={post} />
    </BaseLayout>
  )
}
