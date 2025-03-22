import { LoadingSpinner } from '@/components/loading/LoadingSpinner'
import SignUpForm from '@/features/auth/components/SignUpForm'
import { Suspense } from 'react'

export default function SignUpModal() {
  return (
    <Suspense fallback={<LoadingSpinner text="載入中..." />}>
      <SignUpForm />
    </Suspense>
  )
}
