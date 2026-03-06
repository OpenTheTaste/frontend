import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const reissueApi = {
  refresh: async (): Promise<void> => {
    console.log("[Token 갱신 시작]");
    await axios.post(`${baseURL}auth/reissue`, null, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    console.log("[Token 갱신 성공]");
  },
};