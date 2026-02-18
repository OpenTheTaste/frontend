"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X } from "lucide-react";
import { mockReviews } from "@/mocks/mockReviews";
import ConfirmModal from "@/components/mypage/ConfirmModal";

interface MyReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MyReviewModal({ isOpen, onClose }: MyReviewModalProps) {
  // Mock 데이터 아직 리뷰 숫자만 있으니까 number, 아니면 string으로 나중에 바꾸기
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  if (!isOpen) {
    return null;
  }

  const handleDeleteClick = (reviewId: number) => {
    setDeleteTargetId(reviewId);
  };
  const closeConfirmModal = () => {
    setDeleteTargetId(null);
  };

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className="flex flex-col relative w-220 h-270 rounded-xl bg-ot-gray-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-7 top-7 transition-opacity hover:opacity-70"
          onClick={onClose}
        >
          <X size={32} strokeWidth={2} />
        </button>

        <div className="flex-1 mt-30 mx-15 mb-4 overflow-y-auto no-scrollbar">
          <div className="flex flex-col gap-7.5">
            {mockReviews.map((review) => (
              <div key={review.id} className="relative flex items-start w-full gap-5 shrink-0">
                {/* 왼쪽 댓글단 작품 이미지 (16 : 9) */}
                <div className="relative shrink-0 w-45 aspect-video bg-black rounded overflow-hidden">
                  <Image src={review.image} alt="Review" fill className="object-cover" />
                </div>

                {/* 텍스트 영역 */}
                <div className="flex flex-col flex-1 pt-4 pr-8 gap-1">
                  {/* 작성한 댓글 내용 */}
                  <p className="text-foreground text-[16px]">{review.content}</p>

                  {/* 작성자 & 작성 날짜 */}
                  <div className="flex items-center gap-1 text-[14px] text-ot-gray-400">
                    <span>{review.userId}</span>
                    <span>·</span>
                    <span>{review.date}</span>
                  </div>
                </div>

                {/* 댓글별 삭제 버튼 */}
                <button
                  className="absolute top-0 right-0 text-ot-gray-400 hover:text-ot-gray-600"
                  onClick={() => handleDeleteClick(review.id)}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={deleteTargetId !== null}
        message="댓글을 삭제하시겠습니까?"
        onConfirm={closeConfirmModal} // 아직 그냥 닫히기만 함
        onClose={closeConfirmModal} // 아직 그냥 닫히기만 함
      />
    </div>,
    document.body,
  );
}
