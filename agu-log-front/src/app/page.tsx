import { Suspense } from 'react'
import { BaseLayout } from '@/components/layout/BaseLayout'
import HeroSection from '@/features/home/HeroSection'
import LatestPostsSection from '@/features/home/LatestPostsSection'
import PopularPostsSection from '@/features/home/PopularPostsSection'
import CommunitySection from '@/features/home/Community'
import CTASection from '@/features/home/CTASection'
import TagCloud from '@/features/tags/TagCloud'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <BaseLayout>
      <div className='space-y-16 py-8'>
        {/* ヒーローセクション */}
        <HeroSection />

        {/* 最新記事セクション */}
        <section className='container'>
          <h2 className='text-3xl font-bold mb-8'>最新の記事</h2>
          <Suspense fallback={<div className='h-64 animate-pulse bg-gray-100 rounded-lg'></div>}>
            <LatestPostsSection />
          </Suspense>
        </section>

        {/* 人気の投稿セクション */}
        <section className='container'>
          <h2 className='text-3xl font-bold mb-8'>人気の投稿</h2>
          <Suspense fallback={<div className='h-64 animate-pulse bg-gray-100 rounded-lg'></div>}>
            <PopularPostsSection />
          </Suspense>
        </section>

        {/* 人気のタグセクション - 追加 */}
        <section className='container'>
          <Card>
            <CardHeader>
              <CardTitle>人気のタグ</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense
                fallback={<div className='h-10 animate-pulse bg-gray-100 rounded-lg'></div>}>
                <TagCloud limit={30} showCount={true} />
              </Suspense>
            </CardContent>
          </Card>
        </section>

        {/* コミュニティセクション */}
        <section className='container'>
          <h2 className='text-3xl font-bold mb-8'>アクティブユーザー</h2>
          <Suspense fallback={<div className='h-48 animate-pulse bg-gray-100 rounded-lg'></div>}>
            <CommunitySection />
          </Suspense>
        </section>

        {/* CTAセクション */}
        <CTASection />
      </div>
    </BaseLayout>
  )
}
