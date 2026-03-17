"use client";

import { useRouter } from "next/navigation";
import { CommonButton } from "@base-components";

export default function UserMenuButtons() {
  const router = useRouter();

  return (
    <div className="mb-2 flex items-center gap-5">
      {/* "대시보드" 버튼 : 공통 컴포넌트 버튼 디자인 사용 */}
      <CommonButton
        variant="secondary"
        className="text-ot-text px-6 py-2 text-[16px] font-semibold"
        onClick={() => router.push("/mypage/dashboard")}
      >
        대시보드
      </CommonButton>

      {/* "내 댓글 목록" 버튼 : 공통 컴포넌트 버튼 디자인 사용 */}
      <CommonButton
        variant="secondary"
        className="text-ot-text px-6 py-2 text-[16px] font-semibold"
        onClick={() => router.push("/mypage/myreviews")}
      >
        내 댓글 목록
      </CommonButton>
    </div>
  );
}
