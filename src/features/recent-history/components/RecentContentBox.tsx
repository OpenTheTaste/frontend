"use client";

import { RecentContentList } from "@features/recent-history/components";
import { useRecentHistory } from "@/entities/recenthistory/hooks";

export default function RecentContentBox() {
  const { data, isLoading, isError } = useRecentHistory();

  const items = data?.pages.flatMap((page) => page.dataList) ?? [];

  if (isLoading) {
    return (
      <div className="flex h-100 items-center justify-center">
        <p className="text-ot-gray-600">로딩 중...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-100 items-center justify-center">
        <p className="text-ot-gray-600">
          시청내역을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col">
      <div>
        <RecentContentList items={items} />
      </div>
    </div>
  );
}
