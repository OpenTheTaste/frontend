"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TabBar from "@/components/mypage/main/TabBar";
import RecentContentBox from "@/components/mypage/recent/RecentContentBox";
import BookmarkBox from "@/components/mypage/bookmark/BookmarkBox";

export default function MyPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "recent-3m"; // 도메인에서 값 읽어옴

  // URL 도메인 이상한 경우...
  useEffect(() => {
    const queryString = searchParams.toString();
    // 쿼리파라미터 아예 없음 (/mypage)
    if (queryString === "") {
      return;
    }
    // 4가지 도메인만 허용하고 나머진 돌려보냄
    const validQueries = [
      "tab=recent-3m",
      "tab=bookmark&filter=contents",
      "tab=bookmark&filter=shorts",
    ];
    // 지금 주소창 값(쿼리)이 위 4개 중 아무것도 아니면 그냥 초기화
    if (!validQueries.includes(queryString)) {
      router.replace("/mypage", { scroll: false });
    }
  }, [searchParams, router]);

  const handleTabChange = (tab: string) => {
    if (tab === "bookmark") {
      router.push("/mypage?tab=bookmark&filter=contents", { scroll: false });
    } else {
      router.push("/mypage?tab=recent-3m", { scroll: false });
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* [3개월 내 시청내역 | 북마크] 선택 탭 바 */}
      <div className="mt-20 flex justify-start relative z-10">
        <TabBar activeTab={activeTab as any} onTabChange={handleTabChange} />
      </div>

      {/* 구분선 */}
      <div className="w-full border-t border-ot-gray-600 relative z-0" />

      {/* 탭 뭐눌렀는지에 따라 불러오는거 구분 */}
      {activeTab === "recent-3m" ? <RecentContentBox /> : <BookmarkBox />}
    </div>
  );
}
