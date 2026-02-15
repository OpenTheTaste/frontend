'use client';

import { useRouter } from 'next/navigation';
import CommonButton from '@/components/common/CommonButton';

interface InterestButtonProps {
  selectedTagCount: number;
  disabled?: boolean;
}

export default function InterestButton({ 
  selectedTagCount,
  disabled = false 
}: InterestButtonProps) {
  const router = useRouter();

  return (
    <CommonButton
      onClick={() => router.push('/home')}
      disabled={disabled}
      className="w-full py-4 text-[1rem] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {selectedTagCount}개 관심사로 시작하기
    </CommonButton>
  );
}