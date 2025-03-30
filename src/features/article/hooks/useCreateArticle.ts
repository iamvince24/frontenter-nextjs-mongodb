import { useMutation } from '@tanstack/react-query'

interface ArticleData {
  title: string
  content: string
  imageUrl: string
  isPublic: boolean
}

interface CreateArticleResponse {
  success: boolean
  article?: {
    id: string
    title: string
    content: string
    imageUrl: string
    isPublic: boolean
    deletedAt: Date | null
  }
  error?: string
}

export const useCreateArticle = () => {
  return useMutation<CreateArticleResponse, Error, ArticleData>({
    mutationFn: async (data: ArticleData) => {
      const response = await fetch('/api/article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to create article')
      }

      return response.json()
    },
  })
}
