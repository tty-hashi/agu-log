'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { usernameSchema } from '@/validations/schemas/userName'

export function UsernameSetupModal() {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const validateUsername = (value: string) => {
    try {
      usernameSchema.parse(value)
      return ''
    } catch (e) {
      if (e instanceof z.ZodError) {
        return e.errors[0]?.message || '無効なユーザー名です'
      }
      return '無効なユーザー名です'
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationError = validateUsername(username)
    if (validationError) {
      setError(validationError)
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/profile/username', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'ユーザー名の設定に失敗しました')
      }

      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={true}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>ユーザー名の設定</DialogTitle>
          <DialogDescription>
            ユーザー名を設定してください。この設定は後で変更できません。
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='username'>ユーザー名</Label>
            <Input
              id='username'
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setError('')
              }}
              placeholder='username'
              className='w-full text-black'
            />
            {error && <p className='text-sm text-red-500'>{error}</p>}
          </div>
          <div className='text-sm text-gray-500'>
            <ul className='list-disc list-inside'>
              <li>3文字以上20文字以内</li>
              <li>英数字、ハイフン(-)、アンダースコア(_)が使用可能</li>
              <li>一度設定すると変更できません</li>
            </ul>
          </div>
          <Button type='submit' className='w-full' disabled={isSubmitting}>
            {isSubmitting ? '設定中...' : '設定する'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
