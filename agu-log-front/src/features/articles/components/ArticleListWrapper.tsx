import { Suspense } from 'react'
import ArticleList from './ArticleList'
import { Card } from '@/components/ui/card'

export default function ArticleListWrapper({ username }: { username: string }) {
  return (
    <Suspense
      fallback={
        <div className='space-y-4'>
          {[...Array(3)].map((_, i) => (
            <Card key={i} className='h-40 animate-pulse bg-gray-100' />
          ))}
        </div>
      }>
      <ArticleList username={username} />
    </Suspense>
  )
}
