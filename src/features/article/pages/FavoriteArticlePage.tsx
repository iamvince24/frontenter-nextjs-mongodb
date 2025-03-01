'use client'

import ArticleCard from '../../../components/article/ArticleCard'
import { CurrentUser } from '@/actions/getCurrentUser'
import { useFavoriteArticles } from '../../article/hooks/useFavoriteArticles'
import { LoadingSpinner } from '@/components/loading/LoadingSpinner'
import { ErrorAlert } from '@/components/error/ErrorAlert'
import { EmptyState } from '@/components/feedback/EmptyState'
import { useEffect } from 'react'

const FavoriteArticlePage = ({ currentUser }: { currentUser: CurrentUser }) => {
  const userId = currentUser?.id as string

  const { data: collections, isLoading, isError, error, refetch } = useFavoriteArticles(userId)

  useEffect(() => {
    refetch()
  }, [refetch])

  if (isLoading) {
    return <LoadingSpinner text="載入文章中..." />
  }

  if (isError) {
    return <ErrorAlert error={error} />
  }

  if (collections && collections.length === 0) {
    return <EmptyState message="您尚未收藏任何文章" />
  }

  return (
    <div className="w-full">
      <div className="flex flex-row flex-wrap justify-center gap-6">
        {collections?.map(article => (
          <ArticleCard
            key={article.id}
            articleData={article as any}
            userId={userId}
            isEditorAble={false}
            onSuccess={async () => {
              await refetch()
              return
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default FavoriteArticlePage
