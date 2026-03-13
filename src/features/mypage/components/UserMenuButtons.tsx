"use client";

import { useRouter } from "next/navigation";
import { CommonButton } from "@base-components";

export default function UserMenuButtons() {
  const router = useRouter();

  return (
    <div className="flex items-center gap-5 mb-2">
      {/* "대시보드" 버튼 : 공통 컴포넌트 버튼 디자인 사용 */}
      <CommonButton
        variant="secondary"
        className="py-2 px-6 text-ot-text text-[16px] font-semibold"
        onClick={() => router.push("/mypage/dashboard")}
      >
        대시보드
      </CommonButton>

      {/* "내 댓글 목록" 버튼 : 공통 컴포넌트 버튼 디자인 사용 */}
      <CommonButton
        variant="secondary"
        className="py-2 px-6 text-ot-text text-[16px] font-semibold"
        onClick={() => router.push("/mypage/myreviews")}
      >
        내 댓글 목록
      </CommonButton>
    </div>
  );
}
