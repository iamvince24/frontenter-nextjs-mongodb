'use client'

import ArticleCard from '@/components/article/ArticleCard'
import ArticlesGridLayout from '@/components/article/ArticlesGridLayout'
import { ErrorAlert } from '@/components/error/ErrorAlert'
import { EmptyState } from '@/components/feedback/EmptyState'
import { LoadingSpinner } from '@/components/loading/LoadingSpinner'
import { Button } from '@/components/ui/button'
import ArticlePagination from '@/features/article/components/ArticlePagination'
import { Article, useAllPublicArticles } from '@/features/article/hooks/useArticles'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function ArticlesListPage() {
  const { data: session } = useSession()
  const searchParams = useSearchParams()

  const search = searchParams.get('search')
  const currentPage = parseInt(searchParams.get('page') || '1')
  const ITEMS_PER_PAGE = 8

  const { data, isLoading, isError, error, refetch } = useAllPublicArticles(currentPage, ITEMS_PER_PAGE, search)

  const articles = data?.articles || []
  const totalPages = data?.pagination?.totalPages || 1

  if (isLoading) {
    return <LoadingSpinner text="載入文章中..." />
  }

  if (isError) {
    return <ErrorAlert error={error} />
  }

  if (articles.length === 0) {
    return <EmptyState message="沒有找到公開的文章" />
  }

  const clearSearchUrl = `/articles${currentPage > 1 ? `?page=${currentPage}` : ''}`

  return (
    <div className={`flex flex-col gap-16 ${search ? '' : 'mt-16'}`}>
      {search && (
        <div className="flex justify-center items-center gap-4">
          <div className="text-xl font-bold  ">搜尋結果：{search}</div>
          <Link href={clearSearchUrl} passHref>
            <Button variant="outline" size="sm">
              清除搜尋結果
            </Button>
          </Link>
        </div>
      )}

      <ArticlesGridLayout>
        {articles.map(article => (
          <ArticleCard
            key={article.id}
            articleData={article as Article}
            userId={session?.user?.id as string}
            isEditorAble={false}
            onSuccess={async () => {
              await refetch()
              return
            }}
          />
        ))}
      </ArticlesGridLayout>

      <ArticlePagination currentPage={currentPage} totalPages={totalPages} basePath="/articles" />
    </div>
  )
}
