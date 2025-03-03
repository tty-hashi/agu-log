// app/api/profile/username/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { usernameSchema } from '@/validations/schemas/userName'
import { authOptions } from '@/lib/auth/config'

const usernameObjectSchema = z.object({
  username: usernameSchema,
})

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
    }

    // 既存のプロフィールを取得
    const existingProfile = await prisma.profile.findUnique({
      where: { id: session.user.id },
    })

    // 既にユーザー名が設定されている場合はエラー
    if (existingProfile?.username) {
      return NextResponse.json({ error: 'ユーザー名は変更できません' }, { status: 400 })
    }

    const body = await request.json()
    const { username } = usernameObjectSchema.parse(body)

    // ユーザー名の重複チェック
    const duplicateCheck = await prisma.profile.findFirst({
      where: { username },
    })

    if (duplicateCheck) {
      return NextResponse.json({ error: 'このユーザー名は既に使用されています' }, { status: 400 })
    }

    // プロフィールの更新（初回のみ）
    await prisma.profile.update({
      where: { id: session.user.id },
      data: { username },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors?.[0]?.message || 'Invalid input'
      return NextResponse.json({ error: errorMessage }, { status: 400 })
    }
    return NextResponse.json({ error: 'ユーザー名の設定に失敗しました' }, { status: 500 })
  }
}

// PUT や PATCH メソッドも明示的にブロック
export async function PUT() {
  return NextResponse.json({ error: 'ユーザー名は変更できません' }, { status: 405 })
}

export async function PATCH() {
  return NextResponse.json({ error: 'ユーザー名は変更できません' }, { status: 405 })
}
