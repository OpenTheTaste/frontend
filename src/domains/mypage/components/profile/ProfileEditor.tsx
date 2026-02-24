"use client";

import Image from "next/image";
import { Input } from "@/components/common/Input";
import { Pencil } from "lucide-react";

export default function ProfileEditor() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* 프로필 아이콘 */}
      <div className="relative w-16 h-16 rounded-full overflow-hidden">
        <Image src="/icons/logo.svg" alt="Profile Logo" fill className="object-cover" />
      </div>
      {/* 이름 수정 Input 입력칸 + 연필 아이콘 버튼 */}
      <div className="w-full max-w-100 h-10 mt-4 mb-3">
        <Input
          className="w-full h-full text-ot-gray-800! bg-ot-primary-100 text-center placeholder:text-ot-gray-800"
          placeholder="클릭 시 수정 가능"
        />
      </div>
    </div>
  );
}
