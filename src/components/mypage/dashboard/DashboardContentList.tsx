"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { DashboardData } from "@/types/dashboard";
// import { DashboardContentsMockData } from "@/mocks/mcokDashboardcontent";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface DashboardContentListProps {
  data: DashboardData;
}

export default function DashboardContentList({ data }: DashboardContentListProps) {
  // 차트 스타일 & 동작 옵션
  const options: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,

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
          // return context.chart.data.labels ? context.chart.data.labels[context.dataIndex] : "";
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
    </div>
  );
}
