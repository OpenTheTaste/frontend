import { api } from "@shared/api";

export const postSkipTagApi = async () => {
  await api.post("/member/me/onboarding/skip");
};
