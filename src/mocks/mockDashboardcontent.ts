import { DashboardData } from "@/types/dashboard";

export const DashboardContentsMockData: DashboardData = {
  labels: ["#태그1", "#태그2", "#태그3", "#태그4", "기타"],
  datasets: [
    {
      label: "시청 통계",
      data: [45, 25, 15, 10, 5],
      backgroundColor: ["#9d0037", "#f10059", "#ff768f", "#ffa4b2", "#ffecef"],
      borderColor: ["#9d0037", "#f10059", "#ff768f", "#ffa4b2", "#ffecef"],
      borderWidth: 0,
    },
  ],
};
