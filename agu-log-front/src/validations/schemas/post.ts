import { z } from 'zod'

// 記事の状態を定義
export const PostStatus = z.enum(['draft', 'published'])
export type PostStatus = z.infer<typeof PostStatus>

// 記事タイプを定義
export const PostType = z.enum(['diary', 'poem', 'tech', 'question', 'review'])
export type PostType = z.infer<typeof PostType>

// 記事更新時のバリデーションスキーマ
export const updatePostSchema = z.object({
  title: z
    .string()
    .min(1, '記事タイトルは必須です')
    .max(100, 'タイトルは100文字以内で入力してください'),
  content: z
    .string()
    .min(1, '記事内容は必須です')
    .max(50000, '記事内容は50000文字以内で入力してください'),
  status: PostStatus,
  type: PostType,
  tagIds: z.array(z.string()).optional(),
  postId: z.string(),
})

// 型定義のエクスポート
export type UpdatePostInput = z.infer<typeof updatePostSchema>
