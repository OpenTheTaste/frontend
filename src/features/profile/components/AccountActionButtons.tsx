"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { postLogoutApi } from "@entities/auth/api";
import { CommonButton, ConfirmModal } from "@shared/components";

export default function AccountActionButtons() {
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);

  const handleLogout = async () => {
    // 실제 로그아웃 처리 로직 작성 부분 (API 호출 등)
    try {
      await postLogoutApi();
      router.push("/auth");
    } catch (error) {
      console.error("[로그아웃 실패]", error);
      setIsLogoutModalOpen(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* 로그아웃 버튼 : 클릭 시 로그아웃 확인 모달창 열림 */}
      <CommonButton
        onClick={() => setIsLogoutModalOpen(true)}
        variant="secondary"
        className="text-ot-text px-5 py-2 text-[14px] font-semibold"
      >
        로그아웃
      </CommonButton>
      {/* 회원탈퇴 버튼 : 클릭 시 회원탈퇴 페이지로 이동 */}
      <Link href="/mypage/withdraw">
        <CommonButton
          variant="secondary"
          className="text-ot-text px-5 py-2 text-[14px] font-semibold"
        >
          회원탈퇴
        </CommonButton>
      </Link>
      <ConfirmModal
        isOpen={isLogoutModalOpen}
        message="로그아웃 하시겠습니까?"
        onConfirm={handleLogout}
        onClose={() => setIsLogoutModalOpen(false)}
      />
    </div>
  );
}
