import { api } from "@/shared/api/apiClient";

export const logoutApi = () => {
  api.post("/auth/logout");
};