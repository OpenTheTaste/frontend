"use client";

import { useState } from "react";
import CommonButton from "@/components/common/CommonButton";

export default function FinishEditButton() {
  const [isFinishEdit, setIsFinishEdit] = useState<boolean>(false);

  return (
    <div>
      <CommonButton
        onClick={() => setIsFinishEdit(true)}
        className="mt-8 mb-2.5 py-4 px-34 text-foreground text-[2.25rem] font-bold"
      >
        수정하기
      </CommonButton>
    </div>
  );
}
