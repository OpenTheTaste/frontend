import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";

export const postLikesApi = async (mediaId: number) => {
  await api.post(END_POINTS.LIKES, { mediaId });
};
