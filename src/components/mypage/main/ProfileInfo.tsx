"use client";

import { Pencil } from "lucide-react";
import Link from "next/link";

// 프로필 정보 MOCK 데이터
const MOCK_USER = {
  name: "유레카",
  tags: ["영화 | 로맨스", "드라마 | 코미디", "예능 | 여행"],
};

export default function ProfileInfo() {
  return (
    <div className="flex items-center w-fit h-27 pl-0">
      {/* 왼쪽) 프로필 이미지 아이콘 영역 */}
      <div className="w-27 h-27 rounded-full bg-ot-gray-300" />

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
          {MOCK_USER.tags.map((tag, index) => (
            <span key={index} className="text-foreground text-[0.875rem]">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
