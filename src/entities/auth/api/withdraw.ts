import { api } from "@/shared/api/apiClient";

export const withdrawApi = () => {
    return api.delete("/member/me");
};