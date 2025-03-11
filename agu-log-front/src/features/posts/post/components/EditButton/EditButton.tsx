'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Edit } from 'lucide-react'

interface EditButtonProps {
  username: string
  postId: string
}

export function EditButton({ username, postId }: EditButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/${username}/articles/${postId}/edit`)
  }

  return (
    <Button variant='outline' size='sm' onClick={handleClick} className='flex items-center gap-1'>
      <Edit className='h-4 w-4' />
      <span>編集する</span>
    </Button>
  )
}
