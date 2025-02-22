import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'
import { customAlphabet } from 'nanoid'
import { authOptions } from '@/lib/auth/config'

// post-id生成用の文字セット（似た文字を除外）
const postIdAlphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
const generatePostId = customAlphabet(postIdAlphabet, 12)

export async function POST() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
    }

    // 空の記事を作成
    const postId = generatePostId()
    const post = await prisma.post.create({
      data: {
        title: '無題',
        content: '',
        status: 'draft',
        postId,
        authorId: session.user.id,
      },
      include: {
        author: {
          include: {
            profile: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    })
    const username = post.author.profile?.username

    if (!username) {
      return NextResponse.json({ error: 'ユーザー名が設定されていません' }, { status: 400 })
    }
    // 編集ページのURLを返す
    return NextResponse.json(
      {
        post,
        url: `${username}/articles/${post.postId}/edit`,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('空の記事作成エラー:', error)
    return NextResponse.json({ error: '記事の作成に失敗しました' }, { status: 500 })
  }
}
