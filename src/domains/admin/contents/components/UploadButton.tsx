"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { CommonButton } from "@basecomponent";
import AdminUploadModal from "@/domains/admin/contents/components/AdminContentsUploadModal";

export default function UploadButton() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <CommonButton
        onClick={() => setOpen(true)}
        className="text-ot-text py-3 px-8 font-semibold flex items-center gap-2"
      >
        <Upload size={22} />
        콘텐츠 업로드
      </CommonButton>

      <AdminUploadModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
