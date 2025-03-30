import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'

interface FavoriteParams {
  userId: string
  articleId: string
}

export function useFavorite({
  userId,
  articleId,
  isCollected,
  onSuccess,
}: {
  userId: string
  articleId: string
  isCollected: boolean | undefined
  onSuccess?: () => Promise<void>
}) {
  const { toast } = useToast()

  const addFavoriteMutation = useMutation({
    mutationFn: async (params: FavoriteParams) => {
      const response = await fetch('/api/articles/favorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })

      if (!response.ok) {
        throw new Error('Failed to add article to favorites')
      }

      return response.json()
    },
    onSuccess: async () => {
      toast({
        title: '已加入收藏',
        description: '文章已成功加入您的收藏列表',
        duration: 2000,
      })
      await onSuccess?.()
    },
    onError: error => {
      console.error('An error occurred while adding article to favorites', error)
    },
  })

  const removeFavoriteMutation = useMutation({
    mutationFn: async (params: FavoriteParams) => {
      const response = await fetch('/api/articles/favorite', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })

      if (!response.ok) {
        throw new Error('Failed to remove article from favorites')
      }

      return response.json()
    },
    onSuccess: async () => {
      toast({
        title: '已移除收藏',
        description: '文章已從您的收藏列表中移除',
        duration: 2000,
      })
      await onSuccess?.()
    },
    onError: error => {
      console.error('An error occurred while removing article from favorites', error)
    },
  })

  const toggleFavorite = async () => {
    const params = { userId, articleId }

    if (isCollected) {
      await removeFavoriteMutation.mutateAsync(params)
    } else {
      await addFavoriteMutation.mutateAsync(params)
    }
  }

  const isLoading = addFavoriteMutation.isPending || removeFavoriteMutation.isPending

  return {
    toggleFavorite,
    isLoading,
  }
}
