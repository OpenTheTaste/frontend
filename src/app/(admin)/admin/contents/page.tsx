import AdminSideBar from "@/components/admin/common/AdminSideBar";

export default function AdminContentsPage() {
  return (
    <div className="flex h-screen text-ot-text">
      <AdminSideBar />
      <div className="flex-1 flex flex-col">
        <header className="px-11 py-4 flex items-center bg-ot-gray-900">
          관리자 페이지
        </header>
      </div>
    </div>
  );
}
