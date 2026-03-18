"use client";

import { useEffect } from "react";
import { useMemberProfile } from "@entities/profile/hooks";
import { useUserStore } from "@shared/store";

export function UserInitializer() {
  const { data } = useMemberProfile();
  const setNickname = useUserStore((state) => state.setNickname);

  useEffect(() => {
    if (data?.nickname) {
      setNickname(data.nickname);
    }
  }, [data?.nickname]);

  return null;
}
