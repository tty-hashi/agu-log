import { Suspense } from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CommentForm } from './CommentForm'
import CommentList from './CommentList'

interface CommentSectionProps {
  postId: string
}

export default async function CommentSection({ postId }: CommentSectionProps) {
  const session = await getServerSession(authOptions)
  const currentUserId = session?.user?.id

  return (
    <div className='mt-10 pt-8 border-t'>
      <h2 className='text-xl font-bold mb-6'>コメント</h2>

      {currentUserId ? (
        <CommentForm postId={postId} />
      ) : (
        <div className='p-4 bg-muted rounded-md mb-6 text-center'>
          <p className='mb-2'>コメントするにはログインが必要です</p>
          <Button asChild variant='outline'>
            <Link href='/signin'>ログインする</Link>
          </Button>
        </div>
      )}

      <div className='mt-8'>
        <Suspense fallback={<div className='text-center py-8'>コメントを読み込み中...</div>}>
          <CommentList postId={postId} currentUserId={currentUserId} />
        </Suspense>
      </div>
    </div>
  )
}
