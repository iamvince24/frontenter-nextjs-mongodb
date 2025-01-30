"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { NavButton } from "@/components/ui/NavButton";
import Link from "next/link";
import { DialogDemo } from "@/components/dialog/DialogDemo";
import SignUpForm from "../auth/SignUpForm";
import LogInForm from "../auth/LogInForm";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { SessionProvider } from "next-auth/react";

const links: { title: string; href: string; description: string }[] = [
  {
    title: "文章",
    href: "/article",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
];

function Navbar({ currentUsername }: { currentUsername?: string }) {
  const path = usePathname();
  const isAdmin = path.includes("/profile");

  return (
    <header className="w-full h-28 bg-gray-100 flex flex-row justify-between items-center pl-3 pr-4">
      <Link href="/">
        <Image
          width={403}
          height={195}
          src="/feLogo.png"
          alt="feLogo"
          className="w-36"
        />
      </Link>
      <div className="flex gap-x-0 sm:gap-x-4 md:gap-x-8">
        {links?.map((link) => {
          return (
            <Link href={link.href} key={link.title}>
              <NavButton>{link.title}</NavButton>
            </Link>
          );
        })}
        {currentUsername ? (
          <>
            <Link href="/profile">
              <NavButton>會員管理</NavButton>
            </Link>
            <NavButton onClick={() => signOut({ callbackUrl: "/" })}>
              登出
            </NavButton>
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
  );
}

export default Navbar;
