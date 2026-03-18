import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";
import {
  ApiResponse,
  BasePaginationParams,
  MediaType,
  PageInfo,
} from "@shared/types";

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
  mediaType: MediaType;
  duration: number;
  positionSec: number;
}

// 추천 플레이리스트 응답 전체
export interface RecommendPlaylistResponse {
  pageInfo: PageInfo;
  dataList: RecommendPlaylistItem[];
}

export const getWithdrawRecommendsContentsApi = async (
  params: RecommendPlaylistParams,
) =>
  await api.get<ApiResponse<RecommendPlaylistResponse>>(
    END_POINTS.PLAYLISTS_RECOMMEND,
    { params },
  );
