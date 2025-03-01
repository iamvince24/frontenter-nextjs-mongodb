import * as React from 'react'
import { CurrentUser, getCurrentUser } from '@/actions/getCurrentUser'
import FavoriteArticlePage from '@/features/article/pages/FavoriteArticlePage'

const ArticleCollection: React.FC = async () => {
  const currentUser = await getCurrentUser()

  return <FavoriteArticlePage currentUser={currentUser as CurrentUser} />
}

export default ArticleCollection
