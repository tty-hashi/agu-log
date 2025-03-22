import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { tagInclude } from '@/types/api/tags'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('category_id')

    // クエリでも同じinclude定義を使用
    const tags = await prisma.tag.findMany({
      where: categoryId ? { categoryId } : undefined,
      include: tagInclude,
      orderBy: { name: 'asc' },
    })

    const response = { tags }
    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({ error: 'タグの取得に失敗しました' }, { status: 500 })
  }
}
