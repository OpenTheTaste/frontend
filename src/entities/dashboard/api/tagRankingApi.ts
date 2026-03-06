import { api } from "@shared/api";
import { ApiResponse, TagRankingResponse } from "@shared/types";

export const tagRankingApi = {
  getTagRankings: async () => await api.get<ApiResponse<TagRankingResponse>>("/tag/me/ranking"),
};
