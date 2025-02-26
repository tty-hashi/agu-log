'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'

export async function toggleLike(postId: string) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      throw new Error('認証が必要です')
    }

    const userId = session.user.id

    // 既存のいいねを確認
    const existingLike = await prisma.postLike.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    })

    if (existingLike) {
      // いいねが存在する場合は削除
      await prisma.postLike.delete({
        where: {
          postId_userId: {
            postId,
            userId,
          },
        },
      })
    } else {
      // いいねが存在しない場合は作成
      await prisma.postLike.create({
        data: {
          postId,
          userId,
        },
      })
    }

    // await new Promise(() => {
    //   setTimeout(() => {
    //     // いいねの更新
    //     revalidatePath(`/posts/${postId}`)
    //   }, 3000)
    // })

    // キャッシュの更新
    revalidatePath('/[username]/articles/[postId]')

    return { success: true }
  } catch (error) {
    throw new Error('いいねの処理に失敗しました')
  }
}
