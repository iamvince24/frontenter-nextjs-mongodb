import * as React from 'react'
import ArticleForm from '@/features/article/pages/ArticleFormPage'
import { getCurrentUser } from '@/actions/getCurrentUser'

const Create = async () => {
  const currentUser = await getCurrentUser()
  const authorId = currentUser?.id

  return <ArticleForm authorId={authorId} />
}

export default Create
