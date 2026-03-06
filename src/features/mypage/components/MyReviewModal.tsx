"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X } from "lucide-react";
import { ConfirmModal } from "@base-components";
import { useOutsideClick } from "@shared/hooks/useOutsideClick";
import { useMyreviews } from "@entities/myreview/hooks";
import { useDeleteMyreview } from "@entities/myreview/hooks";
import { formatDate } from "@shared/lib";

interface MyReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MyReviewModal({ isOpen, onClose }: MyReviewModalProps) {
  // Mock 데이터 아직 리뷰 숫자만 있으니까 number, 아니면 string으로 나중에 바꾸기
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const deleteTargetIdRef = useRef<number | null>(null);
  deleteTargetIdRef.current = deleteTargetId; // 항상 최신 값 동기화

  const { data, isLoading, isError } = useMyreviews();
  const { mutate: deleteComment, isPending } = useDeleteMyreview();

  const reviews = data?.pages.flatMap((page) => page.dataList) ?? [];

  useOutsideClick(modalRef, onClose, isOpen && deleteTargetId === null); // 관련 hook 추가하여 사용

  useEffect(() => {
    setIsMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden"; // 모달창 열리면 뒷 원본 페이지 스크롤 기능 X
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          if (deleteTargetIdRef.current !== null) {
            setDeleteTargetId(null); // ConfirmModal만 닫기
          } else {
            onClose(); // MyReviewModal 닫기
          }
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

  const handleConfirmDelete = () => {
    if (deleteTargetId === null) return;
    deleteComment(deleteTargetId, {
      onSuccess: closeConfirmModal,
    });
  };

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className="flex flex-col relative w-200 max-h-[85vh] rounded-xl bg-ot-gray-800 shadow-2xl overflow-hidden shadow-black/50"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-7 top-7 transition-opacity hover:opacity-70 cursor-pointer"
          onClick={handleClose}
        >
          <X size={24} strokeWidth={2} />
        </button>

        <div className="flex-1 mt-15 mx-15 mb-10 overflow-y-auto no-scrollbar">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-ot-text">로딩 중 ~</p>
            </div>
          ) : isError ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-ot-gray-600">
                댓글을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
              </p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="flex items-center justify-center">
              <p className="text-ot-gray-600">작성한 댓글이 없습니다.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {reviews.map((review) => (
                <div
                  key={review.commentId}
                  className="relative group flex items-center w-full gap-5 shrink-0 p-4 rounded-xl hover:bg-ot-gray-700 transition-all duration-200 cursor-pointer"
                >
                  {/* 왼쪽 댓글단 작품 이미지 (16 : 9) */}
                  <div className="relative shrink-0 w-45 aspect-video bg-black rounded overflow-hidden">
                    <Image
                      src={review.contentsPosterUrl}
                      alt="Review"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* 텍스트 영역 */}
                  <div className="flex flex-col flex-1 pr-8">
                    {/* 작성한 댓글 내용 */}
                    <div className="flex gap-3 flex-col justify-center">
                      <p className="text-ot-text text-sm">{review.content}</p>

                      {/* 작성자 & 작성 날짜 */}
                      <div className="flex items-center gap-1 text-xs text-ot-gray-600">
                        {/* <span>{review.writerNickname}</span> */}
                        {/* <span>·</span> */}
                        <span>{formatDate(review.createdDate)}</span>
                      </div>
                    </div>
                  </div>

                  {/* 댓글별 삭제 버튼 */}
                  <button
                    className="absolute top-2 right-2 p-2 text-ot-gray-400 hover:text-ot-gray-600 cursor-pointer"
                    onClick={() => handleDeleteClick(review.commentId)}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <ConfirmModal
        isOpen={deleteTargetId !== null}
        message="댓글을 삭제하시겠습니까?"
        onConfirm={handleConfirmDelete}
        onClose={closeConfirmModal}
        disabled={isPending}
      />
    </div>,
    document.body,
  );
}
