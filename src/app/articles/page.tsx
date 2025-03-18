'use client'

import { Suspense } from 'react'
import { LoadingSpinner } from '@/components/loading/LoadingSpinner'
import ArticlesListPage from '@/features/article/pages/ArticlesListPage'

export default function ArticlePage() {
  return (
    <Suspense fallback={<LoadingSpinner text="載入文章中..." />}>
      <ArticlesListPage />
    </Suspense>
  )
}
