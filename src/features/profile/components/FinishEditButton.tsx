"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CommonButton } from "@base-components";
import { editProfileApi } from "@/entities/profile/api";

interface FinishEditButtonProps {
  nickname: string;
  selectedTagIds: number[];
}

export default function FinishEditButton({ nickname, selectedTagIds }: FinishEditButtonProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      editProfileApi.updateMemberProfile({
        nickname,
        tagIds: selectedTagIds,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memberProfile"] });
      router.push("/mypage");
    },
    onError: (err) => {
      console.error("프로필 수정 실패:", err);
    },
  });

  return (
    <div>
      <CommonButton
        onClick={() => mutate()}
        disabled={isPending}
        className="mt-4 mb-4 py-3 px-25 text-ot-text text-[18px] font-bold"
      >
        수정하기
      </CommonButton>
    </div>
  );
}
