"use client";

import { CommonButton } from "@base-components";
import { useEditProfile } from "@/entities/profile/hooks/useEditProfile";

interface FinishEditButtonProps {
  nickname: string;
  selectedTagIds: number[];
  disabled?: boolean;
}

export default function FinishEditButton({
  nickname,
  selectedTagIds,
  disabled,
}: FinishEditButtonProps) {
  const { mutate, isPending } = useEditProfile();

  return (
    <div>
      <CommonButton
        onClick={() => mutate({ nickname, tagIds: selectedTagIds })}
        disabled={isPending || !!disabled}
        className="text-ot-text mt-4 mb-4 px-25 py-3 text-[18px] font-bold"
      >
        수정하기
      </CommonButton>
    </div>
  );
}
