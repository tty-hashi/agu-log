'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'sonner'

const EmailSignIn = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await signIn('email', { email, callbackUrl: '/' })
    } catch (error) {
      toast.error('サインインに失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  return (
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
      <Button type='submit' className='w-full bg-red-500 hover:bg-red-600' disabled={isLoading}>
        {isLoading ? '送信中...' : 'マジックリンクを送信'}
      </Button>
    </form>
  )
}

export default EmailSignIn
