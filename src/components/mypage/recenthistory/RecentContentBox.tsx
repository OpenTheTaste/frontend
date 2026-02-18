"use client";

import RecentContentList from "@/components/mypage/recenthistory/RecentContentList";
import { mockRecentData } from "@/mocks/mockRecent";

export default function RecentContentBox() {
  return (
    <div className="flex flex-col w-full">
      <div className="mt-5">
        <RecentContentList items={mockRecentData} />
      </div>
    </div>
  );
}
