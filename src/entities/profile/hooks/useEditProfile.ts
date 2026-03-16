"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditProfileParams, editProfileApi } from "@entities/profile/api";

export function useEditProfile() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ nickname, tagIds }: EditProfileParams) =>
      editProfileApi.updateMemberProfile({ nickname, tagIds }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memberProfile"] });
      router.push("/mypage");
    },
    onError: (err) => {
      console.error("프로필 수정 실패:", err);
    },
  });

  return { mutate, isPending };
}
