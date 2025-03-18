import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HeartButtonProps {
  likeCount: number
}

export function HeartComponent({ likeCount }: HeartButtonProps) {
  return (
    <div className={cn('text-muted-foreground flex items-center gap-2')}>
      <Heart className={cn('h-4 w-4')} />
      <span>{likeCount}</span>
    </div>
  )
}
