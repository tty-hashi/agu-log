'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import GoogleSingIn from './components/GoogleSingIn'
import EmailSignIn from './components/EmailSignIn'

export const AuthContainer = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <Card className='w-full max-w-md mx-4'>
        <CardHeader className='space-y-2'>
          <CardTitle className='text-2xl text-center font-bold'>AGU Log</CardTitle>
          <CardDescription className='text-center'>農業の知見を共有しよう</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <GoogleSingIn />
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-gray-500'>または</span>
              </div>
            </div>
            <EmailSignIn />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
