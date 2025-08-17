import { Suspense } from 'react'
import { LoadingSpinner } from '@/components/loading/LoadingSpinner'
import ArticlesListPage from '@/features/article/pages/ArticlesListPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Front Enter｜文章',
  description: '閱讀其他用戶分享的學習心得、收藏有用的文章，以及分享您自己的學習經驗，讓前端學習之路不再孤單。',
  keywords: '文章, 部落格, 學習心得, 前端學習',
}

interface ArticlesPageProps {
  searchParams: {
    search?: string
    page?: string
  }
}

export default function ArticlesPage({ searchParams }: ArticlesPageProps) {
  return (
    <Suspense fallback={<LoadingSpinner text="載入文章中..." />}>
      <ArticlesListPage searchParams={searchParams} />
    </Suspense>
  )
}
