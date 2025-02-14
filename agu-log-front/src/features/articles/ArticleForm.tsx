'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Editor from './Editor'
import { toast } from 'sonner'
import { Post } from '@prisma/client'

interface Props {
  post: Post
}

const ArticleForm = ({ post }: Props) => {
  const router = useRouter()
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent, status: 'draft' | 'published') => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/posts', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          status,
          postId: post.postId,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || '記事の保存に失敗しました')
      }

      const data = await response.json()

      toast.success(status === 'published' ? '記事を公開しました' : '下書きを保存しました')

      // 公開時は記事ページへ、下書き保存時は編集ページに残る
      if (status === 'published' && data.url) {
        router.push(data.url)
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '記事の保存に失敗しました')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, 'published')} className='space-y-6'>
      <div className='space-y-2'>
        <Label htmlFor='title'>タイトル</Label>
        <Input
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='記事のタイトルを入力'
          required
          className='h-auto py-4 md:text-2xl font-bold'
        />
      </div>

      <div className='space-y-2'>
        <Label>本文</Label>
        <Editor content={content} onChange={setContent} />
      </div>

      <div className='flex justify-end gap-4'>
        <Button
          type='button'
          variant='outline'
          onClick={(e) => handleSubmit(e, 'draft')}
          disabled={isSubmitting}>
          下書き保存
        </Button>
        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? '保存中...' : '公開する'}
        </Button>
      </div>
    </form>
  )
}

export default ArticleForm
