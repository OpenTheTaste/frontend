import { api } from "@/shared/api/apiClient";

export const logoutApi = async() => {
  await api.post("/auth/logout");
};