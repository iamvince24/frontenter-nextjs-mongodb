'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { CurrentUser } from '@/actions/getCurrentUser'
import ProfileForm from '../components/ProfileForm'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileFormSchema, useUpdateProfile } from '../hooks/useUpdateProfile'
import { useProfile } from '../hooks/useProfile'
import { LoadingSpinner } from '@/components/loading/LoadingSpinner'
interface ProfilePageProps {
  currentUser: CurrentUser | null
}

type ProfileFormValues = z.infer<typeof profileFormSchema>

const ProfilePage = ({ currentUser }: ProfilePageProps) => {
  const { profile, refetch, isLoading } = useProfile()

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    username: profile?.username || '',
    email: profile?.email || '',
    bio: profile?.bio || '',
  })

  const { mutateAsync: updateProfile, isPending } = useUpdateProfile()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: formData.username,
      bio: formData.bio,
    },
  })

  if (isLoading) {
    return <LoadingSpinner text="載入資料中..." />
  }

  if (!profile?.id) {
    return <p>Please sign in.</p>
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSubmit = async (values: ProfileFormValues) => {
    await updateProfile(values)
    await refetch()
    setFormData({ ...formData, ...values })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <div className="container mx-auto p-4 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h2 className="text-2xl font-bold">會員資料</h2>
          {!isEditing && (
            <Button type="button" onClick={handleEdit}>
              編輯資料
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <ProfileForm
              profile={profile}
              isLoading={isLoading || isPending}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              form={form}
            />
          ) : (
            <div className="space-y-4">
              <div className="w-full">
                <h3 className="text-base text-gray-700 font-bold">使用者名稱：</h3>
                <p className="mt-1 text-gray-900">{profile?.username}</p>
              </div>
              <div className="w-full">
                <h3 className="text-base text-gray-700 font-bold">電子郵件：</h3>
                <p className="mt-1 text-gray-900">{profile?.email}</p>
              </div>
              <div className="w-full">
                <h3 className="text-base text-gray-700 font-bold">自我介紹：</h3>
                <p className="mt-1 text-gray-900">{profile?.bio || '尚未填寫'}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfilePage
