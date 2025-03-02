'use client'

import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { ArticleSchema } from '@/types/article'
import { ArticleForm } from '../components/ArticleFormPage'

type ArticleFormInputs = z.infer<typeof ArticleSchema>

export default function ArticleFormPage({ authorId }: { authorId: string | undefined }) {
  const router = useRouter()

  const onSubmit = async (data: ArticleFormInputs) => {
    try {
      if (!data.imageUrl) {
        throw new Error('請上傳圖片')
      }

      const response = await fetch('/api/article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.error || responseData.message || 'Failed to create article')
      }

      router.push(`/profile/article/self`)
    } catch (error) {
      console.error('Error submitting form:', error)
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
