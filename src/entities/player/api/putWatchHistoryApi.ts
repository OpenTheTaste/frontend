import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";

export const putWatchHistoryApi = async (mediaId: number) => {
  await api.put(END_POINTS.WATCH_HISTORY, { mediaId });
};
