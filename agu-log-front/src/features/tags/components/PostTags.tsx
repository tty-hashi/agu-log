import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { PostWithRelations } from '@/app/[username]/articles/[postId]/page'

interface PostTagsProps {
  tags: PostWithRelations['tags']
  className?: string
}

export function PostTags({ tags, className = '' }: PostTagsProps) {
  if (!tags || tags.length === 0) return null

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((postTag) => (
        <Link key={postTag.tag.id} href={`/tags/${postTag.tag.slug}`}>
          <Badge
            variant='outline'
            className='hover:bg-accent cursor-pointer transition-colors flex items-center gap-1 px-3 py-1'>
            <span>{postTag.tag.name}</span>
          </Badge>
        </Link>
      ))}
    </div>
  )
}
