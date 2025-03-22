import { CurrentUser, getCurrentUser } from '@/actions/getCurrentUser'
import FavoriteArticlePage from '@/features/article/pages/FavoriteArticlePage'
import { Suspense } from 'react'
import { LoadingSpinner } from '@/components/loading/LoadingSpinner'

const ArticleCollection: React.FC = async () => {
  const currentUser = await getCurrentUser()

  return (
    <Suspense fallback={<LoadingSpinner text="載入文章中..." />}>
      <FavoriteArticlePage currentUser={currentUser as CurrentUser} />
    </Suspense>
  )
}

export default ArticleCollection
