"use client";

import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  type ChartEvent,
  type ActiveElement,
} from "chart.js";
import type { Factor } from "@features/custom/constants/factors";
import { FACTORS } from "@features/custom/constants/factors";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

interface RadarChartProps {
  values: Record<Factor, number>;
}

export function RadarChart({ values }: RadarChartProps) {
  const chartData = {
    labels: FACTORS,
    datasets: [
      {
        data: FACTORS.map((f) => values[f]),
        backgroundColor: "rgba(255, 57, 108, 0.7)",
        borderColor: "rgba(255, 178, 189)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(255, 178, 189)",
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions = {
    onHover: (event: ChartEvent, elements: ActiveElement[]) => {
      const canvas = event.native?.target as HTMLCanvasElement | undefined;
      if (!canvas) return;

      canvas.style.cursor = elements.length > 0 ? "pointer" : "default";
    },

    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: { display: false, stepSize: 20 },
        grid: { color: "rgba(255,255,255,0.08)" },
        angleLines: { color: "rgba(255,255,255,0.12)" },
        pointLabels: {
          color: "rgba(250,250,248)",
          font: { size: 12 },
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: (ctx: any) => ` ${ctx.parsed.r}점`,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
  };

  return <Radar data={chartData} options={chartOptions} />;
}