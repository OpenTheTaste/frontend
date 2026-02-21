"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import Image from "next/image";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  ChartOptions,
} from "chart.js";
import { RecommendedContent } from "@/types/dashboard";
import TagStatsModalList from "@/components/mypage/dashboard/TabStatsModalList";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface TagStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tagName: string;
  monthlyStats: {
    thisMonth: number;
    lastMonth: number;
  };
  recommendations: RecommendedContent[];
}

export default function TagStatsModal({
  isOpen,
  onClose,
  tagName,
  monthlyStats,
  recommendations,
}: TagStatsModalProps) {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // 서버 사이드에서는 렌더링하지 않음 -> 에러 방지
  }
  if (!isOpen) {
    return null;
  }

  // 1. 그래프 데이터 설정 (디자인의 핑크 계열 적용)
  const chartData = {
    labels: ["금월", "전월"],
    datasets: [
      {
        data: [monthlyStats.thisMonth, monthlyStats.lastMonth],
        backgroundColor: ["#f10059", "#ff768f"], // 금월(진한 핑크), 전월(연한 핑크)
        // 양끝을 완전히 둥글게 만들기 위해 borderRadius 최대치 부여
        borderRadius: 100,
        borderSkipped: false, // 양쪽 모두 라운딩 적용
        barThickness: 35, // 막대 두께 조정
      },
    ],
  };

  // 2. 그래프 모양 커스텀 옵션
  const chartOptions: ChartOptions<"bar"> = {
    indexAxis: "y", // 가로 막대 형태
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, // 범례 숨김
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        display: false, // x축 수치 숨김
        grid: { display: false },
      },
      y: {
        grid: { display: false }, // y축 선 숨김
        ticks: {
          color: "#fafaf8",
          font: { size: 16, weight: "bold" },
        },
      },
    },
  };

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative pt-14 pb-8 rounded-xl bg-ot-gray-800 shadow-2xl overflow-hidden w-[60%]">
        {/* 닫기 버튼 */}
        <button className="absolute right-7 top-7 text-white" onClick={onClose}>
          <X size={24} strokeWidth={3} />
        </button>

        {/* 그래프 영역 */}
        <div className="px-25 mb-5">
          {/* 그래프 박스 등 */}
          <div className="h-44 border border-ot-text rounded-lg">{/* 그래프 컴포넌트 */}</div>
        </div>

        {/* 구분선 */}
        <div className="px-15 py-2">
          <hr className="border-ot-text" />
        </div>

        {/* 태그별 추천 콘텐츠 영역 */}
        <div className="px-15 mt-5">
          <h3 className="text-[24px] font-bold text-white">태그별 추천 콘텐츠</h3>
          <TagStatsModalList items={recommendations} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
