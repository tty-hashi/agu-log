import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function VerifyRequestPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <Card className='w-full max-w-md mx-4'>
        <CardHeader className='space-y-2'>
          <CardTitle className='text-2xl text-center font-bold'>メールを確認してください</CardTitle>
          <CardDescription className='text-center'>
            認証用のリンクを記載したメールを送信しました。
            メールのリンクをクリックしてログインを完了してください。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='text-sm text-gray-500 text-center'>
            <p>メールが届かない場合は、以下をご確認ください：</p>
            <ul className='mt-4 space-y-2 list-disc list-inside'>
              <li>迷惑メールフォルダに振り分けられていないか</li>
              <li>メールアドレスが正しく入力されているか</li>
              <li>メールサーバーの遅延が発生していないか</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
