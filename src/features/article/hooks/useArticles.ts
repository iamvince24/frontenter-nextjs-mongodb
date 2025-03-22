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
  search: string | null
}

const fetchAllPublicArticles = async (
  page: number = 1,
  limit: number = 8,
  search: string | null = null,
): Promise<ArticlesResponse> => {
  const params = new URLSearchParams()
  params.append('page', page.toString())
  params.append('limit', limit.toString())

  if (search !== null) {
    params.append('search', search)
  }

  const response = await fetch(`/api/articles/public?${params.toString()}`)

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || '獲取文章失敗')
  }

  return response.json()
}

export const useAllPublicArticles = (page: number = 1, limit: number = 8, search: string | null = null) => {
  return useQuery<ArticlesResponse, Error>({
    queryKey: ['articles', 'public', page, limit, search],
    queryFn: () => fetchAllPublicArticles(page, limit, search),
  })
}
