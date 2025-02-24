import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface HeartButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLiked: boolean
  likeCount: number
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-9 px-4',
  lg: 'h-10 px-6',
}

export function HeartButton({
  isLiked,
  likeCount,
  size = 'md',
  className,
  ...props
}: HeartButtonProps) {
  return (
    <Button
      variant='ghost'
      size='sm'
      className={cn(
        'gap-1 text-muted-foreground hover:text-foreground',
        isLiked && 'text-red-500 hover:text-red-600',
        sizeClasses[size],
        className,
      )}
      {...props}>
      <Heart className={cn('h-4 w-4', isLiked && 'fill-current')} />
      <span>{likeCount}</span>
    </Button>
  )
}
