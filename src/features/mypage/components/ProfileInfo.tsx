"use client";

import Image from "next/image";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { MOCK_USER } from "@/shared/mocks/mockUser";

export default function ProfileInfo() {
  return (
    <div className="flex items-center w-fit h-20">
      {/* 왼쪽) 프로필 이미지 아이콘 영역 */}
      <div className="relative w-16 h-16 rounded-full overflow-hidden">
        <Image
          src="/icons/logo.svg"
          alt="Profile Logo"
          fill
          className="object-cover"
        />
      </div>

      {/* 오른쪽) 사용자 정보 영역 */}
      <div className="flex flex-col justify-center gap-1 h-full pl-4">
        {/* 사용자 이름 & 프로필 수정 아이콘 버튼 */}
        <div className="flex items-center gap-2 pb-2">
          <h2 className="text-ot-text text-xl font-bold leading-tight">
            [{MOCK_USER.name}]
          </h2>
          <Link href="/mypage/profile" className="hover:opacity-70">
            <Pencil
              size={24}
              className="text-background fill-ot-text"
              strokeWidth={2}
            />
          </Link>
        </div>

        {/* 선호 태그 목록 */}
        <div className="flex items-center gap-4">
          {/* 각 박스 사이의 간격을 gap-2 정도로 조절 */}
          {MOCK_USER.preferences.map((item, index) => (
            <div
              key={index}
              className="flex items-center px-2 py-1 border border-gray-300 rounded-lg text-[14px] whitespace-nowrap"
            >
              {/* 카테고리 | 태그 분리 */}
              <span className="font-medium">{item.category}</span>
              <span className="mx-2 text-gray-300">|</span>
              <span>{item.tags.join(", ")}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
