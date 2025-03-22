import { getCurrentUser } from '@/actions/getCurrentUser'
import { LoadingSpinner } from '@/components/loading/LoadingSpinner'
import ProfilePage from '@/features/profile/page/ProfilePage'
import { Suspense } from 'react'

export default async function Profile() {
  const currentUser = await getCurrentUser()

  return (
    <Suspense fallback={<LoadingSpinner text="載入資料中..." />}>
      <ProfilePage currentUser={currentUser} />
    </Suspense>
  )
}
