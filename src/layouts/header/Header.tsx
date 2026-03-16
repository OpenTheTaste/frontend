"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

export const Header = () => {
  const pathname = usePathname();
  const isSearchPage = pathname === "/search";
  const isHomePage = pathname === "/";

  return (
    <header className="bg-ot-background text-ot-text flex w-full items-center justify-between px-11 py-5">
      <div className="flex items-center gap-12">
        <Link
          href="/"
          className="flex cursor-pointer items-center justify-center"
        >
          <Image
            src="/icons/headerLogo.svg"
            alt="Logo"
            width={64}
            height={60}
            className="object-contain transition-all duration-150 hover:opacity-70"
          />
        </Link>

        {isHomePage && (
          <Link
            href="/shorts"
            className="text-ot-text hover:text-ot-primary-500 cursor-pointer text-[1.125rem] font-bold transition-colors"
          >
            숏폼
          </Link>
        )}
        {isHomePage && (
          <Link
            href="/custom"
            className="text-ot-text hover:text-ot-primary-500 cursor-pointer text-[1.125rem] font-bold transition-colors"
          >
            커스텀 추천
          </Link>
        )}
      </div>

      <div
        className={`flex items-center ${isSearchPage ? "justify-end" : "justify-between"} gap-x-6`}
      >
        {!isSearchPage && (
          <Link href="/search" className="flex items-center justify-center">
            <Search
              className="stroke-ot-text hover:stroke-ot-gray-600"
              strokeWidth={2}
              size={24}
            />
          </Link>
        )}

        <Link
          href="/mypage"
          className="group hover:bg-ot-gray-900/60 inline-flex items-center justify-center rounded-full"
        >
          <Image
            src="/icons/logo.svg"
            alt="마이페이지 이동"
            width={28}
            height={28}
            className="rounded-full object-cover group-hover:opacity-70"
          />
        </Link>
      </div>
    </header>
  );
};
