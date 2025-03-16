'use client'

import ArticleCard from '@/components/article/ArticleCard'
import ArticlesGridLayout from '@/components/article/ArticlesGridLayout'
import { ErrorAlert } from '@/components/error/ErrorAlert'
import { EmptyState } from '@/components/feedback/EmptyState'
import { LoadingSpinner } from '@/components/loading/LoadingSpinner'
import { useAllPublicArticles } from '@/features/article/hooks/useArticles'
import { useSession } from 'next-auth/react'

export default function ArticlePage() {
  const { data: articles, isLoading, isError, error, refetch } = useAllPublicArticles()
  const { data: session } = useSession()

  if (isLoading) {
    return <LoadingSpinner text="載入文章中..." />
  }

  if (isError) {
    return <ErrorAlert error={error} />
  }

  if (articles && articles.length === 0) {
    return <EmptyState message="您尚未收藏任何文章" />
  }

  return (
    <ArticlesGridLayout>
      {articles?.map(article => (
        <ArticleCard
          key={article.id}
          articleData={article as any}
          userId={session?.user?.id as string}
          isEditorAble={false}
          onSuccess={async () => {
            await refetch()
            return
          }}
        />
      ))}
    </ArticlesGridLayout>
  )
}
