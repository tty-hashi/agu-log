'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function LoginPage() {
  const supabase = createClientComponentClient()
  const appearance = {
    theme: ThemeSupa,
    variables: {
      default: {
        colors: {
          brand: 'red',
          brandAccent: 'darkred',
        },
      },
    },
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <Auth
        supabaseClient={supabase}
        appearance={appearance}
        providers={['google']} // 使用したいプロバイダーを指定
        redirectTo={`${location.origin}/auth/callback`}
        theme='dark' // または "light"
        localization={{
          variables: {
            sign_up: {
              link_text: 'アカウントをお持ちでない方',
              email_label: 'メールアドレス',
              password_label: 'パスワード',
              email_input_placeholder: 'メールアドレス',
              password_input_placeholder: 'パスワード',
              button_label: '登録',
              loading_button_label: '送信中',
              confirmation_text: '確認メールを送信しました。',
            },
            sign_in: {
              link_text: '既にアカウントをお持ちの方',
              email_label: 'メールアドレス',
              password_label: 'パスワード',
              email_input_placeholder: 'メールアドレス',
              password_input_placeholder: 'パスワード',
              loading_button_label: '送信中',
              button_label: 'ログイン',
            },
            forgotten_password: {
              link_text: 'パスワードをお忘れの方',
              email_label: 'メールアドレス',
              button_label: '送信',
              email_input_placeholder: 'メールアドレス',
              loading_button_label: '送信中',
              confirmation_text: 'パスワードリセットのリンクを送信しました。',
            },
          },
        }}
      />
    </div>
  )
}
