"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, Loader2 } from "lucide-react";
import { ConfirmModal } from "@base-components";
import { useMyreviews } from "@entities/myreview/hooks";
import { useDeleteMyreview } from "@entities/myreview/hooks";
import { useOutsideClick } from "@shared/hooks";
import { useInfiniteScrollInModal } from "@features/mypage/components"
import { formatDate } from "@shared/lib";

interface MyReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MyReviewModal({ isOpen, onClose }: MyReviewModalProps) {
  // Mock 데이터 아직 리뷰 숫자만 있으니까 number, 아니면 string으로 나중에 바꾸기
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const deleteTargetIdRef = useRef<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null); // 모달 스크롤 영역 인식 관련

  useEffect(() => {
    deleteTargetIdRef.current = deleteTargetId;
  }, [deleteTargetId]);

  const { myreviews, isLoading, isError, hasNextPage, isFetchingNextPage, fetchNextPage } = useMyreviews();
  const { mutate: deleteComment, isPending } = useDeleteMyreview();

  const { observerRef } = useInfiniteScrollInModal({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    scrollContainerRef: scrollRef,
    isOpen, // 모달 여닫힘 인식
  });

  useOutsideClick(modalRef, onClose, isOpen && deleteTargetId === null); // 관련 hook 추가하여 사용

  useEffect(() => {
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

  if (typeof window === "undefined" || !isOpen) {
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
        className="bg-ot-gray-900 relative flex max-h-[85vh] w-200 flex-col overflow-hidden rounded-xl shadow-2xl shadow-black/50"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-7 right-7 cursor-pointer transition-opacity hover:opacity-70"
          onClick={handleClose}
        >
          <X size={24} strokeWidth={2} />
        </button>

        <div ref={scrollRef} className="no-scrollbar mx-15 mt-15 mb-10 flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-ot-text">로딩 중...</p>
            </div>
          ) : isError ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-ot-gray-600">
                댓글을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
              </p>
            </div>
          ) : myreviews.length === 0 ? (
            <div className="flex items-center justify-center">
              <p className="text-ot-gray-600">작성한 댓글이 없습니다.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {myreviews.map((review) => (
                <div
                  key={review.commentId}
                  className="group hover:bg-ot-gray-800 relative flex w-full shrink-0 cursor-pointer items-center gap-5 rounded-xl p-4 transition-all duration-200"
                >
                  {/* 왼쪽 댓글단 작품 이미지 (16 : 9) */}
                  <div className="relative aspect-video w-45 shrink-0 overflow-hidden rounded bg-black">
                    <Image
                      src={review.contentsPosterUrl}
                      alt="Review"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* 텍스트 영역 */}
                  <div className="flex flex-1 flex-col pr-8">
                    {/* 작성한 댓글 내용 */}
                    <div className="flex flex-col justify-center gap-3">
                      <p className="text-ot-text text-sm">{review.content}</p>

                      {/* 작성자 & 작성 날짜 */}
                      <div className="text-ot-gray-600 flex items-center gap-1 text-xs">
                        {/* <span>{review.writerNickname}</span> */}
                        {/* <span>·</span> */}
                        <span>{formatDate(review.createdDate)}</span>
                      </div>
                    </div>
                  </div>

                  {/* 댓글별 삭제 버튼 */}
                  <button
                    className="text-ot-gray-400 hover:text-ot-gray-600 absolute top-2 right-2 cursor-pointer p-2"
                    onClick={() => handleDeleteClick(review.commentId)}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div ref={observerRef} className="flex h-4 justify-center">
            {isFetchingNextPage && (
              <Loader2 className="text-ot-placeholder mt-4 animate-spin" size={20} />
            )}
          </div>
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
