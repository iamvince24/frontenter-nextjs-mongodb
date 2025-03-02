import * as React from 'react'
import ArticleFormPage from '@/features/article/pages/ArticleFormPage'
import { getCurrentUser } from '@/actions/getCurrentUser'

const ArticleEdit = async () => {
  const currentUser = await getCurrentUser()
  const authorId = currentUser?.id

  return <ArticleFormPage authorId={authorId} />
}

export default ArticleEdit
