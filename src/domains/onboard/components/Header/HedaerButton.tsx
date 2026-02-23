'use client';

import Link from 'next/link';
import CommonButton from '@/components/common/CommonButton';

export default function HeaderButton() {
  return (
    <Link href = "auth/login">
      <CommonButton 
      className="px-[1.25rem] py-[0.5rem] text-[0.875rem] font-bold">
      로그인하기
    </CommonButton>
    </Link>
  );
}