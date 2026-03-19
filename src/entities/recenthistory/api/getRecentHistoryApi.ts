import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";
import { ApiResponse, PageInfo, PlaylistItem } from "@shared/types";

// 3개월 내 시청내역 조회 목록 전체 틀
export interface RecentHistoryResponse {
  pageInfo: PageInfo;
  dataList: PlaylistItem[];
}

export const getRecentHistoryApi = async (page: number) =>
  await api.get<ApiResponse<RecentHistoryResponse>>(
    END_POINTS.PLAYLISTS_HISTORY,
    {
      params: { page },
    },
  );
