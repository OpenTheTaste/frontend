import { useQuery } from "@tanstack/react-query";
import { tagMonthlyStatsApi } from "@entities/dashboard/api";

export function useTagMonthlyStats(tagId: number) {
  return useQuery({
    queryKey: ["tagMonthlyStats", tagId],
    queryFn: async () => {
      const res = await tagMonthlyStatsApi.getTagMonthlyStats(tagId);
      return res.data.data;
    },
    enabled: !!tagId,
  })
}