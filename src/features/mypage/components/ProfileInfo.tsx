"use client";

import Image from "next/image";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { useMemberProfile } from "@/entities/profile/hooks";

export default function ProfileInfo() {
  const { data: profile, isLoading } = useMemberProfile();

  if (isLoading) return null;
  if (!profile) return null;

  return (
    <div className="flex items-center w-fit h-20">
      {/* 왼쪽) 프로필 이미지 아이콘 영역 */}
      <div className="relative w-16 h-16 rounded-full overflow-hidden">
        <Image src="/icons/logo.svg" alt="Profile Logo" fill className="object-cover" />
      </div>

      {/* 오른쪽) 사용자 정보 영역 */}
      <div className="flex flex-col justify-center gap-1 h-full pl-8">
        {/* 사용자 이름 & 프로필 수정 아이콘 버튼 */}
        <div className="flex items-center gap-2 pb-2">
          <p className="text-ot-text text-3xl font-bold leading-tight">{profile.nickname}</p>
          <Link
            href="/mypage/profile"
            aria-label="프로필 수정 페이지로 이동"
            className="hover:opacity-70"
          >
            <Pencil size={24} className="text-background fill-ot-text" strokeWidth={2} />
          </Link>
        </div>

        {/* 선호 태그 목록 */}
        <div className="flex items-center gap-4">
          {profile.preferredTags.map((tag) => (
            <div
              key={tag.tagId}
              className="flex items-center px-2 py-1 border border-gray-300 rounded-lg text-[14px] whitespace-nowrap"
            >
              {tag.display}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
