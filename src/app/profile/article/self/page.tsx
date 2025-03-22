import { CurrentUser, getCurrentUser } from '@/actions/getCurrentUser'
import SelfArticlePage from '@/features/article/pages/SelfArticlePage'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { LoadingSpinner } from '@/components/loading/LoadingSpinner'

const ArticleSelf: React.FC = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    redirect('/login')
  }

  return (
    <Suspense fallback={<LoadingSpinner text="載入文章中..." />}>
      <SelfArticlePage currentUser={currentUser as CurrentUser} />
    </Suspense>
  )
}

export default ArticleSelf
