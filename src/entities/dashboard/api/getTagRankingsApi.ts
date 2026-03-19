import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";
import { ApiResponse } from "@shared/types";

export interface TagRanking {
  tagId: number;
  tagName: string;
  count: number;
  etc: boolean;
}

export interface TagRankingResponse {
  rankings: TagRanking[];
}

export const getTagRankingsApi = async () =>
  await api.get<ApiResponse<TagRankingResponse>>(END_POINTS.TAG_ME_RANKING);
