import { Header } from "@layouts";
import { BackButton } from "@base-components";
import { DashboardContentBox } from "@features/dashboard/components";

export default function MyPageDashboard() {
  return (
    <div className="min-h-screen bg-ot-background flex flex-col items-center">
      <Header />
      <main className="relative w-full max-w-480 flex-1 px-12 py-6 flex flex-col gap-6">
        <BackButton />
        <h1 className="text-ot-text text-3xl font-bold items-center justify-center flex gap-2 mt-8">
          시청 통계
        </h1>
        <DashboardContentBox />
      </main>
    </div>
  );
}
