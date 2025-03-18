import * as React from 'react'
import { CurrentUser, getCurrentUser } from '@/actions/getCurrentUser'
import SelfArticlePage from '@/features/article/pages/SelfArticlePage'
import { redirect } from 'next/navigation'

const ArticleSelf: React.FC = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    redirect('/login')
  }

  return <SelfArticlePage currentUser={currentUser as CurrentUser} />
}

export default ArticleSelf
