'use client'

import { startTransition, useOptimistic } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { HeartButton } from '@/components/Lv2/HeartButton/HeartButton'
import { toggleLike } from './action'

interface PostLikeButtonProps {
  postId: string
  initialLikeCount: number
  initialIsLiked: boolean
}

export function LikeButton({ postId, initialLikeCount, initialIsLiked }: PostLikeButtonProps) {
  const { data: session } = useSession()
  const router = useRouter()

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
    if (!session) {
      router.push('/signin')
      return
    }

    try {
      // 楽観的更新を実行
      startTransition(() => {
        updateOptimisticLike(1)
      })
      await toggleLike(postId)
    } catch (error) {
      toast.error('いいねの処理に失敗しました')
    }
  }

  return (
    <HeartButton
      isLiked={optimisticLike.isLiked}
      likeCount={optimisticLike.count}
      onClick={handleLikeClick}
    />
  )
}
