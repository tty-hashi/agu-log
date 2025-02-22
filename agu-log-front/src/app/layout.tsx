import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'sonner'
import { getServerSession } from 'next-auth'
import { isFirstLogin } from '@/lib/auth'
import { UsernameSetupModal } from '@/features/auth/components/UserNameSetupModal'
import { authOptions } from '@/lib/auth/config'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

export const metadata: Metadata = {
  title: 'AGU Log',
  description: '農業の知見を共有するプラットフォーム',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)
  const shouldShowUsernameSetup = session?.user && (await isFirstLogin(session.user.id))

  return (
    <html lang='ja' suppressHydrationWarning>
      <body className={`${geist.variable} font-sans antialiased`}>
        <Providers>
          {children} {shouldShowUsernameSetup && <UsernameSetupModal />}
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
