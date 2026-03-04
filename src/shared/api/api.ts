import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    const message = error.response?.data?.message || error.message;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.url === "/auth/reissue") {
        console.error("[reissue 실패] 리다이렉트 예정:", message);
        // window.location.href = "/auth/login"; // TODO: 디버깅 후 주석 해제
        return Promise.reject(new Error(message));
      }

      originalRequest._retry = true;
      try {
        await api.post("/auth/reissue");
        return api(originalRequest);
      } catch {
        console.error("[reissue catch] 리다이렉트 예정:", message);
        // window.location.href = "/auth/login"; // TODO: 디버깅 후 주석 해제
        return Promise.reject(new Error(message));
      }
    }

    return Promise.reject(new Error(message));
  }
);