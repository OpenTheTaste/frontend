"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BookmarkFilterBar from "@/components/mypage/bookmark/BookmarkFilterBar";
import BookmarkContentList from "@/components/mypage/bookmark/BookmarkContentList";
import BookmarkShortsList from "@/components/mypage/bookmark/BookmarkShortsList";

interface BookmarkBoxProps {
  filter: "contents" | "shorts";
}

export default function BookmarkBox({ filter }: BookmarkBoxProps) {
  const router = useRouter();

  // 도메인에서 filter값 가져옴 (없으면 기본값인 'contents'로 하기)
  const activeFilter = filter;

  useEffect(() => {
    // 백엔드 API 호출 등
    console.log(`현재 ${activeFilter} 데이터를 가져옴`);
  }, [activeFilter]);

  const handleFilterChange = (filter: "contents" | "shorts") => {
    router.push(`/mypage?tab=bookmark&filter=${filter}`, { scroll: false });
  };

  return (
    <div className="flex flex-col w-full">
      {/* 북마크 내 필터바 영역 */}
      <div className="mt-11 mb-8">
        <BookmarkFilterBar activeFilter={activeFilter} onFilterChange={handleFilterChange} />
      </div>

      {/* 필터 버튼 누른거에 따라 다른거 나타남 */}
      {activeFilter === "contents" ? <BookmarkContentList /> : <BookmarkShortsList />}
    </div>
  );
}
