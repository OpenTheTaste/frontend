import { api } from "@/shared/api/apiClient";

export const logoutApi = () => {
  return api.post("/auth/logout");
};