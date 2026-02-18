"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TabBar from "@/components/mypage/main/TabBar";
import RecentContentBox from "@/components/mypage/recenthistory/RecentContentBox";
import BookmarkBox from "@/components/mypage/bookmark/BookmarkBox";

type TabType = "recenthistory" | "bookmark";

export default function MyPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabParam = searchParams.get("tab");
  const filterParam = searchParams.get("filter");

  // 쿼리 접근 관련
  const activeTab: TabType =
    tabParam === "bookmark" || tabParam === "recenthistory" ? tabParam : "recenthistory";

  const activeFilter =
    activeTab === "bookmark" && (filterParam === "contents" || filterParam === "shorts")
      ? filterParam
      : "contents";

  const handleTabChange = (tab: string) => {
    if (tab === "bookmark") {
      router.push("/mypage?tab=bookmark&filter=contents", { scroll: false });
    } else {
      router.push("/mypage?tab=recenthistory", { scroll: false });
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* [3개월 내 시청내역 | 북마크] 선택 탭 바 & 구분선 묶음 */}
      <div className="mt-20 flex justify-start relative z-10">
        {/* 탭 바 */}
        <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
        {/* 구분선 */}
        <div className="w-full border-t border-ot-gray-600 absolute bottom-0 left-0 z-0" />
      </div>

      {/* 탭 뭐눌렀는지에 따라 불러오는거 구분 */}
      {activeTab === "recenthistory" ? <RecentContentBox /> : <BookmarkBox filter={activeFilter} />}
    </div>
  );
}
