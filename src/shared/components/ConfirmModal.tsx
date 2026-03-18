"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { CommonButton } from "@shared/components";
import { useOutsideClick } from "@shared/hooks";

interface ConfirmModalProps {
  isOpen: boolean; // 모달 열림 여부
  onConfirm: () => void; // YES 클릭 시
  onClose: () => void; // NO 클릭 시
  message: string; // 안내 문구
  confirmText?: string; // YES 버튼 텍스트 (기본값: "예")
  cancelText?: string; // NO 버튼 텍스트 (기본값: "아니요")
  disabled?: boolean; // 중복 클릭 방지
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  message,
  confirmText = "예",
  cancelText = "아니요",
  disabled = false, // 중복 클릭 방지
}: ConfirmModalProps) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useOutsideClick(modalRef, onClose, isOpen);

  const handleConfirm = () => {
    if (!disabled) onConfirm();
  };

  const handleClose = () => {
    if (!disabled) onClose();
  };

  useEffect(() => {
    setIsMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden"; // 모달창 열리면 뒷 원본 페이지 스크롤 기능 X
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      window.addEventListener("keydown", handleEsc);
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
        className="bg-ot-gray-800 relative rounded-xl px-20 pt-18 pb-14 shadow-2xl"
      >
        {/* 모달창 닫기 X 버튼 */}
        <button
          className="absolute top-7 right-7 cursor-pointer transition-opacity hover:opacity-70"
          onClick={handleClose}
          disabled={disabled}
        >
          <X size={24} className="text-ot-text" strokeWidth={3} />
        </button>

        <div className="flex flex-col items-center">
          {/* 안내 문구 */}
          <div className="pb-10">
            <p className="text-ot-text w-72 text-center text-[24px] leading-tight font-bold">
              {message}
            </p>
          </div>

          {/* 버튼 두 개 묶음 */}
          <div className="flex gap-8">
            <CommonButton
              className="text-ot-text h-10 w-32 transition-opacity hover:opacity-70"
              onClick={handleConfirm}
              disabled={disabled}
            >
              {confirmText}
            </CommonButton>
            <CommonButton
              variant="secondary"
              className="text-ot-text h-10 w-32"
              onClick={handleClose}
              disabled={disabled}
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
