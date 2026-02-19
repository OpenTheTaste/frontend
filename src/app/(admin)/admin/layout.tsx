import AdminHeader from "@/components/admin/common/AdminHeader";
import AdminSideBar from "@/components/admin/common/AdminSideBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen text-ot-text">
      {/* 사이드바 */}
      <AdminSideBar />

      {/* 우측 영역 */}
      <div className="flex-1 flex flex-col">
        {/* 상단 관리자 헤더 */}
        <AdminHeader />

        {/* 실제 페이지 영역 */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
