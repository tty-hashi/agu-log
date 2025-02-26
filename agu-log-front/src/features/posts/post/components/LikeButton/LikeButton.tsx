'use client'

import { useOptimistic } from 'react'
import { toast } from 'sonner'
import { HeartButton } from '@/components/Lv2/HeartButton/HeartButton'
import { toggleLike } from './action'

interface PostLikeButtonProps {
  postId: string
  initialLikeCount: number
  initialIsLiked: boolean
}

export function LikeButton({ postId, initialLikeCount, initialIsLiked }: PostLikeButtonProps) {
  const [optimisticLike, updateOptimisticLike] = useOptimistic(
    { count: initialLikeCount, isLiked: initialIsLiked },
    ({ isLiked, count }, optimisticValue: number) => {
      return {
        count: isLiked ? count - optimisticValue : count + optimisticValue,
        isLiked: !isLiked,
      }
    },
  )

  const handleLikeClick = async () => {
    try {
      // 楽観的更新を実行
      updateOptimisticLike(1)
      await toggleLike(postId)
    } catch (error) {
      toast.error('いいねの処理に失敗しました')
    }
  }

  return (
    <form action={handleLikeClick}>
      <HeartButton isLiked={optimisticLike.isLiked} likeCount={optimisticLike.count} />
    </form>
  )
}
