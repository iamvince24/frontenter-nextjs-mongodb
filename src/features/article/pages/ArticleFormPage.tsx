'use client'

import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { ArticleSchema } from '@/types/article'
import { ArticleForm } from '../components/ArticleFormPage'
import { useCreateArticle } from '../hooks/useCreateArticle'

type ArticleFormInputs = z.infer<typeof ArticleSchema>

export default function ArticleFormPage({ authorId }: { authorId: string | undefined }) {
  const router = useRouter()

  const createArticleMutation = useCreateArticle()

  const onSubmit = async (data: ArticleFormInputs) => {
    try {
      if (!data.imageUrl) {
        throw new Error('請上傳圖片')
      }

      await createArticleMutation.mutateAsync(data)

      router.push(`/profile/article/self`)
    } catch (error) {
      console.error('Failed to create article:', error)
      alert(error instanceof Error ? error.message : '提交失敗，請稍後再試')
    }
  }

  if (!authorId) {
    return <p>Please sign in to create an article.</p>
  }

  return (
    <div className="space-y-6 p-6">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">新增文章</h3>

      <ArticleForm onSubmit={onSubmit} />
    </div>
  )
}
