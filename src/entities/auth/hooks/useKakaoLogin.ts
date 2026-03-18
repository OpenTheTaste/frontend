"use client";

import { getKakaoOAuthUrl } from "@entities/auth/api";

export function useKakaoLogin() {
  const handleKakaoLogin = () => {
    window.location.href = getKakaoOAuthUrl();
  };

  return { handleKakaoLogin };
}
