import { AdminTitle } from "@admin-basecomponent";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminTitle
        title="모니터링"
        description="실시간 콘텐츠 업로드 및 트랜스코딩 작업 현황을 파악합니다."
      />

      <div className="px-12 pb-12">{children}</div>

      <AdminTitle
        title="대시보드"
        description="카테고리별 시청 통계 및 콘텐츠 전환율 지표를 분석합니다."
      />

      <div className="px-12 pb-12">{children}</div>
    </>
  );
}
