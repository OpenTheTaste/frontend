"use client";

import { useRouter } from "next/navigation";
import CommonButton from "@/components/common/CommonButton";
import { Category } from "@/types/interest/category";

interface FinishEditButtonProps {
  selectedTags: Record<Category, string[]>;
}

export default function FinishEditButton({ selectedTags }: FinishEditButtonProps) {
  const router = useRouter();

  const handleFinishEdit = () => {
    console.log("새로 저장한 선호 태그들 : ", selectedTags); // 콘솔 출력
    router.push("/mypage");
  };

  return (
    <div>
      <CommonButton
        onClick={handleFinishEdit}
        className="mt-4 mb-4 py-3 px-25 text-foreground text-[18px] font-bold"
      >
        수정하기
      </CommonButton>
    </div>
  );
}
