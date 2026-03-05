const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const authApi = {
  getKakaoOAuthUrl: () => `${BASE_URL}oauth2/authorization/kakao`,
};
