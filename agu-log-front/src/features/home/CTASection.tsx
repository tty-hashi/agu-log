'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export default function CTASection() {
  const { data: session } = useSession()

  if (session) {
    // ログイン済みの場合は別のCTAを表示
    return (
      <section className='bg-gray-100 py-16'>
        <div className='container text-center'>
          <h2 className='text-3xl font-bold mb-4'>あなたの農業体験を共有しませんか？</h2>
          <p className='text-lg mb-8 max-w-2xl mx-auto'>
            成功体験も失敗談も、すべて次世代の農家さんの財産になります。
            あなたの知識を記事にして共有しましょう。
          </p>
          <Button asChild size='lg'>
            <Link href='#'>新しい記事を書く</Link>
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className='bg-green-600 text-white py-16'>
      <div className='container text-center'>
        <h2 className='text-3xl font-bold mb-4'>農業の知見を共有・取得しよう</h2>
        <p className='text-lg mb-8 max-w-2xl mx-auto'>
          AGU Logは、農業に携わる全ての人のための知識共有プラットフォームです。
          あなたの経験を共有したり、他の農家からのアドバイスを得たりできます。
        </p>
        <Button asChild size='lg' className='bg-white text-green-600 hover:bg-white/90'>
          <Link href='/signin'>無料で始める</Link>
        </Button>
      </div>
    </section>
  )
}
