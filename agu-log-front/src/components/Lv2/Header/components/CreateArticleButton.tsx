'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function CreateArticleButton() {
  const router = useRouter()
  const [isCreating, setIsCreating] = useState(false)

  const handleClick = async () => {
    if (isCreating) return
    setIsCreating(true)

    try {
      const response = await fetch('/api/posts/draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || '記事の作成に失敗しました')
      }

      const data = await response.json()
      router.push(data.url)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '記事の作成に失敗しました')
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <Button variant='ghost' onClick={handleClick} disabled={isCreating}>
      {isCreating ? '作成中...' : '投稿する'}
    </Button>
  )
}
