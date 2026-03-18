import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";

export const postShortsCtaApi = async (shortFormId: number) => {
  await api.post(END_POINTS.SHORT_FORMS_CTA, { shortFormId });
};
