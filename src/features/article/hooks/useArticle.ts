import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'
import { Article } from './useFavoriteArticles'

export async function fetchArticleById(articleId: string): Promise<Article> {
  const response = await fetch(`/api/article/${encodeURIComponent(articleId)}`)

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to fetch article')
  }

  return response.json()
}

export function useArticle(
  articleId: string | undefined,
  options?: Omit<
    UseQueryOptions<Article, Error, Article, readonly ['article', string | undefined]>,
    'queryKey' | 'queryFn'
  >,
) {
  return useQuery({
    queryKey: ['article', articleId] as const,
    queryFn: () => {
      if (!articleId) throw new Error('Article ID is required')
      return fetchArticleById(articleId)
    },
    enabled: !!articleId,
    ...options,
  })
}

export interface UpdateArticleData {
  title?: string
  content?: string
  imageUrl?: string
}

export const updateArticle = async (articleId: string, data: UpdateArticleData) => {
  const response = await fetch(`/api/article/${articleId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || '更新文章失敗')
  }

  return response.json()
}

export const useUpdateArticle = (articleId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateArticleData) => updateArticle(articleId, data),
    onSuccess: updatedArticle => {
      queryClient.invalidateQueries({ queryKey: ['article', articleId] })
      queryClient.setQueryData(['article', articleId], updatedArticle)
    },
  })
}
