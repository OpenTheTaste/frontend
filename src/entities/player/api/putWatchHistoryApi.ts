import { api } from "@shared/api";

export const putWatchHistoryApi = async (mediaId: number) => {
  await api.put("/watch-history", { mediaId });
};
