"use client";

import { DashboardContentList } from "@features/dashboard/components";
import { useTagRanking } from "@entities/dashboard/hooks/useTagRanking";
import { DashboardData } from "@shared/types/mypage/dashboard";

const COLORS = ["#9d0037", "#f10059", "#ff768f", "#ffa4b2", "#ffecef"];

export default function DashboardContentBox() {
  const { data, isLoading, isError } = useTagRanking();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-100">
        <p className="text-ot-text">로딩 중 ~</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-100">
        <p className="text-ot-gray-600">
          통계 그래프를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
        </p>
      </div>
    );
  }

  const chartData: DashboardData = {
    // labels: data?.rankings.map((tag) => `${tag.tagName}`) ?? [],
    labels: data?.rankings.map((tag) => (tag.etc ? tag.tagName : `#${tag.tagName}`)) ?? [],
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
  };

  return (
    <div className="w-full mx-auto border border-ot-text rounded-lg flex flex-col items-center pt-6 pb-3">
      {data?.rankings.length === 0 ? (
        <div className="flex items-center justify-center h-100">
          <p className="text-ot-gray-600">시청 기록이 없습니다.</p>
        </div>
      ) : (
        <DashboardContentList data={chartData} />
      )}
    </div>
  );
}
