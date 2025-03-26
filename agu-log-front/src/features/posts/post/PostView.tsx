import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import { ja } from 'date-fns/locale'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LikeButton } from './components/LikeButton/LikeButton'
import { PostWithRelations } from '@/app/[username]/articles/[postId]/page'
import CommentSection from './components/Comments/CommentSection'
import { EditButton } from './components/EditButton/EditButton'
import { Badge } from '@/components/ui/badge'
import { PostTags } from '@/features/tags/components/PostTags'

type ArticleViewProps = {
  post: PostWithRelations
  currentUserId?: string
}

export default function PostView({ post, currentUserId }: ArticleViewProps) {
  const publishedAt = post.publishedAt || post.createdAt
  const timeAgo = formatDistanceToNow(new Date(publishedAt), {
    addSuffix: true,
    locale: ja,
  })

  const isLike = post.likes.some((like) => like.userId === currentUserId)

  // 記事の所有者かどうかをチェック
  const isOwner = currentUserId === post.authorId

  // ユーザー名を取得
  const username = post.author.profile?.username || ''

  return (
    <Card className='max-w-4xl mx-auto p-6'>
      {/* 記事ヘッダー */}
      <header className='mb-8'>
        <div className='flex justify-between items-start mb-4'>
          <h1 className='text-3xl font-bold'>{post.title}</h1>
          {isOwner && <EditButton username={username} postId={post.postId || ''} />}
        </div>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <Avatar>
              <AvatarImage src={post.author.image || ''} />
              <AvatarFallback>{post.author.profile?.displayName?.[0] || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <div className='font-semibold'>{post.author.profile?.displayName || 'ゲスト'}</div>
              <div className='text-sm text-muted-foreground'>{timeAgo}</div>
            </div>
            <div className=''>
              <PostTypeBadge type={post.type} />

              <PostTags tags={post.tags} className='mt-4' />
            </div>
          </div>
        </div>
      </header>

      {/* 記事本文 */}
      <div
        className='prose prose-lg max-w-none'
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* フッター */}
      <footer className='mt-8 pt-8 border-t'>
        <div className='flex justify-between items-center'>
          <div className='text-sm text-muted-foreground'>
            公開日: {new Date(publishedAt).toLocaleDateString('ja-JP')}
          </div>
          <LikeButton
            postId={post.id}
            initialIsLiked={isLike}
            initialLikeCount={post._count.likes}
          />
        </div>
      </footer>

      {/* コメントセクション */}
      <CommentSection postId={post.id} />
    </Card>
  )
}

type PostTypeBadge = {
  type: string
}

const PostTypeBadge = ({ type }: PostTypeBadge) => {
  const getBadgeText = (type: string) => {
    switch (type) {
      case 'diary':
        return '日記'
      case 'poem':
        return 'ポエム'
      case 'tech':
        return '技術'
      case 'question':
        return '質問'
      case 'review':
        return 'レビュー'
      default:
        return null
    }
  }
  return (
    <Badge variant='outline' className='shrink-0'>
      {getBadgeText(type)}
    </Badge>
  )
}
