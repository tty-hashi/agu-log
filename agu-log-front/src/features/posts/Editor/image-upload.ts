'use server'

import { getServerSession } from 'next-auth'
import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { v4 as uuidv4 } from 'uuid'
import { authOptions } from '@/lib/auth/config'

// 許可する画像形式
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
// 最大ファイルサイズ (2MB)
const MAX_FILE_SIZE = 2 * 1024 * 1024

export async function uploadImage(formData: FormData) {
  try {
    // セッションチェック
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return { error: '認証が必要です', status: 401 }
    }

    const file = formData.get('file') as File

    // ファイルのバリデーション
    if (!file) {
      return { error: 'ファイルが見つかりません', status: 400 }
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return { error: '許可されていないファイル形式です', status: 400 }
    }

    if (file.size > MAX_FILE_SIZE) {
      return { error: 'ファイルサイズは2MB以下にしてください', status: 400 }
    }

    // ファイルを ArrayBuffer に変換
    const buffer = await file.arrayBuffer()

    // Supabaseクライアントの初期化
    const supabase = await createClient()

    // ユニークなファイル名を生成
    const fileExt = file.name.split('.').pop()
    const fileName = `${uuidv4()}.${fileExt}`

    // 重要: ファイルパスをユーザーIDで始める (RLSポリシー用)
    const filePath = `${session.user.id}/${fileName}`

    // Supabaseストレージにアップロード
    const { error: uploadError } = await supabase.storage.from('images').upload(filePath, buffer, {
      contentType: file.type,
      upsert: false,
    })

    if (uploadError) {
      // eslint-disable-next-line no-console
      console.error('アップロードエラー:', uploadError)
      return { error: `ファイルのアップロードに失敗しました: ${uploadError.message}`, status: 500 }
    }

    // 公開URLを取得
    const {
      data: { publicUrl },
    } = supabase.storage.from('images').getPublicUrl(filePath)

    // 簡易的な幅と高さの設定（実際の画像サイズは使用せず）
    // 画像サイズの取得に問題がある場合の回避策
    const width = 800 // デフォルト値
    const height = 600 // デフォルト値

    // DBに画像情報を登録
    const image = await prisma.image.create({
      data: {
        userId: session.user.id,
        storageKey: filePath,
        originalFilename: file.name,
        mimeType: file.type,
        sizeBytes: file.size,
        width, // 簡易値
        height, // 簡易値
      },
    })

    return {
      success: true,
      id: image.id,
      url: publicUrl,
      width,
      height,
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('画像アップロードエラー:', error)
    return {
      error: `画像のアップロード処理中にエラーが発生しました: ${error instanceof Error ? error.message : String(error)}`,
      status: 500,
    }
  }
}
