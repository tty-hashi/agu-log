// src/app/page.tsx
import { Suspense } from 'react'
import { BaseLayout } from '@/components/layout/BaseLayout'
import HeroSection from '@/features/home/HeroSection'
import LatestPostsSection from '@/features/home/LatestPostsSection'
import PopularPostsSection from '@/features/home/PopularPostsSection'
import CommunitySection from '@/features/home/Community'
import CTASection from '@/features/home/CTASection'

// ISRで一日1回再検証するための設定
export const revalidate = 86400 // 24時間（秒単位）

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

        {/* 人気の投稿セクション - 変更 */}
        <section className='container'>
          <h2 className='text-3xl font-bold mb-8'>人気の投稿</h2>
          <Suspense fallback={<div className='h-64 animate-pulse bg-gray-100 rounded-lg'></div>}>
            <PopularPostsSection />
          </Suspense>
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
