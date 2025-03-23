import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

interface UseDeleteArticleProps {
  onSuccess?: () => void
  redirectTo?: string
}

export const useDeleteArticle = ({ onSuccess, redirectTo }: UseDeleteArticleProps = {}) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const softDeleteArticleById = async (articleId: string): Promise<{ message: string }> => {
    const response = await fetch(`/api/article/${articleId}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || '刪除文章失敗')
    }

    return response.json()
  }

  const { mutate: deleteArticle, isPending: isDeleting } = useMutation({
    mutationFn: softDeleteArticleById,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
      queryClient.invalidateQueries({ queryKey: ['userArticles'] })
      queryClient.invalidateQueries({ queryKey: ['article'] })

      if (onSuccess) {
        onSuccess()
      }

      if (redirectTo) {
        router.push(redirectTo)
      }
    },
  })

  return {
    deleteArticle,
    isDeleting,
  }
}
