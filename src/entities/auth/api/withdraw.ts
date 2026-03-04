import { api } from "@/shared/api/apiClient";

export const withdraw = () => {
    api.post("/auth/withdraw");
};