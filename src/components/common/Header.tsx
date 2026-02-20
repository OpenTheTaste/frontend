"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

const Header = () => {
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
      </div>

      <div
        className={`flex items-center ${isSearchPage ? "justify-end" : "justify-between"} w-25 h-9`}
      >

        {!isSearchPage && (
          <Link
            href="/search"
            className="flex items-center justify-center w-9 h-9 cursor-pointer"
          >
            <Search className="w-full h-full stroke-2 stroke-ot-text" />
          </Link>
        )}

        <Link
          href="/mypage"
          className="flex items-center justify-center w-9 h-9 rounded-full overflow-hidden cursor-pointer"
        >
          <Image
            src="/icons/logo.svg"
            alt="마이페이지 이동"
            width={36}
            height={36}
            className="object-cover"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;