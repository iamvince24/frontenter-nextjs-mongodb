import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

export const profileFormSchema = z.object({
  username: z
    .string({ required_error: 'Username 為必填欄位' })
    .regex(/^[a-zA-Z0-9_]*$/, '只能包含英文、數字及底線，不可包含空白及特殊符號'),
  bio: z.string(),
})

type ProfileFormData = z.infer<typeof profileFormSchema>

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation<any, Error, ProfileFormData>({
    mutationFn: async (data: ProfileFormData) => {
      const response = await fetch('/api/profile/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update profile')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      queryClient.invalidateQueries({ queryKey: ['userProfile'] })
    },
  })
}
