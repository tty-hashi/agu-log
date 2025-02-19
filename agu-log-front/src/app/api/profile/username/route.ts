// app/api/profile/username/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { usernameSchema } from '@/validations/schemas/userName'

const usernameObjectSchema = z.object({
  username: usernameSchema,
})

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
    }

    const body = await request.json()
    const { username } = usernameObjectSchema.parse(body)

    // ユーザー名の重複チェック
    const existingProfile = await prisma.profile.findFirst({
      where: { username },
    })

    if (existingProfile) {
      return NextResponse.json({ error: 'このユーザー名は既に使用されています' }, { status: 400 })
    }

    // プロフィールの更新
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
