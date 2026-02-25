"use client";

import { AdminSearch } from "@admin-basecomponent";
import { useState } from "react";
import { PublicType } from "@/types/admin/adminPublic";
import { AdminShortsList } from "@admin-shorts";

const PUBLIC_FILTER_OPTIONS = ["전체", "공개", "비공개"] as const;

export default function AdminShrotsSection() {
  const [filterPublic, setFilterPublic] = useState<PublicType | null>(null);

  const handleSelect = (option: string) => {
    setFilterPublic(option === "전체" ? null : (option as PublicType));
  };

  return (
    <>
      <AdminSearch
        placeholder="숏폼 제목을 입력하세요."
        options={[...PUBLIC_FILTER_OPTIONS]}
        onSelect={handleSelect}
      />

      <AdminShortsList filterPublic={filterPublic} />
    </>
  );
}
