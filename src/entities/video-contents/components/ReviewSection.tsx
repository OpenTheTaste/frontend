"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUp, Loader2 } from "lucide-react";
import { CommonButton, ConfirmModal, Toggle } from "@base-components";
import { useDeleteMyreview } from "@entities/myreview/hooks";
import { ReviewListItem } from "@entities/review/api/review";
import { useEditReview, useWriteReview } from "@entities/review/hooks";
import { useInfiniteReviewList } from "@entities/review/hooks";
import { useInfiniteScroll } from "@shared/hooks";
import { formatDate } from "@shared/lib";

interface ReviewSectionProps {
  isExpandAllReviews: boolean;
  setIsExpandAllReviews: (value: boolean) => void;
  mediaId: number;
}

export default function ReviewSection({
  isExpandAllReviews,
  setIsExpandAllReviews,
  mediaId,
}: ReviewSectionProps) {
  const [isSpoilerReview, setIsSpoilerReview] = useState<boolean>(false);
  const [showSpoiler, setShowSpoiler] = useState<boolean>(false);
  const [newReview, setNewReview] = useState<string>("");

  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
  const [editingReview, setEditingReview] = useState<string>("");
  const [editingSpoiler, setEditingSpoiler] = useState<boolean>(false);

  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const {
    reviewList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteReviewList({
    page: 0,
    size: 10,
    mediaId,
    includeSpoiler: showSpoiler,
  });
  const filteredSpoilerReviews = reviewList;
  const { observerRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const { mutateAsync: writeReview, isPending: isWritePending } =
    useWriteReview();

  const { mutateAsync: editReview, isPending: isEditPending } = useEditReview();
  const { mutate: deleteReview, isPending: isDeletePending } =
    useDeleteMyreview();

  // 등록
  const handleSubmitReview = async () => {
    if (!newReview.trim()) return;

    await writeReview({
      mediaId: mediaId,
      content: newReview,
      isSpoiler: isSpoilerReview,
    });

    if (isSpoilerReview) setShowSpoiler(true);
    setNewReview("");
    setIsSpoilerReview(false);
  };

  // 수정
  const handleEditReview = (commentId: number) => {
    const target = reviewList.find((r) => r.commentId === commentId);
    if (!target) return;
    setEditingReviewId(commentId);
    setEditingReview(target.content);
    setEditingSpoiler(target.spoiler);
  };

  // 수정 취소
  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setEditingReview("");
    setEditingSpoiler(false);
  };

  // 수정 저장
  const handleSaveEditReview = async (commentId: number) => {
    if (!editingReview.trim()) return;

    await editReview({
      commentId,
      content: editingReview,
      isSpoiler: editingSpoiler,
    });

    setEditingReviewId(null);
    setEditingReview("");
    setEditingSpoiler(false);
  };

  // 삭제
  const handleConfirmDelete = () => {
    if (deleteTargetId === null) return;
    deleteReview(deleteTargetId);
    setDeleteTargetId(null);
  };

  const closeConfirmModal = () => setDeleteTargetId(null);

  const slideTransition = { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const };

  const containerVariants = {
    collapsed: { height: "60vh" },
    expanded: { height: "100vh" },
  };

  const reviewInput = (idPrefix: string) => (
    <>
      <textarea
        placeholder="댓글을 입력하세요"
        value={newReview}
        onChange={(e) => setNewReview(e.target.value)}
        className="text-ot-text placeholder-ot-gray-600 border-ot-gray-800 w-full rounded-lg border px-3 py-2"
      />
      <div className="mt-3 flex items-center justify-end gap-3">
        <label
          htmlFor={`${idPrefix}-spoiler`}
          className="inline-flex cursor-pointer items-center gap-2 select-none"
        >
          <input
            id={`${idPrefix}-spoiler`}
            name="spoiler"
            type="checkbox"
            className="custom-checkbox"
            checked={isSpoilerReview}
            onChange={() => setIsSpoilerReview((prev) => !prev)}
          />
          <p className="text-ot-text text-sm leading-none">스포 포함</p>
        </label>
        <CommonButton
          onClick={handleSubmitReview}
          className="rounded-sm px-2 py-1"
          disabled={isWritePending}
        >
          <p className="text-sm">{isWritePending ? "등록 중..." : "등록"}</p>
        </CommonButton>
      </div>
      <div className="text-ot-text mt-2 flex justify-end gap-2">
        <Toggle
          isOn={showSpoiler}
          onToggle={() => setShowSpoiler((prev) => !prev)}
        />
        <p className="text-xs leading-none">스포 포함</p>
      </div>
    </>
  );

  const reviewListJSX = (
    <div className="mt-2 flex-1 overflow-y-auto">
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-ot-gray-600">불러오는 중...</p>
        </div>
      ) : isError ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-ot-gray-600">댓글을 불러오지 못했습니다.</p>
        </div>
      ) : filteredSpoilerReviews.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-ot-gray-600">작성된 댓글이 없습니다.</p>
        </div>
      ) : (
        <div>
          {filteredSpoilerReviews.map((item: ReviewListItem) => (
            <div
              key={item.commentId}
              className="text-ot-text border-ot-gray-700 mt-1 flex flex-col border-b p-3"
            >
              {editingReviewId === item.commentId ? (
                <>
                  <textarea
                    placeholder="댓글을 입력하세요"
                    value={editingReview}
                    onChange={(e) => setEditingReview(e.target.value)}
                    className="text-ot-text placeholder-ot-gray-600 border-ot-gray-800 w-full rounded-lg border px-3 py-2"
                  />
                  <div className="mt-3 flex items-center justify-end gap-3">
                    <label
                      htmlFor="editingSpoiler"
                      className="mr-2 inline-flex cursor-pointer items-center gap-2 select-none"
                    >
                      <input
                        id="editingSpoiler"
                        name="editingSpoiler"
                        type="checkbox"
                        className="custom-checkbox"
                        checked={editingSpoiler}
                        onChange={() => setEditingSpoiler((prev) => !prev)}
                      />
                      <p className="text-ot-text text-sm leading-none">
                        스포 포함
                      </p>
                    </label>
                    <CommonButton
                      onClick={() => handleSaveEditReview(item.commentId)}
                      className="rounded-sm px-2 py-1"
                    >
                      <p className="text-sm">수정</p>
                    </CommonButton>
                    <CommonButton
                      onClick={handleCancelEdit}
                      variant="secondary"
                      className="rounded-sm px-2 py-1"
                    >
                      <p className="text-sm">취소</p>
                    </CommonButton>
                  </div>
                </>
              ) : (
                <>
                  <p className="flex flex-nowrap">{item.content}</p>
                  <div className="flex items-center">
                    <div className="text-ot-gray-600 flex pt-1 text-sm">
                      <p>
                        {item.nickname} ⋅ {formatDate(item.createdAt)}
                      </p>
                    </div>
                    {/* FIXME: 응답값 추가 요청함 */}
                    {item.mine && (
                      <div className="ml-auto flex items-center justify-center">
                        <button
                          onClick={() => handleEditReview(item.commentId)}
                          className="hover:text-ot-gray-600 mr-2 flex cursor-pointer text-sm disabled:cursor-not-allowed"
                          disabled={
                            isEditPending && editingReviewId === item.commentId
                          }
                        >
                          <p className="text-sm">
                            {isEditPending && editingReviewId === item.commentId
                              ? "수정 중..."
                              : "수정"}
                          </p>
                        </button>
                        <button
                          onClick={() => setDeleteTargetId(item.commentId)}
                          disabled={
                            isDeletePending && deleteTargetId === item.commentId
                          }
                          className="hover:text-ot-gray-600 flex cursor-pointer text-sm disabled:cursor-not-allowed"
                        >
                          {isDeletePending && deleteTargetId === item.commentId
                            ? "삭제 중..."
                            : "삭제"}
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}

          <div ref={observerRef} className="flex h-4 justify-center">
            {isFetchingNextPage && (
              <Loader2
                className="text-ot-placeholder mt-4 animate-spin"
                size={20}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <motion.div
        layout
        className="mb-6 flex flex-col overflow-hidden rounded-lg p-6"
        variants={containerVariants}
        initial={false}
        animate={isExpandAllReviews ? "expanded" : "collapsed"}
        transition={slideTransition}
      >
        <div className="flex flex-row justify-between">
          <p className="text-ot-text mb-3 text-2xl font-bold">댓글</p>

          {isExpandAllReviews ? (
            <button
              onClick={() => {
                handleCancelEdit();
                setIsExpandAllReviews(false);
              }}
              className="group flex cursor-pointer items-center gap-1"
            >
              <ArrowUp className="stroke-ot-gray-600 group-hover:stroke-ot-gray-800 h-4 w-4 stroke-1" />
              <p className="text-ot-gray-600 group-hover:text-ot-gray-800 text-sm">
                접기
              </p>
            </button>
          ) : (
            <button
              onClick={() => {
                handleCancelEdit();
                setIsExpandAllReviews(true);
              }}
              className="group flex cursor-pointer items-center gap-1"
            >
              <ArrowDown className="stroke-ot-gray-600 group-hover:stroke-ot-gray-800 h-4 w-4 stroke-1" />
              <p className="text-ot-gray-600 group-hover:text-ot-gray-800 text-sm">
                전체 보기
              </p>
            </button>
          )}
        </div>

        {reviewInput(isExpandAllReviews ? "expanded" : "collapsed")}
        {reviewListJSX}
      </motion.div>

      <ConfirmModal
        isOpen={deleteTargetId !== null}
        message="댓글을 삭제하시겠습니까?"
        onConfirm={handleConfirmDelete}
        onClose={closeConfirmModal}
        confirmText="삭제"
        cancelText="취소"
      />
    </>
  );
}
