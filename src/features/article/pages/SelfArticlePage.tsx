import ArticleCard from '../../../components/article/ArticleCard'
import { CurrentUser } from '@/actions/getCurrentUser'
import { EmptyState } from '@/components/feedback/EmptyState'
import ArticlesGridLayout from '@/components/article/ArticlesGridLayout'
import { getAuthorArticles, prefetchNextAuthorArticles } from '@/lib/articles'
import dynamic from 'next/dynamic'

const ArticlePagination = dynamic(() => import('@/features/article/components/ArticlePagination'), {
  loading: () => <div className="h-12 w-full" />,
})

interface SelfArticlePageProps {
  currentUser: CurrentUser
  searchParams: {
    page?: string
  }
}

/**
 * 個人文章頁面 - RSC 組件
 * 使用 Server Components 進行資料獲取和渲染，支援分頁功能
 */
const SelfArticlePage = async ({ currentUser, searchParams }: SelfArticlePageProps) => {
  const authorId = currentUser?.id

  if (!authorId) {
    return <EmptyState message="請先登入以查看個人文章" />
  }

  // 從 URL 參數獲取分頁資訊
  const currentPage = parseInt(searchParams.page || '1')
  const ITEMS_PER_PAGE = 9

  try {
    // 在伺服器端獲取作者文章資料（支援分頁）
    const { articles, pagination } = await getAuthorArticles(authorId, authorId, currentPage, ITEMS_PER_PAGE)
    const totalPages = pagination.totalPages

    // 預取下一頁數據（如果有下一頁）
    if (currentPage < totalPages) {
      // 在背景預取下一頁數據，不阻塞當前渲染
      prefetchNextAuthorArticles(authorId, authorId, currentPage, ITEMS_PER_PAGE).catch(() => {
        // 靜默忽略預取錯誤
      })
    }

    if (articles.length === 0 && currentPage === 1) {
      return <EmptyState message="您尚未發表任何文章" />
    }

    if (articles.length === 0 && currentPage > 1) {
      return <EmptyState message="此頁面沒有文章" />
    }

    return (
      <div className="flex flex-col gap-16">
        {/* 文章網格佈局 */}
        <ArticlesGridLayout>
          {articles.map((article, index) => (
            <ArticleCard
              key={article.id}
              articleData={article}
              userId={currentUser.id}
              isEditorAble={true}
              index={index}
            />
          ))}
        </ArticlesGridLayout>

        {/* 分頁組件 */}
        {totalPages > 1 && (
          <ArticlePagination currentPage={currentPage} totalPages={totalPages} basePath="/profile/article/self" />
        )}
      </div>
    )
  } catch (error) {
    console.error('載入個人文章時發生錯誤:', error)
    return <EmptyState message="載入個人文章時發生錯誤，請稍後再試" />
  }
}

export default SelfArticlePage
