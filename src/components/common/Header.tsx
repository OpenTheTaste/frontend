"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

const Header = () => {
  const pathname = usePathname(); // 현재 경로 값
  const isSearchPage = pathname === "/search"; // 현재 검색 페이지인지 확인

  return (
    <header className="w-full flex items-center justify-between bg-background text-ot-text px-11 py-4">
      {/* 로고 (W:91, H:50) : 클릭하면 홈화면으로 이동 */}
      <Link
        href="/"
        className="flex items-center justify-center cursor-pointer"
      >
        <Image
          src="/icons/logo.png"
          alt="Logo"
          width={45}
          height={45}
          className="object-contain"
        />
      </Link>

      {/* 2) 오른쪽: 검색 아이콘 버튼 + 마이페이지 아이콘 버튼 */}
      <div
        className={`flex items-center ${isSearchPage ? "justify-end" : "justify-between"} w-25 h-9`}
      >
        {/* 검색 아이콘 버튼 (36 x 36 px) - 검색 페이지가 아닐 때만 표기 */}
        {!isSearchPage && (
          <Link
            href="/search"
            className="flex items-center justify-center w-9 h-9 cursor-pointer"
          >
            <Search className="w-full h-full stroke-2 stroke-ot-text" />
          </Link>
        )}
        {/* 마이페이지 아이콘 버튼 (36 x 36 px) : 클릭하면 마이페이지 메인으로 이동 (/mypage) */}
        <Link
          href="/mypage"
          className="flex items-center justify-center w-9 h-9 rounded-full overflow-hidden cursor-pointer"
        >
          <Image
            src="/icons/logo.png"
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
