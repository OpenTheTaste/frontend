"use client";

import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { DashboardData, TagDetail } from "@/types/dashboard";
import TagStatsModal from "@/components/mypage/dashboard/TagStatsModal";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface DashboardContentListProps {
  data: DashboardData;
}

export default function DashboardContentList({ data }: DashboardContentListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 클릭된 태그의 정보를 담을 상태 변수
  const [selectedTag, setSelectedTag] = useState<{ name: string; detail: TagDetail } | null>(null);

  // 차트 스타일 & 동작 옵션
  const options: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,

    onClick: (event, elements, chart) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const label = chart.data.labels?.[index] as string;
        if (label === "기타" || !data.tagDetails?.[index]) {
          return;
        }
        setSelectedTag({
          name: label,
          detail: data.tagDetails[index],
        });
        setIsModalOpen(true);
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
        hoverOffset: 20,
      },
    },
    layout: {
      padding: 60,
    },
    plugins: {
      legend: {
        display: false, // 기본 범례 숨김 (커스텀)
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
          const label = context.chart.data.labels ? context.chart.data.labels[idx] : "";
          return `${label} - ${value}번`;
        },
      },
    },
  };

  return (
    <div className="w-full h-125 flex justify-center items-center">
      <Pie data={data} options={options} />
      {selectedTag && (
        <TagStatsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          tagName={selectedTag.name}
          monthlyStats={selectedTag.detail.monthlyStats}
          recommendations={selectedTag.detail.recommendations}
        />
      )}
    </div>
  );
}
