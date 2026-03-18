import { api } from "@shared/api";

export const postLogoutApi = async () => {
  await api.post("/auth/logout");
};
