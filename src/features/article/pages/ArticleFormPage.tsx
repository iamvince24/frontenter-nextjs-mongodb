'use client'

import { z } from 'zod'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { ArticleSchema } from '@/types/article'
import { ArticleForm } from '../components/ArticleFormPage'
import { useCreateArticle } from '../hooks/useCreateArticle'
import { useArticle, useUpdateArticle } from '../hooks/useArticle'
import { LoadingSpinner } from '@/components/loading/LoadingSpinner'
import { ErrorAlert } from '@/components/error/ErrorAlert'

type ArticleFormInputs = z.infer<typeof ArticleSchema>

export default function ArticleFormPage({ authorId }: { authorId: string | undefined }) {
  const router = useRouter()
  const pathname = usePathname()
  const isInEditPage = pathname.startsWith('/profile/article/edit')

  const params = useParams()
  const articleId = params.articleId as string

  const { data: article, isLoading, isError, error } = useArticle(articleId)

  const createArticleMutation = useCreateArticle()

  const updateArticleMutation = useUpdateArticle(articleId)

  const onSubmit = async (data: ArticleFormInputs) => {
    try {
      if (!data.imageUrl) {
        throw new Error('請上傳圖片')
      }

      if (isInEditPage) {
        await updateArticleMutation.mutateAsync({
          title: data.title,
          content: data.content,
          imageUrl: data.imageUrl,
        })
      } else {
        await createArticleMutation.mutateAsync(data)
      }

      router.push(`/profile/article/self`)
    } catch (error) {
      console.error('Failed to create article:', error)
      alert(error instanceof Error ? error.message : '提交失敗，請稍後再試')
    }
  }

  if (!authorId) {
    return <p>Please sign in to create an article.</p>
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <ErrorAlert error={error} />
  }

  return (
    <div className="space-y-6 p-6">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{isInEditPage ? '編輯文章' : '新增文章'}</h3>

      <ArticleForm onSubmit={onSubmit} initialData={article} />
    </div>
  )
}
