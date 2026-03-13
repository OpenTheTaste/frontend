import { api } from "@shared/api";

export const watchHistoryApi = async (mediaId: number) => {
  await api.put("/watch-history", { mediaId });
};
