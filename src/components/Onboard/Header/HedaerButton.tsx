'use client';

import { useRouter } from 'next/navigation';
import CommonButton from '@/components/common/CommonButton';

export default function HeaderButton() {
  const router = useRouter();

  return (
    <CommonButton 
      onClick={() => router.push('/login')}
      className="px-[1.25rem] py-[0.5rem] text-[0.875rem]"
    >
      로그인하기
    </CommonButton>
  );
}