"use client";

import { useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  ArcElement,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { TagStatsModal } from "@features/dashboard/components";
import { useTagMonthlyStats } from "@entities/dashboard/hooks";
import { useTagRecommendPlaylist } from "@entities/dashboard/hooks";
import { DashboardData } from "@shared/types/mypage/dashboard";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface DashboardContentListProps {
  data: DashboardData;
}

export default function DashboardContentList({
  data,
}: DashboardContentListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<{ name: string } | null>(null);
  const [selectedTagId, setSelectedTagId] = useState<number | null>(null);
  const {
    data: monthlyStats,
    isLoading: isStatsLoading,
    isError: isStatsError,
  } = useTagMonthlyStats(selectedTagId ?? 0);
  const {
    data: playlist,
    isLoading: isPlaylistLoading,
    isError: isPlaylistError,
  } = useTagRecommendPlaylist(selectedTagId ?? 0);

  // 차트 스타일 & 동작 옵션
  const options: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,

    onClick: (event, elements, chart) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const label = chart.data.labels?.[index] as string;
        if (label === "기타") {
          return;
        }
        const tagId = data.tagIds?.[index];
        if (tagId) {
          setSelectedTagId(tagId);
          setSelectedTag({ name: label });
          setIsModalOpen(true);
        }
      }
    },
    onHover: (event, elements, chart) => {
      if (event.native?.target) {
        const target = event.native.target as HTMLElement;
        if (elements.length > 0) {
          const index = elements[0].index;
          const label = chart.data.labels?.[index];
          target.style.cursor = label !== "기타" ? "pointer" : "default";
        } else {
          target.style.cursor = "default";
        }
      }
    },

    animation: {
      duration: 1500, // 애니메이션 지속 시간 (1.5초)
      easing: "easeOutQuart", // (easeInBounce, easeOutCirc, easeInOutBack 등 있음)
      animateRotate: true,
      animateScale: true,
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    elements: {
      arc: {
        borderWidth: 0,
        hoverOffset: 0,
      },
    },
    layout: {
      padding: {
        top: 60,
        bottom: 60,
        left: 150, // 300 -> 120
        right: 50, // 200 -> 80
      },
    },
    plugins: {
      legend: {
        display: true, // false = 기본 범례 숨김 (커스텀)
        position: "right",
        align: "center",
        labels: {
          color: "#fafaf8",
          font: {
            size: 16,
            family: "Pretendard",
          },
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
        },
      },
      tooltip: {
        enabled: true, // 호버 시 툴팁 활성화
      },
      datalabels: {
        anchor: "end",
        align: "end",
        offset: 20,
        color: "#fafaf8",
        font: {
          size: 14,
        },
        formatter: (value, context) => {
          const idx = context.dataIndex;
          const label = context.chart.data.labels
            ? context.chart.data.labels[idx]
            : "-ui";
          return `${label} - ${value}번`;
        },
      },
    },
  };

  return (
    <div className="flex h-125 w-full min-w-150 items-center justify-center overflow-x-auto">
      <Pie data={data} options={options} />
      {selectedTag && (
        <TagStatsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          tagName={selectedTag.name}
          isLoading={isStatsLoading || isPlaylistLoading}
          isError={isStatsError || isPlaylistError}
          monthlyStats={{
            thisMonth: monthlyStats?.currentMonth.count ?? 0,
            lastMonth: monthlyStats?.previousMonth?.count ?? 0,
          }}
          recommendations={
            playlist?.dataList.map((item) => ({
              id: item.mediaId,
              image: item.posterUrl,
            })) ?? []
          } // 없으면 빈 칸
        />
      )}
    </div>
  );
}
