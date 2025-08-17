import { getCurrentUser } from '@/actions/getCurrentUser'
import SelfArticlePage from '@/features/article/pages/SelfArticlePage'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { LoadingSpinner } from '@/components/loading/LoadingSpinner'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Front Enter｜我的文章',
  description: '管理您發表的所有文章，編輯、刪除或查看文章詳情。',
  keywords: '我的文章, 文章管理, 個人創作',
}

interface ArticleSelfPageProps {
  searchParams: {
    search?: string
    page?: string
  }
}

/**
 * 個人文章頁面
 * 使用 RSC 架構獲取和渲染使用者發表的文章列表
 */
const ArticleSelf = async ({ searchParams }: ArticleSelfPageProps) => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    redirect('/login')
  }

  return (
    <Suspense fallback={<LoadingSpinner text="載入個人文章中..." />}>
      <SelfArticlePage currentUser={currentUser} searchParams={searchParams} />
    </Suspense>
  )
}

export default ArticleSelf
