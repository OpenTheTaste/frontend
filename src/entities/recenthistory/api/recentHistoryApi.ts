import { api } from "@shared/api/apiClient";
import { ApiResponse } from "@/shared/types";
import { RecentHistoryResponse } from "@/shared/types";

export const recentHistoryApi = {
  getRecentHistorys: async (page: number) =>
    await api.get<ApiResponse<RecentHistoryResponse>>("/playlists/me/history", {
      params: { page },
    }),
};
