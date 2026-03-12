import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { reissueApi } from "@shared/api/reissueApi";
import { ApiError } from "@shared/types";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

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
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as RetryConfig;

    if (error.response?.status !== 401) {
      // 원본 AxiosError를 그대로 reject — response.data 접근 가능하게 유지
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        addRefreshSubscriber((error) => {
          if (error) {
            reject(error);
          } else {
            api(originalRequest).then(resolve).catch(reject);
          }
        });
      });
    }

    isRefreshing = true;

    try {
      await reissueApi.refresh();
      onRefreshed();
      return api(originalRequest);
    } catch (refreshError) {
      const error =
        refreshError instanceof Error
          ? refreshError
          : new Error("토큰 갱신 실패");
      onRefreshed(error);
      return Promise.reject(error);
    } finally {
      isRefreshing = false;
    }
  },
);
