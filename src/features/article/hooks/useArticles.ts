import { useQuery } from '@tanstack/react-query'

export interface Article {
  id: string
  title: string
  content: string
  isPublic: boolean
  createdAt: string
  updatedAt: string
}

const fetchAllPublicArticles = async (): Promise<Article[]> => {
  const response = await fetch('/api/articles/public')

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || '獲取文章失敗')
  }

  return response.json()
}

export const useAllPublicArticles = () => {
  return useQuery<Article[], Error>({
    queryKey: ['articles', 'public'],
    queryFn: fetchAllPublicArticles,
  })
}
