import { api } from "@shared/api";

export const postShortsEventsApi = async (shortFormId: number) => {
  await api.post("/short-forms/events", { shortFormId });
};
