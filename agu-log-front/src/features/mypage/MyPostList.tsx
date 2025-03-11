// src/features/mypage/MyPostsList.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PublishedPosts from './components/PublishedPosts'
import DraftPosts from './components/DraftPosts'

interface MyPostsListProps {
  userId: string
}

export default function MyPostsList({ userId }: MyPostsListProps) {
  return (
    <Tabs defaultValue='published' className='w-full'>
      <TabsList className='mb-4'>
        <TabsTrigger value='published'>公開済み</TabsTrigger>
        <TabsTrigger value='drafts'>下書き</TabsTrigger>
      </TabsList>
      <TabsContent value='published'>
        <PublishedPosts userId={userId} />
      </TabsContent>
      <TabsContent value='drafts'>
        <DraftPosts userId={userId} />
      </TabsContent>
    </Tabs>
  )
}
