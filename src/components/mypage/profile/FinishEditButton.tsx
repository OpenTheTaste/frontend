"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CommonButton from "@/components/common/CommonButton";

export default function FinishEditButton() {
  const router = useRouter();
  const [isFinishEdit, setIsFinishEdit] = useState<boolean>(false);

  const handleFinishEdit = () => {
    setIsFinishEdit(true);
    router.push("/mypage");
  };

  return (
    <div>
      <CommonButton
        onClick={handleFinishEdit}
        className="mt-4 mb-4 py-2 px-25 text-foreground text-[24px] font-bold"
      >
        수정하기
      </CommonButton>
    </div>
  );
}
