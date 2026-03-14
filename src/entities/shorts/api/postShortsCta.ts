import { api } from "@shared/api";

export const postShortsCta = async (shortFormId: number) => {
  await api.post("/short-forms/cta", { shortFormId });
};
