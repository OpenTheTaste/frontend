import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { withdrawcontentsApi, RecommendPlaylistParams } from "@entities/withdraw-recommends/api";

export function useWithdrawContents(params: RecommendPlaylistParams) {
  return useQuery({
    queryKey: ["recommendPlaylists", params],
    queryFn: async () => {
      const res = await withdrawcontentsApi.getWithdrawRecommendsContents(params);
      return res.data.data;
    },
  })
}