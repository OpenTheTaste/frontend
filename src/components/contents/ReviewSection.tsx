"use client";

import { ArrowRight, X } from "lucide-react";
import CommonButton from "@/components/common/CommonButton";
import Toggle from "@/components/common/Toggle";
import { useState } from "react";
import { mockReview } from "@/mocks/mockReview";
import { Review } from "@/types/review";

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
    setNewReview("");
    setIsSpoilerReview(false);
  };

  // 수정
  const handleEditReview = (reviewId: number, currentText: string) => {
    setEditingReviewId(reviewId);
    setEditingReview(currentText);
  };

  // 수정 취소
  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setEditingReview("");
  };

  // 수정 저장
  const handleSaveEditReview = (reviewId: number) => {
    if (!editingReview.trim()) return;

    setReviewList((prev) =>
      prev.map((review) =>
        review.id === reviewId ? { ...review, review: editingReview } : review,
      ),
    );

    setEditingReviewId(null);
    setEditingReview("");
  };

  // 삭제
  const handleDeleteReview = (reviewId: number) => {
    // TODO: 삭제 모달창 뜰 것
    setReviewList((prev) => prev.filter((review) => review.id !== reviewId));
  };

  // 스포일러 필터링
  const filteredSpoilerReviews = showSpoiler
    ? reviewList
    : reviewList.filter((review) => !review.spoiler);

  // 전체보기 모드일 때 (재생목록 숨김)
  if (isExpandAllReviews) {
    return (
      <div className="relative p-6 rounded-lg flex flex-col h-full">
        <button
          onClick={() => setIsExpandAllReviews(false)}
          className="absolute top-4 right-4 cursor-pointer"
        >
          <X className="w-5 h-5 stroke-ot-text hover:stroke-ot-gray-600" />
        </button>
        <div className="flex flex-row justify-between">
          <p className="text-2xl font-bold text-ot-text mb-3">댓글</p>
        </div>

        {/* 댓글 입력 */}
        <textarea
          placeholder="댓글을 입력하세요"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          className="w-full text-ot-text placeholder-ot-gray-600 py-2 px-3 border border-ot-gray-800 rounded-lg"
        />

        <div className="flex items-center justify-end gap-3 mt-3">
          <label
            htmlFor="spoiler-expanded"
            className="inline-flex items-center gap-2 cursor-pointer select-none"
          >
            <input
              id="spoiler-expanded"
              name="spoiler"
              type="checkbox"
              className="accent-ot-primary-gradient"
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

        {/* 댓글 목록 - 전체 높이 */}
        <div className="overflow-y-auto flex-1 mt-2">
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
                    <button
                      onClick={handleCancelEdit}
                      className="text-sm px-3 py-1 hover:text-ot-gray-600 cursor-pointer"
                    >
                      취소
                    </button>
                    <CommonButton
                      onClick={() => handleSaveEditReview(item.id)}
                      className="px-2 py-1 rounded-sm"
                    >
                      <p className="text-sm">저장</p>
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
                          onClick={() => handleEditReview(item.id, item.review)}
                          className="text-sm flex mr-2 hover:text-ot-gray-600 cursor-pointer"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDeleteReview(item.id)}
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
      </div>
    );
  }

  // 기본 모드 (미리보기)
  return (
    <div className="p-6 rounded-lg flex flex-col h-[60vh] mb-6">
      <div className="flex flex-row justify-between">
        <p className="text-2xl font-bold text-ot-text mb-3">댓글</p>
        <button
          onClick={() => setIsExpandAllReviews(true)}
          className="flex gap-1 items-center group cursor-pointer"
        >
          <ArrowRight className="w-5 h-5 stroke-1 stroke-ot-text group-hover:stroke-ot-gray-600" />
          <p className="text-md text-ot-text group-hover:text-ot-gray-600">
            더 보기
          </p>
        </button>
      </div>

      <textarea
        placeholder="댓글을 입력하세요"
        value={newReview}
        onChange={(e) => setNewReview(e.target.value)}
        className="w-full text-ot-text placeholder-ot-gray-600 py-2 px-3 border border-ot-gray-800 rounded-lg"
      />

      <div className="flex items-center justify-end gap-3 mt-3">
        <label
          htmlFor="spoiler"
          className="inline-flex items-center gap-2 cursor-pointer select-none"
        >
          <input
            id="spoiler"
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

      <div className="overflow-y-auto flex-1 mt-2">
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
                  <button
                    onClick={handleCancelEdit}
                    className="text-sm px-3 py-1 hover:text-ot-gray-600 cursor-pointer"
                  >
                    취소
                  </button>
                  <CommonButton
                    onClick={() => handleSaveEditReview(item.id)}
                    className="px-2 py-1 rounded-sm"
                  >
                    <p className="text-sm">저장</p>
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
                        onClick={() => handleEditReview(item.id, item.review)}
                        className="text-sm flex mr-2 hover:text-ot-gray-600 cursor-pointer"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDeleteReview(item.id)}
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
    </div>
  );
}
