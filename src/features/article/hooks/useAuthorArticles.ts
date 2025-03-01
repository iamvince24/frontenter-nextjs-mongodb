import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { Article } from './useFavoriteArticles'

export function useAuthorArticles(authorId: string) {
  const { data: session } = useSession()
  const currentUserId = session?.user?.id

  return useQuery<Article[]>({
    queryKey: ['articles', authorId, currentUserId],
    queryFn: async () => {
      const url = currentUserId ? `/api/articles/${authorId}?userId=${currentUserId}` : `/api/articles/${authorId}`

      const response = await fetch(url)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch articles')
      }

      return response.json()
    },
    enabled: !!authorId,
  })
}
