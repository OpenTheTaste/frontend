"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export const BackButton = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      aria-label="뒤로 가기"
      onClick={() => router.back()}
      className="absolute top-4 left-11 flex items-center justify-center cursor-pointer"
    >
      <ChevronLeft size={36} className="text-ot-text hover:text-ot-gray-600" />
    </button>
  );
};
