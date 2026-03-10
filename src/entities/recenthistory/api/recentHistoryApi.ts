import { api } from "@shared/api";
import { ApiResponse, PageInfo, PlaylistItem } from "@shared/types";

// 3개월 내 시청내역 조회 목록 전체 틀
export interface RecentHistoryResponse {
  pageInfo: PageInfo;
  dataList: PlaylistItem[];
}

export const recentHistoryApi = {
  getRecentHistorys: async (page: number) =>
    await api.get<ApiResponse<RecentHistoryResponse>>("/playlists/history", {
      params: { page },
    }),
};
