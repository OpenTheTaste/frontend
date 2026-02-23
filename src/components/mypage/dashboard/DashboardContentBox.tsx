"use client";

import { DashboardContentsMockData } from "@/mocks/mockDashboardcontent";
import DashboardContentList from "@/components/mypage/dashboard/DashboardContentList";

export default function DashboardContentBox() {
  return (
    <div className="w-full mx-auto border border-ot-text rounded-lg flex flex-col items-center pt-6 pb-3">
      <DashboardContentList data={DashboardContentsMockData} />
    </div>
  );
}
