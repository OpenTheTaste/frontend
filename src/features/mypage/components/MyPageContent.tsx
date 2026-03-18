"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { BookmarkBox } from "@features/bookmark/components";
import { TabBar } from "@features/mypage/components";
import { RecentContentBox } from "@features/recent-history/components";

type TabType = "recenthistory" | "bookmark";

export default function MyPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabParam = searchParams.get("tab");
  const filterParam = searchParams.get("filter");

  // 쿼리 접근 관련
  const activeTab: TabType =
    tabParam === "bookmark" || tabParam === "recenthistory"
      ? tabParam
      : "recenthistory";

  const activeFilter =
    activeTab === "bookmark" &&
    (filterParam === "contents" || filterParam === "shorts")
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
    <div className="flex w-full flex-col">
      {/* [3개월 내 시청내역 | 북마크] 선택 탭 바 & 구분선 묶음 */}
      <div className="relative z-10 mt-8 flex justify-start">
        {/* 탭 바 */}
        <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
        <div className="border-ot-gray-800 absolute bottom-0 left-0 z-0 w-full border-t" />
      </div>

      {/* 탭 뭐눌렀는지에 따라 불러오는거 구분 */}
      {activeTab === "recenthistory" ? (
        <RecentContentBox />
      ) : (
        <BookmarkBox filter={activeFilter} />
      )}
    </div>
  );
}
