// /mypage/dashboard 도메인
import Header from "@/components/common/Header";
import BackButton from "@/components/common/BackButton";
import DashboardContentBox from "@/components/mypage/dashboard/DashboardContentBox";

export default function MyPageDashboard() {
  return (
    <div className="min-h-screen bg-ot-background flex flex-col items-center">
      <Header />
      <main className="w-full max-w-480 flex-1 px-12 py-6 flex flex-col gap-6">
        <div className="flex flex-row items-center gap-5">
          <BackButton />
          <p className="text-ot-text text-[24px] font-bold">시청 통계</p>
        </div>
        <DashboardContentBox />
      </main>
    </div>
  );
}
