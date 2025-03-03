'use client'

import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const getErrorMessage = (error: string | null) => {
  switch (error) {
    case 'OAuthAccountNotLinked':
      return {
        title: 'アカウントの連携エラー',
        description:
          'このメールアドレスは既に別の認証方法で登録されています。以前使用した認証方法でログインしてください。',
      }
    case 'AccessDenied':
      return {
        title: 'アクセスが拒否されました',
        description: '認証が拒否されました。別の認証方法を試すか、管理者に連絡してください。',
      }
    case 'EmailSignin':
      return {
        title: 'メール送信エラー',
        description:
          'ログインリンクの送信中にエラーが発生しました。メールアドレスを確認して、もう一度お試しください。',
      }
    default:
      return {
        title: '認証エラー',
        description: '認証中にエラーが発生しました。もう一度お試しください。',
      }
  }
}

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const { title, description } = getErrorMessage(error)

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <Card className='w-full max-w-md mx-4'>
        <CardHeader className='space-y-2'>
          <CardTitle className='text-2xl text-center font-bold'>{title}</CardTitle>
          <CardDescription className='text-center'>{description}</CardDescription>
        </CardHeader>
        <CardContent className='flex justify-center'>
          <Button asChild variant='ghost'>
            <Link href='/signin'>ログイン画面に戻る</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
