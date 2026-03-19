import { Header } from "@layouts";
import { DashboardContentBox } from "@features/dashboard/components";
import { BackButton } from "@shared/components";

export default function MyPageDashboard() {
  return (
    <div className="bg-ot-background flex min-h-screen flex-col items-center">
      <Header />
      <main className="relative flex w-full max-w-480 flex-1 flex-col gap-6 px-12 py-6">
        <BackButton />
        <h1 className="text-ot-text flex items-center justify-center gap-2 text-3xl font-bold">
          시청 통계
        </h1>
        <DashboardContentBox />
      </main>
    </div>
  );
}
