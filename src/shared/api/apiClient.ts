import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { reissueApi } from "@shared/api/reissueApi";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

//동시성 제어 변수
let isRefreshing = false;
let refreshSubscribers: Array<(error?: Error) => void> = [];

function onRefreshed(error?: Error) {
  refreshSubscribers.forEach((callback) => callback(error));
  refreshSubscribers = [];
}

function addRefreshSubscriber(callback: (error?: Error) => void) {
  refreshSubscribers.push(callback);
}

export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
  withCredentials: true,
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config as RetryConfig;
    const message = error.response?.data?.message || error.message;

    if (error.response?.status !== 401) {
      return Promise.reject(new Error(message));
    }

    // 이미 재시도한 요청이면 에러 반환
    if (originalRequest._retry) {
      return Promise.reject(new Error(message));
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      console.log("[대기] 다른 요청이 토큰 갱신 중:", originalRequest.url);
      return new Promise((resolve, reject) => {
        addRefreshSubscriber((error) => {
          if (error) {
            console.log("[대기 요청 실패]", originalRequest.url);
            reject(error);
          } else {
            console.log("[대기 요청 재시도]", originalRequest.url);
            api(originalRequest)
              .then(resolve)
              .catch(reject);
          }
        });
      });
    }

    //갱신 시작
    isRefreshing = true;
    console.log("[첫 요청이 토큰 갱신 시작]", originalRequest.url);

    try {
      await reissueApi.refresh();
      
      console.log("[토큰 갱신 성공 - 대기 요청들 깨우기]");
      
      // 대기 중인 모든 요청들에게 성공 알림
      onRefreshed();

      console.log("[원래 요청 재시도]", originalRequest.url);
      return api(originalRequest);
      
    } catch (refreshError) {
      console.error("[토큰 갱신 실패]", refreshError);
      
      const error = refreshError instanceof Error
        ? refreshError
        : new Error("토큰 갱신 실패");
      onRefreshed(error);

      return Promise.reject(error);
      
    } finally {
      isRefreshing = false;
    }
  },
);