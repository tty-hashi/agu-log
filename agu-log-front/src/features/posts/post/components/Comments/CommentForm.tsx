'use client'

import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { addComment } from './actions'
import { toast } from 'sonner'
import { Textarea } from '@/components/ui/textarea'

// Submit ボタン
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type='submit' disabled={pending}>
      {pending ? 'コメント送信中...' : 'コメントする'}
    </Button>
  )
}

interface CommentFormProps {
  postId: string
}

export function CommentForm({ postId }: CommentFormProps) {
  const [comment, setComment] = useState('')

  async function handleSubmit(formData: FormData) {
    const result = await addComment(formData)
    if (result.success) {
      setComment('')
      toast.success('コメントを投稿しました')
    } else {
      toast.error(result.error || 'コメントの投稿に失敗しました')
    }
  }

  return (
    <form action={handleSubmit} className='space-y-4'>
      <input type='hidden' name='postId' value={postId} />

      <Textarea
        name='content'
        placeholder='コメントを入力してください'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        className='min-h-24'
      />

      <div className='flex justify-end'>
        <SubmitButton />
      </div>
    </form>
  )
}
