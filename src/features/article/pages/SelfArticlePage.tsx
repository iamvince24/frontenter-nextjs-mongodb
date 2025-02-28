'use client'

import ArticleCard from '../../../components/article/ArticleCard'
import { CurrentUser } from '@/actions/getCurrentUser'
import { useAuthorArticles } from '../../article/hooks/useAuthorArticles'
import { Spinner } from '@/components/ui/spinner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { FaExclamationTriangle } from 'react-icons/fa'
import { Card, CardContent, CardDescription } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/loading/LoadingSpinner'

interface SelfArticlePageProps {
  currentUser: CurrentUser
}

const SelfArticlePage: React.FC<SelfArticlePageProps> = ({ currentUser }) => {
  const authorId = currentUser.id

  const { data: articles, isLoading, error } = useAuthorArticles(authorId)

  if (isLoading) {
    return <LoadingSpinner text="載入文章中..." />
  }

  if (error) {
    return (
      <div className="w-full py-10 px-4 max-w-3xl mx-auto">
        <Alert variant="destructive">
          <FaExclamationTriangle className="h-4 w-4" />
          <AlertTitle>載入失敗</AlertTitle>
          <AlertDescription>無法載入文章: {error instanceof Error ? error.message : '未知錯誤'}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (articles && articles.length === 0) {
    return (
      <div className="w-full py-20 flex justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <CardDescription className="text-base">您尚未發表任何文章</CardDescription>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex flex-row flex-wrap justify-center gap-6">
        {articles &&
          articles.map(article => {
            return (
              <ArticleCard
                key={article.id}
                articleData={article}
                // isEditorAble={isEditorAble}
                // isFavorite={favoriteArticles?.includes(article.id) || }
              />
            )
          })}
      </div>
    </div>
  )
}

export default SelfArticlePage
