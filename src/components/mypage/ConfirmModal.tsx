"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import CommonButton from "@/components/common/CommonButton";

interface ConfirmModalProps {
  isOpen: boolean; // 모달 열림 여부
  onConfirm: () => void; // YES 클릭 시
  onClose: () => void; // NO 클릭 시
  message: string; // 안내 문구
  confirmText?: string; // YES 버튼 텍스트 (기본값: "예")
  cancelText?: string; // NO 버튼 텍스트 (기본값: "아니요")
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  message,
  confirmText = "예",
  cancelText = "아니요",
}: ConfirmModalProps) {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // 서버 사이드에서는 렌더링하지 않음 -> 에러 방지
  }
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative pt-30 px-33.75 pb-24.5 rounded-xl bg-ot-gray-800 shadow-2xl">
        {/* 모달창 닫기 X 버튼 */}
        <button
          className="absolute right-7 top-7 transition-opacity hover:opacity-70"
          onClick={onClose}
        >
          <X size={24} className="text-foreground" strokeWidth={3} />
        </button>

        <div className="flex flex-col items-center">
          {/* 안내 문구 */}
          <div className="pb-12">
            <p className="w-92.5 text-center text-[36px] font-bold text-foreground leading-tight">
              {message}
            </p>
          </div>

          {/* 버튼 두 개 묶음 */}
          <div className="flex gap-8">
            <CommonButton
              className="w-35 h-11.5 text-foreground font-bold transition-opacity hover:opacity-70"
              onClick={onConfirm}
            >
              {confirmText}
            </CommonButton>
            <CommonButton
              className="w-35 h-11.5 text-foreground font-bold transition-opacity hover:opacity-70"
              onClick={onClose}
            >
              {cancelText}
            </CommonButton>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
