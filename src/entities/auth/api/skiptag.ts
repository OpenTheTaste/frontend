import { api } from "@shared/api";

export const skiptagApi = async () => { 
    await api.post("/member/me/onboarding/skip")
}