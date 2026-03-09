import { api } from "@shared/api";
import { ApiResponse } from "@shared/types";

// 해당 달이 언제인지 표시 ex) 2026-03 / 카운트 ex) 12
export interface MonthStat {
  yearMonth: string;
  count: number;
}

// 태그별 시청 통계 타입 (저번 달 ~ 이번 달 비교)
export interface TagMonthlyStatsResponse {
  tagId: number;
  tagName: string;
  currentMonth: MonthStat;
  previousMonth: MonthStat | null;
}

export const tagMonthlyStatsApi = {
  getTagMonthlyStats: async (tagId: number) =>
    await api.get<ApiResponse<TagMonthlyStatsResponse>>(`/tag/me/ranking/${tagId}`),
};