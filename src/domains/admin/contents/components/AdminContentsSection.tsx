"use client";

import { AdminSearch } from "@admin-basecomponent";
import AdminContentsList from "./AdminContentsList"; // index 에서 변경 예정
import { useState } from "react";
import { PublicType } from "@/types/admin/adminPublic";

const PUBLIC_FILTER_OPTIONS = ["전체", "공개", "비공개"] as const;

export default function AdminContentsSection() {
  const [filterPublic, setFilterPublic] = useState<PublicType | null>(null);

  const handleSelect = (option: string) => {
    setFilterPublic(option === "전체" ? null : (option as PublicType));
  };

  return (
    <>
      <AdminSearch
        placeholder="콘텐츠 제목을 입력하세요."
        options={[...PUBLIC_FILTER_OPTIONS]}
        onSelect={handleSelect}
      />

      <AdminContentsList filterPublic={filterPublic} />
    </>
  );
}
