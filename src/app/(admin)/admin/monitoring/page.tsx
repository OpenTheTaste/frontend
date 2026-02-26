// /monitoring
import { MonitoringContents } from "@admin-monitoring";
import { StatisticsContents } from "@admin-monitoring";

export default function MonitoringPage() {
  return (
    <main className="flex flex-col">
      <MonitoringContents />
      <StatisticsContents />
    </main>
  );
}
