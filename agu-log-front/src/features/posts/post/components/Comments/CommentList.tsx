import { formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale'
import prisma from '@/lib/prisma'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DeleteCommentButton } from './DeleteCommentButton'

interface CommentListProps {
  postId: string
  currentUserId?: string
}

export default async function CommentList({ postId, currentUserId }: CommentListProps) {
  const comments = await prisma.comment.findMany({
    where: { postId },
    orderBy: { createdAt: 'desc' },
    include: {
      author: {
        include: {
          profile: true,
        },
      },
    },
  })

  if (comments.length === 0) {
    return (
      <div className='text-center py-6 text-muted-foreground'>
        まだコメントはありません。最初のコメントを投稿しましょう！
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      {comments.map((comment) => (
        <div key={comment.id} className='p-4 border rounded-md'>
          <div className='flex justify-between items-start'>
            <div className='flex items-center gap-2'>
              <Avatar className='h-8 w-8'>
                <AvatarImage src={comment.author.image || ''} />
                <AvatarFallback>{comment.author.profile?.displayName?.[0] || 'U'}</AvatarFallback>
              </Avatar>
              <div>
                <div className='font-semibold text-sm'>
                  {comment.author.profile?.displayName || 'ゲスト'}
                </div>
                <div className='text-xs text-muted-foreground'>
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                    locale: ja,
                  })}
                </div>
              </div>
            </div>

            {currentUserId === comment.authorId && <DeleteCommentButton commentId={comment.id} />}
          </div>

          <div className='mt-2 text-sm'>{comment.content}</div>
        </div>
      ))}
    </div>
  )
}
