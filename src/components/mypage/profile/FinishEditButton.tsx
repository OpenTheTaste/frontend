"use client";

import { useState } from "react";
import CommonButton from "@/components/common/CommonButton";

export default function FinishEditButton() {
  const [isFinishEdit, setIsFinishEdit] = useState<boolean>(false);

  return (
    <div>
      <CommonButton
        onClick={() => setIsFinishEdit(true)}
        className="mt-4 mb-4 py-2 px-25 text-foreground text-[24px] font-bold"
      >
        수정하기
      </CommonButton>
    </div>
  );
}
