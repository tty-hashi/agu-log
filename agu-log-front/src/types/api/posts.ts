import { Prisma } from '@prisma/client'
import { TagWithCategory } from './tags'

// タグ付きポストの型定義
export type PostTag = {
  postId: string
  tagId: string
  tag: TagWithCategory
}

// ポストの関連情報を含む型
export type PostWithRelations = Prisma.PostGetPayload<{
  include: {
    author: {
      include: {
        profile: true
      }
    }
    likes: true
    tags: {
      include: {
        tag: {
          include: {
            category: true
          }
        }
      }
    }
    _count: {
      select: {
        likes: true
        tags: true
        Comment: true
      }
    }
  }
}>
