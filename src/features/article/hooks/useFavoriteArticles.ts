import { useQuery } from '@tanstack/react-query'

interface Article {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  content: string
  isCollected: boolean
  author?: {
    id: string
    username: string
  }
  imageUrl?: string
  className?: string
  introduction?: string
  classLocation?: string
  classType?: string
  fee?: number
  teachingMethod?: string
  technology?: string
  totalDays?: number
  weeklyHours?: number
  authorId?: string
}

interface ArticlesResponse {
  articles: Article[]
}

const fetchUserFavoriteArticles = async (userId: string): Promise<Article[]> => {
  if (!userId) return []

  const response = await fetch(`/api/articles/favorite?userId=${userId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch favorite articles')
  }
  const data: ArticlesResponse = await response.json()
  return data.articles
}

export const useFavoriteArticles = (userId: string) => {
  return useQuery({
    queryKey: ['favoriteArticles', userId],
    queryFn: () => fetchUserFavoriteArticles(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  })
}

export type { Article }
