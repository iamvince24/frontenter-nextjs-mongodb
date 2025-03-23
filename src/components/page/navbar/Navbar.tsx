'use client'

import React, { Suspense, useEffect, useState } from 'react'
import Image from 'next/image'
import { NavButton } from '@/components/ui/NavButton'
import Link from 'next/link'
import { DialogDemo } from '@/components/dialog/DialogDemo'
import SignUpForm from '../../../features/auth/components/SignUpForm'
import LogInForm from '../../../features/auth/components/LogInForm'
import { signOut, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import SearchInputComponent from '@/components/search/SearchInputComponent'
import { LoadingSpinner } from '@/components/loading/LoadingSpinner'
import MobileMenu from './MobileMenu'

const links: { title: string; href: string; description: string }[] = [
  {
    title: '文章',
    href: '/articles',
    description: 'A modal dialog that interrupts the user with important content and expects a response.',
  },
]

function Navbar({ currentUsername: initialUsername }: { currentUsername?: string }) {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const [username, setUsername] = useState<string | undefined>(initialUsername)

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      setUsername(session.user.name || initialUsername)
    } else if (status === 'unauthenticated') {
      setUsername(undefined)
    }
  }, [session, status, initialUsername])

  return (
    <header className="w-full h-28 bg-gray-100 flex flex-row justify-between items-center pl-3 pr-4">
      <Link href="/" prefetch={true}>
        <Image width={403} height={195} src="/feLogo.png" alt="feLogo" className="w-36 min-w-[100px]" />
      </Link>

      <div className="md:hidden">
        <MobileMenu username={username} pathname={pathname} links={links} />
      </div>

      <div className="hidden md:flex gap-x-0 sm:gap-x-4 md:gap-x-8">
        <Suspense fallback={<LoadingSpinner text="載入文章中..." />}>
          <SearchInputComponent placeholder="輸入關鍵字..." />
        </Suspense>
        {links?.map(link => {
          return (
            <Link href={link.href} key={link.title} prefetch={true}>
              <NavButton active={pathname.startsWith(link.href)}>{link.title}</NavButton>
            </Link>
          )
        })}
        {username ? (
          <>
            <Link href="/profile">
              <NavButton active={pathname.startsWith('/profile')}>會員管理</NavButton>
            </Link>

            <NavButton onClick={() => signOut({ callbackUrl: '/' })}>登出</NavButton>
          </>
        ) : (
          <>
            <DialogDemo name="註冊">
              <SignUpForm />
            </DialogDemo>
            <DialogDemo name="登入">
              <LogInForm />
            </DialogDemo>
          </>
        )}
      </div>
    </header>
  )
}

export default Navbar
