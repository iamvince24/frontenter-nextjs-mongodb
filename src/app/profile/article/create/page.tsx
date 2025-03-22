import ArticleFormPage from '@/features/article/pages/ArticleFormPage'
import { getCurrentUser } from '@/actions/getCurrentUser'
import { LoadingSpinner } from '@/components/loading/LoadingSpinner'
import { Suspense } from 'react'

const Create = async () => {
  const currentUser = await getCurrentUser()
  const authorId = currentUser?.id

  return (
    <Suspense fallback={<LoadingSpinner text="載入中..." />}>
      <ArticleFormPage authorId={authorId} />
    </Suspense>
  )
}

export default Create
