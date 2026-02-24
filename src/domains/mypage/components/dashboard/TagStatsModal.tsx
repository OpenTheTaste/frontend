"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { RecommendedContent } from "@/domains/mypage/types/dashboard";
import TagStatsModalList from "@/domains/mypage/components/dashboard/TagStatsModalList";
import TagStatsModalGraph from "@/domains/mypage/components/dashboard/TagStatsModalGraph";
import { useOutsideClick } from "@/hooks/useOutsideClick";

interface TagStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tagName: string;
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
  monthlyStats,
  recommendations,
}: TagStatsModalProps) {
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

  if (!isMounted) {
    return null; // 서버 사이드에서는 렌더링하지 않음 -> 에러 방지
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
        <button className="absolute right-7 top-7 text-white" onClick={onClose}>
          <X size={24} strokeWidth={3} />
        </button>

        {/* 그래프 영역 */}
        <div className="px-25 mb-4">
          <div className="relative h-64 border border-ot-text rounded-lg flex flex-col items-center p-3">
            <h2 className="text-[20px] font-bold text-ot-text">#{tagName} 시청 통계</h2>

            {/* 분리된 그래프 컴포넌트 호출 */}
            <TagStatsModalGraph tagName={tagName} monthlyStats={monthlyStats} />
          </div>
        </div>

        {/* 구분선 */}
        <div className="px-15 py-2">
          <hr className="border-ot-text" />
        </div>

        {/* 태그별 추천 콘텐츠 영역 */}
        <div className="px-15 mt-4">
          <h3 className="text-[24px] font-bold text-ot-text">태그별 추천 콘텐츠</h3>
          <TagStatsModalList items={recommendations} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
