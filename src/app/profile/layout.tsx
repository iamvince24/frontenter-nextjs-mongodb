'use client'

import * as React from 'react'
import Link from 'next/link'
import { NavButton } from '@/components/ui/NavButton'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function ProfileTab({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  const navItems = [
    { path: '/profile', label: '會員資料' },
    { path: '/profile/article/collection', label: '文章蒐藏' },
    { path: '/profile/article/self', label: '自己的文章' },
  ]

  const isInCreatePage = pathname === '/profile/article/create'

  return (
    <div>
      <div className="flex justify-between items-center px-6">
        <div></div>

        <div className="flex justify-center my-5 gap-3 items-center">
          {navItems.map(item => (
            <Link href={item.path} key={item.path}>
              <NavButton active={pathname === item.path}>{item.label}</NavButton>
            </Link>
          ))}
        </div>

        {isInCreatePage ? (
          <Link href="/profile/article/self" className="justify-self-end">
            <Button size="sm">取消</Button>
          </Link>
        ) : (
          <Link href="/profile/article/create" className="justify-self-end">
            <Button size="sm">新增文章</Button>
          </Link>
        )}
      </div>

      {children}
    </div>
  )
}
