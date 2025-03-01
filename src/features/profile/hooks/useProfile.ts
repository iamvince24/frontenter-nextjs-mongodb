import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

export const profileFormSchema = z.object({
  id: z.string(),
  username: z
    .string({ required_error: 'Username 為必填欄位' })
    .regex(/^[a-zA-Z0-9_]*$/, '只能包含英文、數字及底線，不可包含空白及特殊符號'),
  bio: z.string(),
  email: z.string(),
})

type ProfileFormData = z.infer<typeof profileFormSchema>

export const useProfile = () => {
  const {
    data: profile,
    error: fetchError,
    refetch,
    isLoading,
  } = useQuery<ProfileFormData, Error>({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const response = await fetch('/api/profile/get')
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to fetch profile')
      }
      return response.json()
    },
  })

  return { profile, fetchError, refetch, isLoading }
}
