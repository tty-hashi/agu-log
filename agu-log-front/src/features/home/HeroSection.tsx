'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  const { data: session } = useSession()

  return (
    <section className='relative h-[500px] flex items-center'>
      {/* 背景画像 */}
      <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-70" />

      {/* オーバーレイ */}
      <div className='absolute inset-0 bg-black/30' />

      {/* コンテンツ */}
      <div className='container relative z-10 text-white'>
        <h1 className='text-5xl font-bold mb-4 max-w-2xl'>
          農業の知見と経験をシェアする
          <br />
          専門コミュニティ
        </h1>
        <p className='text-xl mb-8 max-w-xl'>
          作物栽培のコツから最新農法まで、実践的な農業の知識を共有し、
          ともに成長するプラットフォームです。
        </p>

        {!session ? (
          <div className='flex gap-4'>
            <Button asChild size='lg' className='bg-green-600 hover:bg-green-700'>
              <Link href='/signin'>今すぐ参加する</Link>
            </Button>
            <Button
              asChild
              variant='outline'
              size='lg'
              className='bg-white/10 text-white border-white/30 hover:bg-white/20'>
              <Link href='#latest-posts'>記事を見る</Link>
            </Button>
          </div>
        ) : (
          <Button asChild size='lg' className='bg-green-600 hover:bg-green-700'>
            <Link href='/mypage'>マイページへ</Link>
          </Button>
        )}
      </div>
    </section>
  )
}
