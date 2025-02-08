import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import { createClient } from '@supabase/supabase-js'
import prisma from '@/lib/prisma'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // service role keyを使用
)

export const authOptions: NextAuthOptions = {
  debug: true, // 開発時のみtrueに
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      async sendVerificationRequest({ identifier: email, url }) {
        try {
          const { error } = await supabase.auth.admin.createUser({
            email,
            email_confirm: true,
            user_metadata: { loginUrl: url },
          })

          if (error) throw error

          // Supabaseのメール機能を使用してメールを送信
          const { error: mailError } = await supabase.auth.signInWithOtp({
            email,
            options: {
              emailRedirectTo: url,
            },
          })

          if (mailError) throw mailError
        } catch (error) {
          console.error('Error sending verification email:', error)
          throw new Error('Failed to send verification email')
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request',
    error: 'error',
  },
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id
      }
      return session
    },
    async signIn({ user, account, profile }) {
      console.log('SignIn callback:', { user, account, profile })
      // ... 残りのコード
      return true
    },
    async redirect({ url, baseUrl }) {
      console.log('Redirect callback:', { url, baseUrl })
      return url.startsWith(baseUrl) ? url : baseUrl
    },
  },
  events: {
    createUser: async ({ user }) => {
      await prisma.profile.create({
        data: {
          id: user.id,
          displayName: user.name || 'ゲスト',
        },
      })
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
