"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import {
  TagStatsModalGraph,
  TagStatsModalList,
} from "@features/dashboard/components";
import { TagStatsModalSkeleton } from "@entities/dashboard/components";
import { useOutsideClick } from "@shared/hooks";

interface TagStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tagName: string;
  isPending: boolean;
  isError: boolean;
  monthlyStats: {
    thisMonth: number;
    lastMonth: number;
  };
  selectedTagId: number | null;
}

export default function TagStatsModal({
  isOpen,
  onClose,
  tagName,
  isPending,
  isError,
  monthlyStats,
  selectedTagId,
}: TagStatsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useOutsideClick(modalRef, onClose, isOpen);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (typeof window === "undefined" || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className="bg-ot-gray-800 relative w-[60%] overflow-hidden rounded-xl pt-14 pb-8 shadow-2xl"
      >
        <button
          className="text-ot-gray-600 hover:text-ot-text absolute top-7 right-7 transition-all duration-150"
          onClick={onClose}
        >
          <X size={24} strokeWidth={2} />
        </button>

        {isPending ? (
          <TagStatsModalSkeleton />
        ) : isError ? (
          <div className="flex h-40 items-center justify-center">
            <p className="text-ot-gray-600">데이터를 불러올 수 없습니다.</p>
          </div>
        ) : (
          <>
            <div className="px-25">
              <div className="relative flex flex-col items-center rounded-lg p-3">
                <h2 className="text-ot-text text-[20px] font-bold">
                  {tagName} 시청 통계
                </h2>
                <TagStatsModalGraph
                  tagName={tagName}
                  monthlyStats={monthlyStats}
                />
              </div>
            </div>

            <div className="px-15 py-2">
              <hr className="border-ot-gray-600" />
            </div>

            <div className="mt-2 px-15">
              <h3 className="text-ot-text text-[22px] font-bold">
                태그별 추천 콘텐츠
              </h3>
              <TagStatsModalList selectedTagId={selectedTagId} />
            </div>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
