import LogInForm from '@/features/auth/components/LogInForm'
import { Suspense } from 'react'
import { LoadingSpinner } from '@/components/loading/LoadingSpinner'

export default function SignUpModal() {
  return (
    <Suspense fallback={<LoadingSpinner text="載入中..." />}>
      <LogInForm />
    </Suspense>
  )
}
