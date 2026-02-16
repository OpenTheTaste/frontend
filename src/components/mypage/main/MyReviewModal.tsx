"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { mockReviews } from "@/mocks/mockReviews";
import ConfirmModal from "@/components/mypage/ConfirmModal";

interface MyReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MyReviewModal({ isOpen, onClose }: MyReviewModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  // 1. 확인 모달 열림 상태만 관리 (id 저장은 일단 생략 가능)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // 서버 사이드에서는 렌더링하지 않음 -> 에러 방지
  }
  if (!isOpen) {
    return null;
  }

  // 2. 삭제 버튼 클릭 시 확인 모달 띄우기
  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  // 3. 확인 모달을 닫는 단순한 함수
  const closeConfirmModal = () => {
    setIsDeleteModalOpen(false);
  };

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        // className="flex flex-col relative w-[40vw] max-w-220 aspect-[1/1.22] max-h-[90vh] rounded-xl bg-ot-gray-800 shadow-2xl overflow-hidden"
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
              <div key={review.id} className="relative flex w-full gap-5 shrink-0">
                {/* 왼쪽 댓글단 작품 이미지 (108 * 102) */}
                <div className="shrink-0 w-45 h-25.5 bg-black rounded overflow-hidden">
                  <img src={review.image} alt="Review" className="w-full h-full object-cover" />
                </div>

                {/* 텍스트 영역 */}
                <div className="flex flex-col flex-1 pt-4 pr-8 gap-1">
                  {/* 작성한 댓글 내용 */}
                  <p className="text-foreground text-[16px]">{review.content}</p>

                  {/* 2. 작성자 & 작성 날짜 */}
                  <div className="flex items-center gap-1 text-[14px] text-ot-gray-400">
                    <span>{review.userId}</span>
                    <span>·</span>
                    <span>{review.date}</span>
                  </div>
                </div>

                {/* 댓글별 삭제 버튼 */}
                <button
                  className="absolute top-0 right-0 text-ot-gray-400 hover:text-ot-gray-600"
                  onClick={handleDeleteClick}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        message="댓글을 삭제하시겠습니까?"
        onConfirm={closeConfirmModal} // 아직 그냥 닫히기만 함
        onClose={closeConfirmModal} // 아직 그냥 닫히기만 함
      />
    </div>,
    document.body,
  );
}
