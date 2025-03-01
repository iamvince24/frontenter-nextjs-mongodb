'use client'

import * as React from 'react'
import Link from 'next/link'
import { NavButton } from '@/components/ui/NavButton'
import { usePathname } from 'next/navigation'

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
    { path: '/profile/article/create', label: '新增文章' },
  ]

  return (
    <div>
      <div className="flex justify-center my-5">
        {navItems.map(item => (
          <Link href={item.path} key={item.path}>
            <NavButton active={pathname === item.path}>{item.label}</NavButton>
          </Link>
        ))}
      </div>
      {children}
    </div>
  )
}
