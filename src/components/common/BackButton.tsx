"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      aria-label="뒤로 가기"
      onClick={() => router.back()}
      className="flex items-center justify-center top-37 left-12 z-50 cursor-pointer hover:opacity-70 transition-opacity"
    >
      <Image src="/icons/BackButton.svg" alt="뒤로 가기" width={20} height={40} />
    </button>
  );
}
