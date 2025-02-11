import { BaseLayout } from '@/components/layout/BaseLayout'
import ArticleForm from '@/features/articles/components/ArticleForm'

export default function NewArticlePage() {
  return (
    <BaseLayout>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-2xl font-bold mb-6'>記事の作成</h1>
        <ArticleForm />
      </div>
    </BaseLayout>
  )
}
