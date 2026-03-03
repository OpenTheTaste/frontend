"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

export const Header = () => {
  const pathname = usePathname();
  const isSearchPage = pathname === "/search";
  const isHomePage = pathname === "/";

  return (
    <header className="w-full flex items-center justify-between bg-ot-background text-ot-text px-11 py-4">
      <div className="flex items-center gap-12">
        <Link
          href="/"
          className="flex items-center justify-center cursor-pointer"
        >
          <Image
            src="/icons/logo.svg"
            alt="Logo"
            width={45}
            height={45}
            className="object-contain"
          />
        </Link>

        {isHomePage && (
          <Link
            href="/shorts"
            className="text-[1.125rem] font-bold text-ot-text hover:text-ot-primary-500 transition-colors cursor-pointer"
          >
            쇼츠
          </Link>
        )}
        {isHomePage && (
          <Link
            href="/custom"
            className="text-[1.125rem] font-bold text-ot-text hover:text-ot-primary-500 transition-colors cursor-pointer"
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
          className="group inline-flex items-center justify-center rounded-full hover:bg-ot-gray-900/60"
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
