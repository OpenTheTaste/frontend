'use client';

import { CommonButton } from "@base-components";

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
      className="w-1/2 py-4 text-[1rem] font-bold disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {selectedTagCount}개 관심사로 시작하기
    </CommonButton>
  );
}