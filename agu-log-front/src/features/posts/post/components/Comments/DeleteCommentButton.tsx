'use client'

import { useState } from 'react'
import { Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { deleteComment } from './actions'
import { toast } from 'sonner'

interface DeleteCommentButtonProps {
  commentId: string
}

export function DeleteCommentButton({ commentId }: DeleteCommentButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    setIsDeleting(true)
    try {
      const result = await deleteComment(commentId)
      if (result.success) {
        toast.success('コメントを削除しました')
      } else {
        toast.error(result.error || 'コメントの削除に失敗しました')
      }
    } finally {
      setIsDeleting(false)
      setIsOpen(false)
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='h-6 w-6 text-muted-foreground hover:text-destructive'>
          <Trash className='h-4 w-4' />
          <span className='sr-only'>コメントを削除</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>コメントの削除</AlertDialogTitle>
          <AlertDialogDescription>
            このコメントを削除しますか？この操作は取り消せません。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>キャンセル</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className='bg-destructive text-destructive-foreground hover:bg-destructive/90'>
            {isDeleting ? '削除中...' : '削除する'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
