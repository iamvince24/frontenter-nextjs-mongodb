import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { cn } from '@/lib/utils'
import Navbar from '@/components/page/navbar/Navbar'
import Footer from '@/components/page/footer/Footer'
import './globals.css'
import { getCurrentUser } from '@/actions/getCurrentUser'
import Providers from './providers'
import { LoadingSpinner } from '@/components/loading/LoadingSpinner'
import { Suspense } from 'react'
import { Toaster } from '@/components/ui/toaster'

// const inter = Inter({ subsets: ["latin"] });

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Front Enter',
  description:
    'Front-Enter 是專為有志成為前端工程師的學習者打造的平台，提供各種前端學習資源的整合與分類。我們蒐集、分析並分享關於前端課程、學習環境和最新技術趨勢的資訊，幫助您找到最適合自己的學習路徑。在 Front-Enter，您可以閱讀其他用戶分享的學習心得、收藏有用的文章，以及分享您自己的學習經驗，讓前端學習之路不再孤單。',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const getCurrentUsername = async () => {
    const currentUser = await getCurrentUser()
    return currentUser ? currentUser?.username : ''
  }

  const currentUsername = await getCurrentUsername()

  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-background font-sans antialiased flex flex-col', fontSans.variable)}>
        <Providers>
          <Navbar currentUsername={currentUsername} />
          <Suspense fallback={<LoadingSpinner text="載入中..." />}>{children}</Suspense>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
