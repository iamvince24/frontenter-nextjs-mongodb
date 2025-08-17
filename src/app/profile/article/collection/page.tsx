import { getCurrentUser } from '@/actions/getCurrentUser'
import FavoriteArticlePage from '@/features/article/pages/FavoriteArticlePage'
import { Suspense } from 'react'
import { LoadingSpinner } from '@/components/loading/LoadingSpinner'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Front Enter｜收藏文章',
  description: '查看您收藏的所有文章，輕鬆管理您感興趣的學習內容。',
  keywords: '收藏文章, 我的收藏, 學習資源',
}

interface ArticleCollectionPageProps {
  searchParams: {
    search?: string
    page?: string
  }
}

/**
 * 收藏文章頁面
 * 使用 RSC 架構獲取和渲染收藏的文章列表
 */
const ArticleCollection = async ({ searchParams }: ArticleCollectionPageProps) => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">請先登入</h2>
          <p className="text-gray-600">您需要登入才能查看收藏的文章</p>
        </div>
      </div>
    )
  }

  return (
    <Suspense fallback={<LoadingSpinner text="載入收藏文章中..." />}>
      <FavoriteArticlePage currentUser={currentUser} searchParams={searchParams} />
    </Suspense>
  )
}

export default ArticleCollection
