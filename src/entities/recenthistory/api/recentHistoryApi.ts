import { api } from "@shared/api";
import { ApiResponse, PageInfo } from "@shared/types";

// 3개월 내 시청 내역 dataList 안쪽 타입 - 갱신 수정
export interface RecentHistoryItem {
  mediaId: number;
  title: string;
  posterUrl: string;
  thumbnailUrl: string;
  mediaType: "CONTENTS" | "SERIES";
  duration: number;
  positionSec: number;
}

// 3개월 내 시청내역 조회 목록 전체 틀
export interface RecentHistoryResponse {
  pageInfo: PageInfo;
  dataList: RecentHistoryItem[];
}

export const recentHistoryApi = {
  getRecentHistorys: async (page: number) =>
    await api.get<ApiResponse<RecentHistoryResponse>>("/playlists/history", {
      params: { page },
    }),
};
