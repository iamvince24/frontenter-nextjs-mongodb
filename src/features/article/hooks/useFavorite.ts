import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'

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
