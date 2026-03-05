"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CommonButton, ConfirmModal } from "@base-components";
import { withdrawApi } from "@/entities/auth/api";

export default function WithdrawButton() {
  const router = useRouter();
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] =
    useState<boolean>(false);

  const handleWithdraw = async () => {
    try {
      await withdrawApi();
      router.push("/auth");
      console.log("회원탈퇴 완료");
    } catch (error) { 
      console.error('회원탈퇴 실패', error);
      setIsWithdrawModalOpen(false);
    }
  };

  return (
    <div>
      <CommonButton
        onClick={() => setIsWithdrawModalOpen(true)}
        className="mt-6 mb-4 py-3 px-25 text-ot-text text-[18px] font-bold"
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
