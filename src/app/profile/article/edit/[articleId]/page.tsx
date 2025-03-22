import ArticleFormPage from '@/features/article/pages/ArticleFormPage'
import { getCurrentUser } from '@/actions/getCurrentUser'
import { Suspense } from 'react'
import { LoadingSpinner } from '@/components/loading/LoadingSpinner'

const ArticleEdit = async () => {
  const currentUser = await getCurrentUser()
  const authorId = currentUser?.id

  return (
    <Suspense fallback={<LoadingSpinner text="載入文章中..." />}>
      <ArticleFormPage authorId={authorId} />
    </Suspense>
  )
}

export default ArticleEdit
