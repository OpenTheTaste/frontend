"use client";

import { CommonButton } from "@basecomponent";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface AdminUploadModalProps {
  open: boolean;
  onClose: () => void;
}

type ContentType = "content" | "shortform";

const contentTypes: {
  value: ContentType;
  label: string;
  description: string;
}[] = [
  {
    value: "content",
    label: "콘텐츠 (관리자 전용)",
    description: "영화, 드라마 등 일반 콘텐츠",
  },
  {
    value: "shortform",
    label: "숏폼 (에디터, 관리자 전용)",
    description: "짧은 클립 콘텐츠",
  },
];

export default function AdminUploadModal({
  open,
  onClose,
}: AdminUploadModalProps) {
  const [mounted, setMounted] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<ContentType>("content");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-ot-text rounded-lg py-4 px-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6  text-ot-background">
          <h2 className="text-2xl font-bold">콘텐츠 업로드</h2>
          {/* <button
            onClick={onClose}
            className=" text-ot-background hover:text-ot-gray-900 transition-colors"
          >
            <X size={22} />
          </button> */}
        </div>

        {/* 폼 */}
        <form className="flex flex-col">
          <div className="flex flex-col">
            <label className="text-lg font-semibold  text-ot-background">
              콘텐츠 타입
            </label>

            <div className="grid grid-cols-2 gap-4">
              {contentTypes.map(({ value, label, description }) => {
                const isSelected = selectedType === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setSelectedType(value)}
                    className={`flex items-center border border-ot-primary-400 rounded-lg text-left transition-all py-3 px-4  ${
                      isSelected
                        ? "border-pink-400 bg-pink-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div
                      className={`
                      flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center
                      ${isSelected ? "border-pink-500" : "border-gray-300"}
                    `}
                    >
                      {isSelected && (
                        <div className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-lg border border-ot-gray-600  text-ot-background font-semibold hover:bg-ot-gray-700 transition-colors"
            >
              취소
            </button>
            <CommonButton
              type="submit"
              className="flex-1 py-3 font-semibold  text-ot-background"
            >
              업로드 시작
            </CommonButton>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}
