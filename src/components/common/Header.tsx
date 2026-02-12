"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

const Header = () => {
  const pathname = usePathname(); // 현재 경로 값
  const isSearchPage = pathname === "/search"; // 현재 검색 페이지인지 확인

  return (
    <header className="w-full max-w-480 h-30 flex items-center justify-between bg-background text-ot-text px-11 py-6.25">
      {/* 로고 (W:91, H:50) : 클릭하면 홈화면으로 이동 */}
      <Link
        href="/"
        className="flex items-center justify-center w-[5.688rem] h-12.5 cursor-pointer"
      >
        <img src="/icons/logo.png" alt="Logo" className="w-full h-full object-contain" />
      </Link>

      {/* 2) 오른쪽: 검색 아이콘 버튼 + 마이페이지 아이콘 버튼 */}
      <div
        className={`flex items-center ${isSearchPage ? "justify-end" : "justify-between"} w-25 h-9`}
      >
        {/* 검색 아이콘 버튼 (36 x 36 px) - 검색 페이지가 아닐 때만 표기 */}
        {!isSearchPage && (
          <button className="flex items-center justify-center w-9 h-9 cursor-pointer">
            <Search className="w-full h-full stroke-[1.5px] stroke-ot-text" strokeWidth={1.5} />
          </button>
        )}
        {/* 마이페이지 아이콘 버튼 (36 x 36 px) : 클릭하면 마이페이지 메인으로 이동 (/mypage) */}
        <button className="flex items-center justify-center w-9 h-9 rounded-full overflow-hidden cursor-pointer">
          <img src="/icons/logo.png" alt="Logo" width={36} height={36} className="object-cover" />
        </button>
      </div>
    </header>
  );
};

export default Header;
