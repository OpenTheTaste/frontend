"use client";

import { CommonButton } from "@shared/components";

interface InterestButtonProps {
  selectedTagCount: number;
  disabled?: boolean;
  onSubmit: () => void;
}

export default function ButtonInterest({
  selectedTagCount,
  disabled = false,
  onSubmit,
}: InterestButtonProps) {
  return (
    <CommonButton
      onClick={onSubmit}
      disabled={disabled}
      className="w-1/2 py-4 text-[1rem] font-bold disabled:cursor-not-allowed disabled:opacity-50"
    >
      {selectedTagCount}개 관심사로 시작하기
    </CommonButton>
  );
}
