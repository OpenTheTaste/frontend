// /monitoring
import { AdminTitle } from "@/components/admin/common";
import { MonitoringContents } from "@/domains/admin/monitoring/components";
import { StatisticsContents } from "@/domains/admin/monitoring/components";

export default function MonitoringPage() {
  return (
    <main className="flex flex-col">
      <MonitoringContents />
      <StatisticsContents />
    </main>
  );
}
