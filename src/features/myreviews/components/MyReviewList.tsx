"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { ConfirmModal } from "@base-components";
import { useMyreviews } from "@entities/myreview/hooks";
import { useDeleteMyreview } from "@entities/myreview/hooks";
import { formatDate } from "@shared/lib";
import { useMediaLink } from "@shared/hooks";
import { Pagination } from "@features/myreviews/components";

export default function MyReviewList() {
  const [currentPage, setCurrentPage] = useState<number>(0); // 페이지네이션 관련
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const { myreviews, isLoading, isError, totalPage } = useMyreviews(currentPage);
  const { mutate: deleteComment, isPending } = useDeleteMyreview();
  const { getMediaHref } = useMediaLink();
  const router = useRouter();

  const closeConfirmModal = () => setDeleteTargetId(null);
  const handleConfirmDelete = () => {
    if (deleteTargetId === null) return;
    deleteComment(deleteTargetId, {
      onSuccess: closeConfirmModal,
    });
  };

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>댓글을 불러오지 못했습니다.</p>;
  if (myreviews.length === 0) return <p>작성한 댓글이 없습니다. </p>;

  return (
    <div className="flex flex-col gap-6">

      {/* 내 댓글목록 */}
      <div className="flex flex-col gap-4">
        {myreviews.map((review) => {
          const url = review.seriesMediaId
            ? `/contents/${review.seriesMediaId}/episode/${review.mediaId}?type=SERIES&commentId=${review.commentId}`
            : getMediaHref(review.mediaId, review.mediaType, { type: "recommend" }, review.commentId);

          return (
            <div
              key={review.commentId}
              onClick={() => router.push(url)}
              className="group hover:border-ot-gray-800 hover:bg-ot-gray-900 relative flex w-full shrink-0 cursor-pointer items-center gap-4 rounded-lg p-4 bg-ot-gray-900/60 border border-ot-gray-900 transition-all duration-200"
            >
              {/* 왼쪽 댓글단 작품 이미지 (16 : 9) */}
              <div className="relative aspect-video w-45 shrink-0 overflow-hidden rounded-lg bg-ot-background">
                <Image
                  src={review.contentsPosterUrl}
                  alt="Review"
                  fill
                  className="object-cover"
                />
              </div>

              {/* 텍스트 영역 */}
              <div className="flex flex-1 flex-col pr-8">
                <div className="flex flex-col justify-center gap-3">
                  <p className="text-ot-text text-sm">
                    {review.content}
                  </p>
                  <span className="text-ot-gray-600 flex items-center gap-1 text-xs">
                    {formatDate(review.createdDate)}
                  </span>
                </div>
              </div>

              {/* 댓글별 삭제 버튼 */}
              <button
                className="absolute top-2 right-2 cursor-pointer p-2 text-ot-gray-400 hover:text-ot-gray-600 hover:bg-ot-gray-800 rounded-sm transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteTargetId(review.commentId);
                }}
                aria-label="댓글 삭제"
              >
                <Trash2 size={16} />
              </button>
            </div>
          );
        })}
      </div>

      {/* 페이지네이션 */}
      <div className="mt-4">
        <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
          setPage={setCurrentPage}
        />
      </div>

      {/* 삭제 확인 모달 */}
      <ConfirmModal
        isOpen={deleteTargetId !== null}
        message="댓글을 삭제하시겠습니까?"
        onConfirm={handleConfirmDelete}
        onClose={closeConfirmModal}
        disabled={isPending}
      />
    </div>
  );
}