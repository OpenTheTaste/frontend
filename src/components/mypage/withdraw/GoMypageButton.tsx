"use client";

import Link from "next/link";
import Image from "next/image";

export default function GoMypageButton() {
  return (
    <div className="flex flex-row items-center gap-7">
      <Link
        href="/mypage"
        aria-label="마이페이지로 이동하기"
        className="flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity"
      >
        <Image src="/icons/BackButton.svg" alt="마이페이지로 이동하기" width={20} height={40} />
      </Link>
      <p className="text-ot-text text-[18px] font-semibold">마이페이지로 돌아가기</p>
    </div>
  );
}
