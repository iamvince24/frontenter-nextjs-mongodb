import * as React from "react";
import Link from "next/link";
import { NavButton } from "@/components/ui/NavButton";

export default async function ProfileTab({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div>
        <div className="flex justify-center">
          <Link href="/profile">
            <NavButton>會員資料</NavButton>
          </Link>
          <Link href="/profile/article/collection">
            <NavButton>文章蒐藏</NavButton>
          </Link>
          <Link href="/profile/article/self">
            <NavButton>自己的文章</NavButton>
          </Link>
          <Link href="/profile/article/create">
            <NavButton>新增文章</NavButton>
          </Link>
        </div>
        {children}
      </div>
    </>
  );
}
