'use client'

/**
 * 客戶端數據預取工具
 * 提供在用戶進入頁面前預取數據的功能
 */

/**
 * 預取公開文章數據（客戶端觸發）
 */
export const prefetchPublicArticles = async (page: number = 1, search?: string) => {
  try {
    const params = new URLSearchParams()
    params.set('page', page.toString())
    if (search) {
      params.set('search', search)
    }

    // 使用 fetch 預取數據，讓 RSC 緩存生效
    await fetch(`/api/prefetch/articles?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    // 靜默忽略預取錯誤
    console.debug('預取公開文章失敗:', error)
  }
}

/**
 * 預取收藏文章數據（客戶端觸發）
 */
export const prefetchFavoriteArticles = async (page: number = 1) => {
  try {
    const params = new URLSearchParams()
    params.set('page', page.toString())

    await fetch(`/api/prefetch/favorite-articles?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    // 靜默忽略預取錯誤
    console.debug('預取收藏文章失敗:', error)
  }
}

/**
 * 預取個人文章數據（客戶端觸發）
 */
export const prefetchSelfArticles = async (page: number = 1) => {
  try {
    const params = new URLSearchParams()
    params.set('page', page.toString())

    await fetch(`/api/prefetch/self-articles?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    // 靜默忽略預取錯誤
    console.debug('預取個人文章失敗:', error)
  }
}

/**
 * 通用延遲執行函數
 * 避免頻繁的 hover 觸發
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}
