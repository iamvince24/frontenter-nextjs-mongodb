import { Menu } from 'lucide-react'
import { useState } from 'react'
import SearchInputComponent from '@/components/search/SearchInputComponent'
import Link from 'next/link'
import { NavButton } from '@/components/ui/NavButton'
import { signOut } from 'next-auth/react'
import { DialogDemo } from '@/components/dialog/DialogDemo'
import SignUpForm from '@/features/auth/components/SignUpForm'
import LogInForm from '@/features/auth/components/LogInForm'
import { Button } from '@/components/ui/button'
import { prefetchPublicArticles, debounce } from '@/lib/prefetch'

import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger } from '@/components/ui/drawer'

const MobileMenu = ({
  username,
  pathname,
  links,
}: {
  username?: string
  pathname: string
  links: { title: string; href: string; description: string }[]
}) => {
  const [open, setOpen] = useState(false)

  const onOpenChange = (open: boolean) => {
    setOpen(open)
  }

  // 創建延遲預取函數
  const debouncedPrefetchArticles = debounce(() => {
    prefetchPublicArticles(1)
  }, 300)

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="top">
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="flex items-center justify-center" aria-label="開啟選單">
          <Menu size={24} />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="w-full h-full">
        <div className="mt-8 px-4 flex flex-col gap-y-4 items-center">
          <SearchInputComponent placeholder="輸入關鍵字..." />

          {links?.map(link => (
            <Link
              href={link.href}
              key={link.title}
              prefetch={true}
              onClick={() => onOpenChange(false)}
              onTouchStart={() => {
                if (link.href === '/articles') {
                  debouncedPrefetchArticles()
                }
              }}
            >
              <NavButton active={pathname.startsWith(link.href)} className="w-full justify-center">
                {link.title}
              </NavButton>
            </Link>
          ))}

          {username ? (
            <>
              <Link href="/profile" onClick={() => onOpenChange(false)}>
                <NavButton active={pathname.startsWith('/profile')} className="w-full justify-center">
                  會員管理
                </NavButton>
              </Link>
              <NavButton onClick={() => signOut({ callbackUrl: '/' })} className="w-full justify-center">
                登出
              </NavButton>
            </>
          ) : (
            <>
              <DialogDemo name="註冊">
                <SignUpForm setOpen={setOpen} />
              </DialogDemo>
              <DialogDemo name="登入">
                <LogInForm setOpen={setOpen} />
              </DialogDemo>
            </>
          )}
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">關閉</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default MobileMenu
