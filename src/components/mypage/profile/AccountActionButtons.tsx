"use client";

import { useState } from "react";
import Link from "next/link";
import CommonButton from "@/components/common/CommonButton";
import ConfirmModal from "../ConfirmModal";

export default function AccoutActionButtons() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);

  const handleLogout = () => {
    // 실제 로그아웃 처리 로직 작성 부분 (API 호출 등)
    console.log("로그아웃 완료");
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="flex items-center mr-4 gap-8">
      {/* 로그아웃 버튼 : 클릭 시 로그아웃 확인 모달창 열림 */}
      <CommonButton
        onClick={() => setIsLogoutModalOpen(true)}
        className="py-3 px-10 text-foreground text-[18px] font-semibold"
      >
        로그아웃
      </CommonButton>
      {/* 회원탈퇴 버튼 : 클릭 시 회원탈퇴 페이지로 이동 */}
      <Link href="/mypage/withdraw">
        <CommonButton className="py-3 px-10 text-foreground text-[18px] font-semibold">
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
