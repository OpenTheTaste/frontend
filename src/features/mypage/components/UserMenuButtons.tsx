"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MyReviewModal } from "@features/mypage/components";
import { CommonButton } from "@base-components";

export default function UserMenuButtons() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="flex items-center gap-5 mb-2">
      {/* "대시보드" 버튼 : 공통 컴포넌트 버튼 디자인 사용 */}
      <CommonButton
        variant="secondary"
        className="py-2 px-6 text-ot-text text-[16px] font-semibold"
        onClick={() => router.push("/mypage/dashboard")}
      >
        대시보드
      </CommonButton>

      {/* "내 댓글 목록" 버튼 : 공통 컴포넌트 버튼 디자인 사용 */}
      <CommonButton
        variant="secondary"
        onClick={() => setIsModalOpen(true)}
        className="py-2 px-4 text-ot-text text-[16px] font-semibold"
      >
        내 댓글 목록
      </CommonButton>

      {/* 내 댓글 목록 모달창 */}
      <MyReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
