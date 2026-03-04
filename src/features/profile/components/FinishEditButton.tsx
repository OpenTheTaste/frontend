"use client";

import { useRouter } from "next/navigation";
import { CommonButton } from "@base-components";
import { editProfileApi } from "@/entities/profile/api";

interface FinishEditButtonProps {
  nickname: string;
  selectedTagIds: number[];
}

export default function FinishEditButton({ nickname, selectedTagIds }: FinishEditButtonProps) {
  const router = useRouter();

  // 여기 쿼리로 바꾸기
  const handleFinishEdit = async () => {
    try {
      await editProfileApi.updateMemberProfile({
        nickname,
        tagIds: selectedTagIds,
      });
      router.push("/mypage");
    } catch (err) {
      console.error("프로필 수정 실패:", err);
    }
  };

  return (
    <div>
      <CommonButton
        onClick={handleFinishEdit}
        className="mt-4 mb-4 py-3 px-25 text-ot-text text-[18px] font-bold"
      >
        수정하기
      </CommonButton>
    </div>
  );
}
