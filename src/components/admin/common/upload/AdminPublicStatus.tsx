"use client";

import { useState } from "react";
import AdminBadge from "@/components/admin/common/AdminBadge";
import { AdminPublicToggle } from "@/components/admin/common/AdminPublicToggle";

export default function AdminPublicStatus() {
  const [isPublic, setIsPublic] = useState<boolean>(false);
  return (
    <div>
      <p className="font-semibold text-lg mb-2">공개 여부</p>
      <div className="flex items-center text-ot-gray-600 text-xs">
        <AdminPublicToggle
          isOn={isPublic}
          onToggle={() => setIsPublic((prev) => !prev)}
        />
        {isPublic ? (
          <>
            <AdminBadge variant="공개" className="ml-3 mr-1" />
            <p>모든 사용자가 볼 수 있습니다</p>
          </>
        ) : (
          <>
            <AdminBadge variant="비공개" className="ml-3 mr-1" />
            <p>영상이 숨김 처리 됩니다</p>
          </>
        )}
      </div>
    </div>
  );
}
