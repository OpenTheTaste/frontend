import { useQuery } from "@tanstack/react-query";
import { tagRankingApi } from "@entities/dashboard/api";

export function useTagRanking() {
  return useQuery({
    queryKey: ["tagRanking"],
    queryFn: async () => {
      const res = await tagRankingApi.getTagRankings();
      return res.data.data;
    },
  });
}
