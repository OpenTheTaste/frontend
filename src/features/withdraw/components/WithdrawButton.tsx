"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CommonButton, ConfirmModal } from "@base-components";
import { deleteWithdrawApi } from "@entities/auth/api";

export default function WithdrawButton() {
  const router = useRouter();
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] =
    useState<boolean>(false);

  const handleWithdraw = async () => {
    try {
      await deleteWithdrawApi();
      router.push("/auth");
    } catch (error) {
      console.error("회원탈퇴 실패", error);
      setIsWithdrawModalOpen(false);
    }
  };

  return (
    <div>
      <CommonButton
        onClick={() => setIsWithdrawModalOpen(true)}
        className="text-ot-text mt-6 mb-4 px-25 py-3 text-[18px] font-bold"
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
