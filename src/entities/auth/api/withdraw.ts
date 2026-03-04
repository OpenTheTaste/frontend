import { api } from "@/shared/api/apiClient";

export const withdrawApi = async () => {
    await api.delete("/member/me");
};