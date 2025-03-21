import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const categories = await prisma.tagCategory.findMany({
      orderBy: { name: 'asc' },
    })

    return NextResponse.json({ categories })
  } catch (error) {
    return NextResponse.json({ error: 'カテゴリの取得に失敗しました' }, { status: 500 })
  }
}
