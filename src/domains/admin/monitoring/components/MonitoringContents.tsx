import { AdminSearch } from "@/components/admin/common";
import { mockAdminUploadStatus } from "@/mocks/mockAdminUploadStatus";
import { Search } from "lucide-react";

export default function MonitoringContents() {
  const uploadstatusdata = mockAdminUploadStatus;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4">
        <div className="w-36 bg-ot-gray-800 p-3 border border-ot-gray-700 rounded-lg">
          업로드 작업
        </div>
        <input
          type="text"
          className="flex-1 bg-ot-gray-800 p-3 border border-ot-gray-700 rounded-lg"
          placeholder="콘텐츠 제목을 입력하세요"
        />
      </div>
    </div>
  );
}
