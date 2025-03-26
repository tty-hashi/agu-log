// APIエラーのための型定義
export interface ApiError extends Error {
  info?: unknown
  status?: number
}

// Fetch APIを使用するfetcher
export const fetcherWithFetch = async <T>(url: string): Promise<T> => {
  const res = await fetch(url)

  if (!res.ok) {
    const error = new Error('APIリクエストに失敗しました') as ApiError
    // 型安全にエラー情報を拡張
    try {
      error.info = await res.json()
    } catch {
      error.info = { message: 'レスポンスの解析に失敗しました' }
    }
    error.status = res.status
    throw error
  }

  return res.json() as Promise<T>
}

export const fetcher = fetcherWithFetch
