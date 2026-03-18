import { api } from "@shared/api";

export const postShortsCtaApi = async (shortFormId: number) => {
  await api.post("/short-forms/cta", { shortFormId });
};
