"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useMemberProfile } from "@entities/profile/hooks";
import { useUserStore } from "@shared/store";

export function UserInitializer() {
  const pathname = usePathname();
  const OpenPage = pathname === "/auth" || pathname === "/auth/login"; // member/me 호출 X 페이지

  const { data } = useMemberProfile({ enabled: !OpenPage }); // OpenPage 아닐 때만 member/me 호출
  const setNickname = useUserStore((state) => state.setNickname);

  useEffect(() => {
    if (data?.nickname) {
      setNickname(data.nickname);
    }
  }, [data?.nickname]);

  return null;
}
