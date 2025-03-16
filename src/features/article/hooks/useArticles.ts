import { useQuery } from '@tanstack/react-query'

export interface Article {
  id: string
  title: string
  content: string
  isPublic: boolean
  createdAt: string
  updatedAt: string
  isCollected: boolean
  imageUrl?: string
  author?: {
    id: string
    username: string
  }
}

export interface PaginationInfo {
  total: number
  totalPages: number
  currentPage: number
  limit: number
}

export interface ArticlesResponse {
  articles: Article[]
  pagination: PaginationInfo
}

const fetchAllPublicArticles = async (page: number = 1, limit: number = 8): Promise<ArticlesResponse> => {
  const response = await fetch(`/api/articles/public?page=${page}&limit=${limit}`)

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || '獲取文章失敗')
  }

  return response.json()
}

export const useAllPublicArticles = (page: number = 1, limit: number = 8) => {
  return useQuery<ArticlesResponse, Error>({
    queryKey: ['articles', 'public', page, limit],
    queryFn: () => fetchAllPublicArticles(page, limit),
  })
}
