"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUp, Loader2 } from "lucide-react";
import { CommonButton, ConfirmModal, Toggle } from "@base-components";
import { useDeleteMyreview } from "@entities/myreview/hooks";
import { ReviewListItem } from "@entities/review/api/review";
import { useEditReview, useWriteReview } from "@entities/review/hooks";
import { useInfiniteReviewList } from "@entities/review/hooks/useReviewList";
import { useInfiniteScroll } from "@shared/hooks/useInfiniteScroll";
import { formatDate } from "@shared/lib";

interface ReviewSectionProps {
  isExpandAllReviews: boolean;
  setIsExpandAllReviews: (value: boolean) => void;
  contentsId: number;
}

export default function ReviewSection({
  isExpandAllReviews,
  setIsExpandAllReviews,
  contentsId,
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
    contentsId,
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
      contentId: contentsId,
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
        className="w-full text-ot-text placeholder-ot-gray-600 py-2 px-3 border border-ot-gray-800 rounded-lg"
      />
      <div className="flex items-center justify-end gap-3 mt-3">
        <label
          htmlFor={`${idPrefix}-spoiler`}
          className="inline-flex items-center gap-2 cursor-pointer select-none"
        >
          <input
            id={`${idPrefix}-spoiler`}
            name="spoiler"
            type="checkbox"
            className="custom-checkbox"
            checked={isSpoilerReview}
            onChange={() => setIsSpoilerReview((prev) => !prev)}
          />
          <p className="text-sm text-ot-text leading-none">스포 포함</p>
        </label>
        <CommonButton
          onClick={handleSubmitReview}
          className="px-2 py-1 rounded-sm"
          disabled={isWritePending}
        >
          <p className="text-sm">{isWritePending ? "등록 중..." : "등록"}</p>
        </CommonButton>
      </div>
      <div className="flex gap-2 justify-end mt-2 text-ot-text">
        <Toggle
          isOn={showSpoiler}
          onToggle={() => setShowSpoiler((prev) => !prev)}
        />
        <p className="text-xs leading-none">스포 포함</p>
      </div>
    </>
  );

  const reviewListJSX = (
    <div className="overflow-y-auto flex-1 mt-2">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-ot-gray-600">불러오는 중...</p>
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-ot-gray-600">댓글을 불러오지 못했습니다.</p>
        </div>
      ) : filteredSpoilerReviews.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-ot-gray-600">작성된 댓글이 없습니다.</p>
        </div>
      ) : (
        <div>
          {filteredSpoilerReviews.map((item: ReviewListItem) => (
            <div
              key={item.commentId}
              className="flex flex-col p-3 text-ot-text mt-1 border-ot-gray-700 border-b"
            >
              {editingReviewId === item.commentId ? (
                <>
                  <textarea
                    placeholder="댓글을 입력하세요"
                    value={editingReview}
                    onChange={(e) => setEditingReview(e.target.value)}
                    className="w-full text-ot-text placeholder-ot-gray-600 py-2 px-3 border border-ot-gray-800 rounded-lg"
                  />
                  <div className="flex items-center justify-end gap-3 mt-3">
                    <label
                      htmlFor="editingSpoiler"
                      className="inline-flex items-center gap-2 cursor-pointer select-none mr-2"
                    >
                      <input
                        id="editingSpoiler"
                        name="editingSpoiler"
                        type="checkbox"
                        className="custom-checkbox"
                        checked={editingSpoiler}
                        onChange={() => setEditingSpoiler((prev) => !prev)}
                      />
                      <p className="text-sm text-ot-text leading-none">
                        스포 포함
                      </p>
                    </label>
                    <CommonButton
                      onClick={() => handleSaveEditReview(item.commentId)}
                      className="px-2 py-1 rounded-sm"
                    >
                      <p className="text-sm">수정</p>
                    </CommonButton>
                    <CommonButton
                      onClick={handleCancelEdit}
                      variant="secondary"
                      className="px-2 py-1 rounded-sm"
                    >
                      <p className="text-sm">취소</p>
                    </CommonButton>
                  </div>
                </>
              ) : (
                <>
                  <p className="flex-nowrap flex">{item.content}</p>
                  <div className="flex items-center">
                    <div className="flex text-sm pt-1 text-ot-gray-600">
                      <p>
                        {item.nickname} ⋅ {formatDate(item.createdAt)}
                      </p>
                    </div>
                    {/* FIXME: 응답값 추가 요청함 */}
                    {/* {item.myself && ( */}
                    <div className="flex justify-center items-center ml-auto">
                      <button
                        onClick={() => handleEditReview(item.commentId)}
                        className="text-sm flex mr-2 hover:text-ot-gray-600 cursor-pointer disabled:cursor-not-allowed"
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
                        className="text-sm flex hover:text-ot-gray-600 cursor-pointer disabled:cursor-not-allowed"
                      >
                        {isDeletePending && deleteTargetId === item.commentId
                          ? "삭제 중..."
                          : "삭제"}
                      </button>
                    </div>
                    {/* )} */}
                  </div>
                </>
              )}
            </div>
          ))}

          <div ref={observerRef} className="h-4 flex justify-center">
            {isFetchingNextPage && (
              <Loader2
                className="animate-spin text-ot-placeholder mt-4"
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
        className="p-6 rounded-lg flex flex-col mb-6 overflow-hidden"
        variants={containerVariants}
        initial={false}
        animate={isExpandAllReviews ? "expanded" : "collapsed"}
        transition={slideTransition}
      >
        <div className="flex flex-row justify-between">
          <p className="text-2xl font-bold text-ot-text mb-3">댓글</p>

          {isExpandAllReviews ? (
            <button
              onClick={() => {
                handleCancelEdit();
                setIsExpandAllReviews(false);
              }}
              className="flex gap-1 items-center group cursor-pointer"
            >
              <ArrowUp className="w-4 h-4 stroke-1 stroke-ot-gray-600 group-hover:stroke-ot-gray-800" />
              <p className="text-sm text-ot-gray-600 group-hover:text-ot-gray-800">
                접기
              </p>
            </button>
          ) : (
            <button
              onClick={() => {
                handleCancelEdit();
                setIsExpandAllReviews(true);
              }}
              className="flex gap-1 items-center group cursor-pointer"
            >
              <ArrowDown className="w-4 h-4 stroke-1 stroke-ot-gray-600 group-hover:stroke-ot-gray-800" />
              <p className="text-sm text-ot-gray-600 group-hover:text-ot-gray-800">
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
