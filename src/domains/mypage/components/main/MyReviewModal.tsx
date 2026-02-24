"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X } from "lucide-react";
import { mockReviews } from "@/mocks/mockReviews";
import ConfirmModal from "@/domains/mypage/components/ConfirmModal";
import { useOutsideClick } from "@/hooks/useOutsideClick";

interface MyReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MyReviewModal({ isOpen, onClose }: MyReviewModalProps) {
  // Mock 데이터 아직 리뷰 숫자만 있으니까 number, 아니면 string으로 나중에 바꾸기
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useOutsideClick(modalRef, onClose, isOpen); // 관련 hook 추가하여 사용

  useEffect(() => {
    setIsMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden"; // 모달창 열리면 뒷 원본 페이지 스크롤 기능 X
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      window.addEventListener("keydown", handleEsc); // ESC 누르면 모달창 닫음
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleEsc);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !isMounted) {
    return null;
  }

  const handleDeleteClick = (reviewId: number) => {
    setDeleteTargetId(reviewId);
  };

  const closeConfirmModal = () => setDeleteTargetId(null);

  const handleClose = () => {
    setDeleteTargetId(null);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className="flex flex-col relative w-200 max-h-[85vh] rounded-xl bg-ot-gray-800 shadow-2xl overflow-hidden shadow-black/50"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-7 top-7 transition-opacity hover:opacity-70"
          onClick={handleClose}
        >
          <X size={24} strokeWidth={2} />
        </button>

        <div className="flex-1 mt-25 mx-15 mb-15 overflow-y-auto no-scrollbar">
          <div className="flex flex-col gap-5">
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
