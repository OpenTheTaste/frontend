"use client";

import { DashboardContentsMockData } from "@shared/mocks/mockDashboardcontent";
import { DashboardContentList } from "@features/dashboard/components";

export default function DashboardContentBox() {
  return (
    <div className="w-full mx-auto border border-ot-text rounded-lg flex flex-col items-center pt-6 pb-3">
      <DashboardContentList data={DashboardContentsMockData} />
    </div>
  );
}
