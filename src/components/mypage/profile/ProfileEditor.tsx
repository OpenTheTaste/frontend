"use client";

import Image from "next/image";
import { Input } from "@/components/common/Input";
import { Pencil } from "lucide-react";

export default function ProfileEditor() {
  return (
    <div className="flex flex-col items-center w-full pt-3">
      {/* 프로필 아이콘 */}
      <div className="relative w-20 h-20 rounded-full overflow-hidden">
        <Image src="/icons/logo.svg" alt="Profile Logo" fill className="object-cover" />
      </div>
      {/* 이름 수정 Input 입력칸 + 연필 아이콘 버튼 */}
      <div className="flex items-center justify-center w-full pt-6 pb-12">
        <div className="w-16" aria-hidden="true" />
        {/* Input 입력칸 */}
        <div className="w-full max-w-120 h-12">
          <Input
            className="w-full h-full text-ot-gray-700! bg-ot-primary-100 text-center"
            placeholder="클릭 시 수정 가능"
          />
        </div>
        {/* 연필 아이콘 버튼 (수정 끝내기 버튼) */}
        <button className="hover:opacity-70 pl-6" type="button">
          <Pencil className="w-10 h-10 shrink-0 text-background fill-foreground" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
