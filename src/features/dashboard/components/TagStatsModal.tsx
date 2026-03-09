"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import {
  TagStatsModalGraph,
  TagStatsModalList,
} from "@features/dashboard/components";
import { useOutsideClick } from "@shared/hooks";
import { RecommendedContent } from "@shared/types/mypage/dashboard";

interface TagStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tagName: string;
  isLoading: boolean;
  isError: boolean;
  monthlyStats: {
    thisMonth: number;
    lastMonth: number;
  };
  recommendations: RecommendedContent[];
}

export default function TagStatsModal({
  isOpen,
  onClose,
  tagName,
  isLoading,
  isError,
  monthlyStats,
  recommendations,
}: TagStatsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useOutsideClick(modalRef, onClose, isOpen); // 관련 hook 추가하여 사용

  useEffect(() => {
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

  if (typeof window === "undefined") {
    return null;
  }
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className="relative pt-14 pb-8 rounded-xl bg-ot-gray-800 shadow-2xl overflow-hidden w-[60%]"
      >
        {/* 닫기 버튼 */}
        <button className="absolute right-7 top-7 text-ot-text" onClick={onClose}>
          <X size={24} strokeWidth={2} />
        </button>

        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <p className="text-ot-text">로딩 중...</p>
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center h-40">
            <p className="text-ot-gray-600">데이터를 불러올 수 없습니다.</p>
          </div>
        ) : (
          <>
            {/* 그래프 영역 */}
            <div className="px-25">
              <div className="relative rounded-lg flex flex-col items-center p-3">
                <h2 className="text-[20px] font-bold text-ot-text">{tagName} 시청 통계</h2>

                {/* 분리된 그래프 컴포넌트 호출 */}
                <TagStatsModalGraph tagName={tagName} monthlyStats={monthlyStats} />
              </div>
            </div>

            {/* 구분선 */}
            <div className="px-15 py-2">
              <hr className="border-ot-gray-600" />
            </div>

            {/* 태그별 추천 콘텐츠 영역 */}
            <div className="px-15 mt-2">
              <h3 className="text-[22px] font-bold text-ot-text">태그별 추천 콘텐츠</h3>
              <TagStatsModalList items={recommendations} />
            </div>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
