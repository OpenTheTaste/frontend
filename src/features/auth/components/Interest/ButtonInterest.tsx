'use client';

import { useRouter } from 'next/navigation';
import { CommonButton } from "@shared-ui";

interface InterestButtonProps {
  selectedTagCount: number;
  disabled?: boolean;
}

export default function ButtonInterest({ 
  selectedTagCount,
  disabled = false 
}: InterestButtonProps) {
  const router = useRouter();

  return (
    <CommonButton
      onClick={() => router.push('/')}
      disabled={disabled}
      className="w-1/2 py-4 text-[1rem] font-bold disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {selectedTagCount}개 관심사로 시작하기
    </CommonButton>
  );
}