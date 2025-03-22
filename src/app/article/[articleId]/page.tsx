import { LoadingSpinner } from '@/components/loading/LoadingSpinner'
import ArticleContentPage from '@/features/article/pages/ArticleContentPage'
import { Suspense } from 'react'

export default async function ArticlePage({ params }: { params: Promise<{ articleId: string }> }) {
  const { articleId } = await params
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
  const response = await fetch(`${baseUrl}/api/article/${encodeURIComponent(articleId)}`)

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to fetch article')
  }

  const article = await response.json()

  return (
    <Suspense fallback={<LoadingSpinner text="載入文章中..." />}>
      <ArticleContentPage article={article} />
    </Suspense>
  )
}
