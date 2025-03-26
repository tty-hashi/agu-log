// src/app/api/tags/categories/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const categories = await prisma.tagCategory.findMany({
      orderBy: { name: 'asc' },
    })

    return NextResponse.json({ categories })
  } catch (error) {
    // より詳細なエラー情報をレスポンスに含める
    return NextResponse.json(
      {
        error: 'カテゴリの取得に失敗しました',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
