import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { PostStatus } from '@prisma/client' // Prismaで生成された型をインポート

// クエリパラメータのバリデーションスキーマ
const querySchema = z.object({
  username: z.string(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
  status: z.enum(['draft', 'published'] as const).optional(),
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const params = querySchema.parse({
      username: searchParams.get('username'),
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
      status: searchParams.get('status'),
    })

    const skip = (params.page - 1) * params.limit

    // クエリ条件の構築
    const where = {
      author: {
        profile: {
          username: params.username,
        },
      },
      status: PostStatus.published,
    }

    // 記事の取得
    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take: params.limit,
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            include: {
              profile: true,
            },
          },
        },
      }),
      prisma.post.count({ where }),
    ])

    return NextResponse.json({
      posts,
      pagination: {
        total,
        page: params.page,
        limit: params.limit,
        totalPages: Math.ceil(total / params.limit),
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid parameters', details: error.errors },
        { status: 400 },
      )
    }
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}
