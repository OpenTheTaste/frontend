"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { UserMenuButtons } from "@features/mypage/components";
import { ProfileSkeleton } from "@entities/profile/components";
import { useMemberProfile } from "@entities/profile/hooks";

export default function ProfileInfo() {
  const { data: profile, isLoading } = useMemberProfile();
  const router = useRouter();

  if (isLoading) return <ProfileSkeleton />;
  if (!profile) return null;

  return (
    <div className="flex w-full items-end justify-between">
      {/* 왼쪽 프로필 */}
      <div className="flex h-20 w-fit items-center">
        <div className="relative h-16 w-16 overflow-hidden rounded-full">
          <Image
            src="/icons/logo.svg"
            alt="Profile Logo"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex h-full flex-col justify-center gap-1 pl-8">
          <div className="flex items-center gap-2 pb-2">
            <p className="text-ot-text text-3xl leading-tight font-bold">
              {profile.nickname}
            </p>
            <Link
              href="/mypage/profile"
              aria-label="프로필 수정 페이지로 이동"
              className="hover:opacity-70"
            >
              <Pencil
                size={24}
                className="text-background fill-ot-text"
                strokeWidth={2}
              />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {profile.preferredTags.map((tag) => (
              <div
                key={tag.tagId}
                className="flex items-center rounded-lg border border-gray-300 px-2 py-1 text-[14px] whitespace-nowrap"
              >
                {tag.display}
              </div>
            ))}
          </div>
        </div>
      </div>

      <UserMenuButtons />
    </div>
  );
}
