import { api } from "@/shared/api/apiClient";

export const withdrawApi = () => {
    api.delete("/member/me");
};