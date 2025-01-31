import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    // codeを使用してセッションを確立
    await supabase.auth.exchangeCodeForSession(code)
  }

  // 認証後のリダイレクト先（例：ダッシュボード）
  return NextResponse.redirect(new URL('/', request.url))
}
