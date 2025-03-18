'use client'

import ArticleCard from '@/components/article/ArticleCard'
import ArticlesGridLayout from '@/components/article/ArticlesGridLayout'
import { ErrorAlert } from '@/components/error/ErrorAlert'
import { EmptyState } from '@/components/feedback/EmptyState'
import { LoadingSpinner } from '@/components/loading/LoadingSpinner'
import ArticlePagination from '@/features/article/components/ArticlePagination'
import { Article, useAllPublicArticles } from '@/features/article/hooks/useArticles'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

export default function ArticlesListPage() {
  const { data: session } = useSession()
  const searchParams = useSearchParams()

  const currentPage = parseInt(searchParams.get('page') || '1')
  const ITEMS_PER_PAGE = 8

  const { data, isLoading, isError, error, refetch } = useAllPublicArticles(currentPage, ITEMS_PER_PAGE)

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

  return (
    <div>
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
