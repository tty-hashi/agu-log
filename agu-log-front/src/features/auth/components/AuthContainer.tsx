'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import Image from 'next/image'

export const AuthContainer = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await signIn('email', { email, callbackUrl: '/' })
    } catch (error) {
      console.error('Error during sign in:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/', redirect: true })
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <Card className='w-full max-w-md mx-4'>
        <CardHeader className='space-y-2'>
          <CardTitle className='text-2xl text-center font-bold'>AGU Log</CardTitle>
          <CardDescription className='text-center'>農業の知見を共有しよう</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <Button variant='outline' className='w-full' onClick={handleGoogleSignIn}>
              <Image src='/google.svg' alt='Google' width={20} height={20} className='mr-2' />
              Googleでログイン
            </Button>

            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-gray-500'>または</span>
              </div>
            </div>

            <form onSubmit={handleEmailSignIn} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='email'>メールアドレス</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='name@example.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button
                type='submit'
                className='w-full bg-red-500 hover:bg-red-600'
                disabled={isLoading}>
                {isLoading ? '送信中...' : 'マジックリンクを送信'}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
