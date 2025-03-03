'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { z } from 'zod'

// コメント作成のバリデーションスキーマ
const commentSchema = z.object({
  content: z
    .string()
    .min(1, 'コメントを入力してください')
    .max(500, 'コメントは500文字以内で入力してください'),
  postId: z.string(),
})

export async function addComment(formData: FormData) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      throw new Error('認証が必要です')
    }

    const content = formData.get('content') as string
    const postId = formData.get('postId') as string

    // バリデーション
    const validated = commentSchema.parse({ content, postId })

    // コメントの作成
    await prisma.comment.create({
      data: {
        content: validated.content,
        postId: validated.postId,
        authorId: session.user.id,
      },
    })

    // キャッシュの更新
    revalidatePath('/[username]/articles/[postId]')

    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0]?.message }
    }
    return { success: false, error: 'コメントの投稿に失敗しました' }
  }
}

export async function deleteComment(commentId: string) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      throw new Error('認証が必要です')
    }

    // コメントの存在確認と所有権チェック
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    })

    if (!comment) {
      throw new Error('コメントが見つかりません')
    }

    if (comment.authorId !== session.user.id) {
      throw new Error('このコメントを削除する権限がありません')
    }

    // コメントの削除
    await prisma.comment.delete({
      where: { id: commentId },
    })

    // キャッシュの更新
    revalidatePath('/[username]/articles/[postId]')

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'コメントの削除に失敗しました',
    }
  }
}
