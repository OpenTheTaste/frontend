"use client";

import { DashboardContentList } from "@features/dashboard/components";
import { useTagRanking } from "@entities/dashboard/hooks/useTagRanking";
import { DashboardData } from "@shared/types/mypage/dashboard";

const COLORS = ["#9d0037", "#f10059", "#ff768f", "#ffa4b2", "#ffecef"];

export default function DashboardContentBox() {
  const { data, isLoading, isError } = useTagRanking();

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

  // 테스트) 데이터 없을 때 모달창 띄울거면 아래 빈 거 체크하는 부분 주석으로 하기
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
