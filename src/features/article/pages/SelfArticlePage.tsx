'use client'

import ArticleCard from '../../../components/article/ArticleCard'
import { CurrentUser } from '@/actions/getCurrentUser'
import { useAuthorArticles } from '../../article/hooks/useAuthorArticles'
import { LoadingSpinner } from '@/components/loading/LoadingSpinner'
import { ErrorAlert } from '@/components/error/ErrorAlert'
import { EmptyState } from '@/components/feedback/EmptyState'
import { useEffect } from 'react'
import ArticlesGridLayout from '@/components/article/ArticlesGridLayout'

interface SelfArticlePageProps {
  currentUser: CurrentUser
}

const SelfArticlePage: React.FC<SelfArticlePageProps> = ({ currentUser }) => {
  const authorId = currentUser?.id

  const { data: articles, isLoading, error, isError, refetch } = useAuthorArticles(authorId)

  useEffect(() => {
    refetch()
  }, [refetch])

  if (isLoading) {
    return <LoadingSpinner text="載入文章中..." />
  }

  if (isError) {
    return <ErrorAlert error={error} />
  }

  if (articles && articles.length === 0) {
    return <EmptyState message="您尚未發表任何文章" />
  }

  return (
    <ArticlesGridLayout>
      {articles &&
        articles.map(article => {
          return (
            <ArticleCard
              key={article.id}
              articleData={article}
              userId={currentUser.id}
              isEditorAble={true}
              onSuccess={async () => {
                await refetch()
                return
              }}
            />
          )
        })}
    </ArticlesGridLayout>
  )
}

export default SelfArticlePage
