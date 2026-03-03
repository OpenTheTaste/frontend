"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { CommonButton, ConfirmModal, Toggle } from "@base-components";
import { useState } from "react";
import { mockReview } from "@shared/mocks/mockReview";
import { Review } from "@shared/types/video-contents/review";
import { motion } from "framer-motion";

interface ReviewSectionProps {
  isExpandAllReviews: boolean;
  setIsExpandAllReviews: (value: boolean) => void;
}

export default function ReviewSection({
  isExpandAllReviews,
  setIsExpandAllReviews,
}: ReviewSectionProps) {
  const [isSpoilerReview, setIsSpoilerReview] = useState<boolean>(false); // 스포일러 댓글인지 여부 (등록시 사용-체크박스)
  const [showSpoiler, setShowSpoiler] = useState<boolean>(false); // 스포일러 보일지말지 - 토글
  const [newReview, setNewReview] = useState<string>(""); // 댓글 등록

  const [editingReviewId, setEditingReviewId] = useState<number | null>(null); // 수정중인 댓글 id
  const [editingReview, setEditingReview] = useState<string>(""); // 수정중인 댓글
  const [editingSpoiler, setEditingSpoiler] = useState<boolean>(false); // 수정중인 스포일러 상태

  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null); // 제거할 댓글 id
  const [reviewList, setReviewList] = useState<Review[]>(mockReview); // 댓글리스트

  // 등록
  const handleSubmitReview = () => {
    if (!newReview.trim()) return;

    // FIXME: 임시 로컬에서 구현하기 위한 코드
    const newReviewItem: Review = {
      id: Math.floor(Math.random() * 1000000),
      review: newReview,
      author: "나",
      date: new Date()
        .toLocaleString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
        .replace(/\. /g, ".")
        .replace(/\.$/, ""),
      myself: true,
      spoiler: isSpoilerReview,
    };

    setReviewList((prev) => [newReviewItem, ...prev]);

    // 스포포함 등록 시 바로 스포포함한 댓글 조회
    if (isSpoilerReview) {
      setShowSpoiler(true);
    } else {
      setShowSpoiler(false);
    }
    setNewReview("");
    setIsSpoilerReview(false);
  };

  // 수정
  const handleEditReview = (reviewId: number) => {
    const target = reviewList.find((r) => r.id === reviewId);
    if (!target) return;
    setEditingReviewId(reviewId);
    setEditingReview(target.review);
    setEditingSpoiler(target.spoiler);
  };

  // 수정 취소
  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setEditingReview("");
    setEditingSpoiler(false);
  };

  // 수정 저장
  const handleSaveEditReview = (reviewId: number) => {
    if (!editingReview.trim()) return;

    setReviewList((prev) =>
      prev.map((review) =>
        review.id === reviewId
          ? { ...review, review: editingReview, spoiler: editingSpoiler }
          : review,
      ),
    );

    // 스포포함 등록 시 바로 스포포함한 댓글 조회
    if (editingSpoiler) {
      setShowSpoiler(true);
    } else {
      setShowSpoiler(false);
    }
    setEditingReviewId(null);
    setEditingReview("");
    setEditingSpoiler(false);
  };

  // 삭제
  const handleConfirmDelete = () => {
    if (deleteTargetId === null) return;
    setReviewList((prev) =>
      prev.filter((review) => review.id !== deleteTargetId),
    );
    setDeleteTargetId(null);
  };

  // 모달 닫기
  const closeConfirmModal = () => {
    setDeleteTargetId(null);
  };

  const filteredSpoilerReviews = showSpoiler
    ? reviewList
    : reviewList.filter((review) => !review.spoiler);

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
        >
          <p className="text-sm">등록</p>
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
      {filteredSpoilerReviews.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-ot-gray-600">작성된 댓글이 없습니다.</p>
        </div>
      ) : (
        <div>
          {filteredSpoilerReviews.map((item) => (
            <div
              key={item.id}
              className="flex flex-col p-3 text-ot-text mt-1 border-ot-gray-700 border-b"
            >
              {editingReviewId === item.id ? (
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
                      onClick={() => handleSaveEditReview(item.id)}
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
                  <p className="flex-nowrap flex">{item.review}</p>
                  <div className="flex items-center">
                    <div className="flex text-sm pt-1">
                      <p>
                        {item.author} ⋅ {item.date}
                      </p>
                    </div>
                    {item.myself && (
                      <div className="flex justify-center items-center ml-auto">
                        <button
                          onClick={() => handleEditReview(item.id)}
                          className="text-sm flex mr-2 hover:text-ot-gray-600 cursor-pointer"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => setDeleteTargetId(item.id)}
                          className="text-sm flex hover:text-ot-gray-600 cursor-pointer"
                        >
                          삭제
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
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
