import { useQuery } from "@tanstack/react-query";
import { getTagRankingsApi } from "@entities/dashboard/api";

export function useTagRanking() {
  return useQuery({
    queryKey: ["tagRanking"],
    queryFn: async () => {
      const res = await getTagRankingsApi();
      return res.data.data;
    },
  });
}
