import { api } from "@shared/api";
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
  await api.get<ApiResponse<TagRankingResponse>>("/tag/me/ranking");
