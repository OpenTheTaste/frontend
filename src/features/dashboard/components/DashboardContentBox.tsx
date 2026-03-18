"use client";

import { DashboardContentList } from "@features/dashboard/components";
import { DashboardSkeleton } from "@entities/dashboard/components";
import { useTagRanking } from "@entities/dashboard/hooks";
import { DashboardData } from "@shared/types";

const COLORS = ["#5f001b", "#9c003e", "#ff5f7c", "#ffd1d8", "#f2f2f2"];

export default function DashboardContentBox() {
  const { data, isLoading, isError } = useTagRanking();

  if (isLoading) return <DashboardSkeleton />;

  if (isError) {
    return (
      <div className="flex h-100 items-center justify-center">
        <p className="text-ot-gray-600">
          통계 그래프를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
        </p>
      </div>
    );
  }

  const chartData: DashboardData = {
    labels:
      data?.rankings.map((tag) =>
        tag.etc ? tag.tagName : `#${tag.tagName}`,
      ) ?? [],
    datasets: [
      {
        label: "시청 통계",
        data: data?.rankings.map((tag) => tag.count) ?? [],
        backgroundColor: COLORS,
        borderColor: COLORS,
        borderWidth: 0,
      },
    ],
    tagDetails: [],
    tagIds: data?.rankings.map((tag) => tag.tagId) ?? [],
  };

  return (
    <div className="border-ot-text mx-auto flex w-full flex-col items-center rounded-lg border pt-6 pb-3">
      {data?.rankings.length === 0 ? (
        <div className="flex h-100 items-center justify-center">
          <p className="text-ot-gray-600">시청 기록이 없습니다.</p>
        </div>
      ) : (
        <DashboardContentList data={chartData} />
      )}
    </div>
  );
}
