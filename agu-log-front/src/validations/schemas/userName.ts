import { z } from 'zod'

export const usernameSchema = z
  .string()
  .min(3, 'ユーザー名は3文字以上必要です')
  .max(20, 'ユーザー名は20文字以下にしてください')
  .regex(/^[a-zA-Z0-9_-]+$/, '使用できる文字は英数字、ハイフン、アンダースコアのみです')
