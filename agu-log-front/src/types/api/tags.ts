import { Prisma } from '@prisma/client'

// タグの取得に使用するinclude定義
export const tagInclude = {
  category: {
    select: {
      id: true,
      name: true,
    },
  },
} as const

// 型定義
export type TagWithCategory = Prisma.TagGetPayload<{
  include: typeof tagInclude
}>

export type CategoryResponse = Prisma.TagCategoryGetPayload<object>

export interface TagsResponse {
  tags: TagWithCategory[]
}

export interface CategoriesResponse {
  categories: CategoryResponse[]
}
