import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";

export const postSkipTagApi = async () => {
  await api.post(END_POINTS.MEMBER_ME_ONBOARDING_SKIP);
};
