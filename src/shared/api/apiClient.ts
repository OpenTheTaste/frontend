import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const messgae = error.response?.data?.message || error.message;

    if (error.response?.status === 401) {
      // TODO : 로그아웃 처리
    }

    return Promise.reject(new Error(messgae));
  }
);
export default api;
