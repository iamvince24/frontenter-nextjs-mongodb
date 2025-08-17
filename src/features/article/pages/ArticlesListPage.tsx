import ArticleCard from '@/components/article/ArticleCard'
import ArticlesGridLayout from '@/components/article/ArticlesGridLayout'
import { EmptyState } from '@/components/feedback/EmptyState'
import { Button } from '@/components/ui/button'
import ArticlePagination from '@/features/article/components/ArticlePagination'
import { getPublicArticles, prefetchNextPublicArticles } from '@/lib/articles'
import { getCurrentUser } from '@/actions/getCurrentUser'
import Link from 'next/link'

interface ArticlesListPageProps {
  searchParams: {
    search?: string
    page?: string
  }
}

/**
 * 文章列表頁面 - RSC 組件
 * 使用 Server Components 進行資料獲取和渲染
 */
export default async function ArticlesListPage({ searchParams }: ArticlesListPageProps) {
  // 從 URL 參數獲取搜尋和分頁資訊
  const search = searchParams.search || null
  const currentPage = parseInt(searchParams.page || '1')
  const ITEMS_PER_PAGE = 9

  // 獲取當前使用者資訊
  const currentUser = await getCurrentUser()

  try {
    // 在伺服器端獲取文章資料
    const { articles, pagination } = await getPublicArticles(currentPage, ITEMS_PER_PAGE, search)
    const totalPages = pagination.totalPages

    // 預取下一頁數據（如果有下一頁）
    if (currentPage < totalPages) {
      // 在背景預取下一頁數據，不阻塞當前渲染
      prefetchNextPublicArticles(currentPage, ITEMS_PER_PAGE, search).catch(() => {
        // 靜默忽略預取錯誤
      })
    }

    // 如果沒有找到文章，顯示空狀態
    if (articles.length === 0) {
      return <EmptyState message="沒有找到公開的文章" />
    }

    // 構建清除搜尋結果的 URL
    const clearSearchUrl = `/articles${currentPage > 1 ? `?page=${currentPage}` : ''}`

    return (
      <div className={`flex flex-col gap-16 ${search ? '' : 'mt-16'}`}>
        {/* 搜尋結果標題和清除按鈕 */}
        {search && (
          <div className="flex justify-center items-center gap-4">
            <div className="text-xl font-bold">搜尋結果：{search}</div>
            <Link href={clearSearchUrl} passHref>
              <Button variant="outline" size="sm">
                清除搜尋結果
              </Button>
            </Link>
          </div>
        )}

        {/* 文章網格佈局 */}
        <ArticlesGridLayout>
          {articles.map((article, index) => (
            <ArticleCard
              key={article.id}
              articleData={article}
              userId={currentUser?.id}
              isEditorAble={false}
              index={index}
            />
          ))}
        </ArticlesGridLayout>

        {/* 分頁組件 */}
        <ArticlePagination currentPage={currentPage} totalPages={totalPages} basePath="/articles" />
      </div>
    )
  } catch (error) {
    console.error('載入文章列表時發生錯誤:', error)
    return <EmptyState message="載入文章時發生錯誤，請稍後再試" />
  }
}
