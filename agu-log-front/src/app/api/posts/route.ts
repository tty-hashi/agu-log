import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { updatePostSchema } from '@/validations/schemas/post'

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = updatePostSchema.parse(body)

    // 記事の存在と所有権を確認
    const existingPost = await prisma.post.findUnique({
      where: { postId: validatedData.postId },
      include: {
        author: {
          include: {
            profile: true,
          },
        },
      },
    })

    if (!existingPost) {
      return NextResponse.json({ error: '記事が見つかりません' }, { status: 404 })
    }

    if (existingPost.authorId !== session.user.id) {
      return NextResponse.json({ error: '権限がありません' }, { status: 403 })
    }

    // 記事を更新
    const post = await prisma.post.update({
      where: { postId: validatedData.postId },
      data: {
        title: validatedData.title,
        content: validatedData.content,
        status: validatedData.status,
        publishedAt:
          validatedData.status === 'published' && !existingPost.publishedAt
            ? new Date()
            : undefined,
        tags: validatedData.tagIds
          ? {
              deleteMany: {},
              create: validatedData.tagIds.map((tagId) => ({
                tag: {
                  connect: { id: tagId },
                },
              })),
            }
          : undefined,
      },
      include: {
        author: {
          include: {
            profile: true,
          },
        },
      },
    })

    // 記事URLの生成
    const username = post.author.profile?.username || post.author.id
    const url =
      validatedData.status === 'published'
        ? `/${username}/articles/${post.postId}`
        : `/articles/${post.postId}/edit`

    return NextResponse.json({ post, url })
  } catch (error) {
    console.error('記事更新エラー:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'バリデーションエラー', details: error.errors },
        { status: 400 },
      )
    }
    return NextResponse.json({ error: '記事の更新に失敗しました' }, { status: 500 })
  }
}
