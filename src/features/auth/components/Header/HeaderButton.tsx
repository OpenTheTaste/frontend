'use client';

import Link from 'next/link';
import { CommonButton } from "@base-components";

export default function HeaderButton() {
  return (
    <Link href = "auth/login">
      <CommonButton 
      className="px-5 py-2 text-[0.875rem] font-bold">
      로그인하기
    </CommonButton>
    </Link>
  );
}