"use client";

import { authApi } from "@entities/auth/api";

export function useKakaoLogin() {
  const handleKakaoLogin = () => {
    window.location.href = authApi.getKakaoOAuthUrl();
  };

  return { handleKakaoLogin };
}
