'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Editor from '../Editor'

const ArticleForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // 投稿処理は後ほど実装
    console.log({ title, content })
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
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
        <Button type='button' variant='outline'>
          下書き保存
        </Button>
        <Button type='submit'>公開する</Button>
      </div>
    </form>
  )
}

export default ArticleForm
