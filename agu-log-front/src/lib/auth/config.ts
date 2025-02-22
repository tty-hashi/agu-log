import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import { createClient } from '@supabase/supabase-js'
import prisma from '@/lib/prisma'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === 'development',
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
    error: '/auth/error',
  },
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id
      }
      return session
    },
    signIn: async ({ user, account }) => {
      if (account?.provider === 'google') {
        await prisma.profile.update({
          where: { id: user.id },
          data: {
            avatarUrl: user.image || undefined,
          },
        })
      }
      return true
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
