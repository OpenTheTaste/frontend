import { api } from "@shared/api";
import { ApiResponse, TagMonthlyStatsResponse } from "@shared/types";

export const tagMonthlyStatsApi = {
  getTagMonthlyStats: async (tagId: number) =>
    await api.get<ApiResponse<TagMonthlyStatsResponse>>(`/tag/me/ranking/${tagId}`),
};