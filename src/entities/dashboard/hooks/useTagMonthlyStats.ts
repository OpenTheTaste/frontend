import { useQuery } from "@tanstack/react-query";
import { getTagMonthlyStatsApi } from "@entities/dashboard/api";

export function useTagMonthlyStats(tagId: number) {
  return useQuery({
    queryKey: ["tagMonthlyStats", tagId],
    queryFn: async () => {
      const res = await getTagMonthlyStatsApi(tagId);
      return res.data.data;
    },
    enabled: !!tagId,
  });
}
