import { api } from "@shared/api";
import { ApiResponse } from "@/shared/types";
import { PageInfo, BasePaginationParams } from "@/shared/types/pagination";

// 추천 플레이리스트 현재 영상 ID (swagger)
export interface RecommendPlaylistParams extends BasePaginationParams {
  excludeMediaId?: number;
}


// 추천 플레이리스트 답변 dataList 안쪽 타입
export interface RecommendPlaylistItem {
  mediaId: number;
  title: string;
  posterUrl: string;
  thumbnailUrl: string;
  mediaType: "CONTENTS" | "SERIES";
  duration: number;
  positionSec: number;
}

// 추천 플레이리스트 응답 전체
interface RecommendPlaylistResponse {
  pageInfo: PageInfo;
  dataList: RecommendPlaylistItem[];
}

export const withdrawcontentsApi = {
  getWithdrawRecommendsContents: async (params: RecommendPlaylistParams) =>
    await api.get<ApiResponse<RecommendPlaylistResponse>>(
      "/playlists/recommend",
      { params }
    ),
};