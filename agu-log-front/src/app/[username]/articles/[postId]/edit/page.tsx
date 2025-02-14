import { notFound, redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/lib/prisma'
import { BaseLayout } from '@/components/layout/BaseLayout'
import ArticleForm from '@/features/articles/ArticleForm'

interface Props {
  params: {
    postId: string
  }
}

export default async function EditArticlePage({ params }: Props) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect('/signin')
  }

  const postId = params.postId

  // 記事データの取得
  const post = await prisma.post.findFirst({
    where: {
      postId,
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

  // 権限チェック
  if (post.authorId !== session.user.id) {
    redirect('/')
  }

  return (
    <BaseLayout>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-2xl font-bold mb-6'>記事の編集</h1>
        <ArticleForm post={post} />
      </div>
    </BaseLayout>
  )
}
