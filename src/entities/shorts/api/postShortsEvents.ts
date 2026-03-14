import { api } from "@shared/api";

export const postShortsEvents = async (shortFormId: number) => {
  await api.post("/short-forms/events", { shortFormId });
};
