import * as React from "react";
import Image from "next/image";
import { NavButton } from "@/components/ui/NavButton";
import Link from "next/link";

const links: { title: string; href: string; description: string }[] = [
  {
    title: "文章",
    href: "/article",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "註冊",
    href: "/signup",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "登入",
    href: "/login",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
];

export default function Footer() {
  return (
    <footer className="w-full h-auto bg-gray-100">
      <section className="w-full h-[100px] sm:h-[160px] flex bg-gray-200">
        <Image
          className="w-auto h-[50px] m-auto cursor-pointer transition-transform duration-250 ease-in hover:scale-125"
          width={124}
          height={169}
          src="/efTopIcon.png"
          alt="efTopIcon"
        />
      </section>
      <section className="w-full h-fit text-base tracking-[1px] flex flex-col gap-8 my-4 justify-between items-start leading-[10px] p-[10px_25px_10px] md:text-lg md:h-[140px] md:flex-row md:items-center md:tracking-[1.5px] md:leading-[0px] md:gap-0 md:px-12">
        <Link href="/contact">聯絡我們</Link>
        {/* <p>0975-282-222</p> */}
        {/* <a href="mailto:mynameisvince24@gmail.com">mynameisvince24@gmail.com</a> */}
        <div className="flex flex-row gap-3">
          <Link
            href="https://www.facebook.com/profile.php?id=100079762316652"
            target="_blank"
          >
            <Image
              className="w-[25px] h-[25px] mt-0 hover:opacity-80 transition-transform duration-250 ease-in hover:scale-125 md:mt-[2px] sm:w-[30px] sm:h-[30px]"
              width={29}
              height={29}
              src="/metaIcon.svg"
              alt="metaIcon"
            />
          </Link>
          <Link href="https://line.me/ti/p/v9ETm_J1dk" target="_blank">
            <Image
              className="w-[25px] h-[25px] mt-0 hover:opacity-80 transition-transform duration-250 ease-in hover:scale-125 md:mt-[2px] sm:w-[30px] sm:h-[30px]"
              width={68}
              height={65}
              src="/lineIcon.svg"
              alt="lineIcon"
            />
          </Link>
        </div>
      </section>
    </footer>
  );
}
