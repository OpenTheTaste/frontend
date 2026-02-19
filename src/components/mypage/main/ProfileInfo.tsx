"use client";

import Image from "next/image";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { MOCK_USER } from "@/mocks/mockUser";

export default function ProfileInfo() {
  return (
    <div className="flex items-center w-fit h-27 pl-0">
      {/* 왼쪽) 프로필 이미지 아이콘 영역 */}
      <div className="relative w-27 h-27 rounded-full overflow-hidden">
        <Image src="/icons/logo.svg" alt="Profile Logo" fill className="object-cover" />
      </div>

      {/* 오른쪽) 사용자 정보 영역 */}
      <div className="flex flex-col justify-between h-full pt-2 pb-4.5 pl-6">
        {/* 사용자 이름 & 프로필 수정 아이콘 버튼 */}
        <div className="flex items-center gap-3 pb-7">
          <h2 className="text-foreground text-[1.5rem] font-bold leading-tight">
            [{MOCK_USER.name}]
          </h2>
          <Link href="/mypage/profile" className="hover:opacity-70">
            <Pencil size={24} className="text-background fill-foreground" strokeWidth={2} />
          </Link>
        </div>

        {/* 선호 태그 목록 (가로로 쭉 정렬) */}
        <div className="flex items-center gap-10">
          {MOCK_USER.preferences.map((item, index) => (
            <span key={index} className="text-foreground text-[0.875rem]">
              {/* 카테고리 | 태그 분리 */}
              <span>#{item.category}</span>
              <span className="mx-1">|</span>
              <span>{item.tags.join(", ")}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
