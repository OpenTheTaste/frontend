"use client";

import { useState } from "react";
import CommonButton from "@/components/common/CommonButton";
import ConfirmModal from "../ConfirmModal";

export default function WithdrawButton() {
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState<boolean>(false);

  const handleWithdraw = () => {
    // 실제 회원탈퇴 처리 로직 작성 부분 (API 호출 등)
    console.log("회원탈퇴 완료");
    setIsWithdrawModalOpen(false);
  };

  return (
    <div>
      <CommonButton
        onClick={() => setIsWithdrawModalOpen(true)}
        className="mt-6 mb-4 py-3 px-25 text-foreground text-[18px] font-bold"
      >
        탈퇴하기
      </CommonButton>
      <ConfirmModal
        isOpen={isWithdrawModalOpen}
        message="계정이 영구 삭제됩니다."
        onConfirm={handleWithdraw}
        onClose={() => setIsWithdrawModalOpen(false)}
        confirmText="네, 탈퇴합니다"
        cancelText="더 머무르기"
      />
    </div>
  );
}
