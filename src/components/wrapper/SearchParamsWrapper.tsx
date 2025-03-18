'use client'

import { ReactNode, Suspense } from 'react'
import { LoadingSpinner } from '@/components/loading/LoadingSpinner'

interface SearchParamsWrapperProps {
  children: ReactNode
  fallback?: ReactNode
}

export default function SearchParamsWrapper({
  children,
  fallback = <LoadingSpinner text="載入中..." />,
}: SearchParamsWrapperProps) {
  return <Suspense fallback={fallback}>{children}</Suspense>
}
