"use client";

import { useState } from "react";
import Link from "next/link";
import MyReviewModal from "@/components/mypage/main/MyReviewModal";
import CommonButton from "@/components/common/CommonButton";

export default function UserMenuButtons() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="flex items-center gap-5">
      {/* "대시보드" 버튼 : 공통 컴포넌트 버튼 디자인 사용 */}
      <Link href="/mypage/dashboard">
        <CommonButton className="py-3 px-[2.531rem] text-foreground text-[1.125rem] font-semibold">
          대시보드
        </CommonButton>
      </Link>

      {/* "내 댓글 목록" 버튼 : 공통 컴포넌트 버튼 디자인 사용 */}
      <CommonButton
        onClick={() => setIsModalOpen(true)}
        className="py-3 px-6 text-foreground text-[1.125rem] font-semibold"
      >
        내 댓글 목록
      </CommonButton>

      {/* 내 댓글 목록 모달창 */}
      <MyReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
