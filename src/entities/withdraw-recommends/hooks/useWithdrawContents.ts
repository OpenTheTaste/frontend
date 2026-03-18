import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import {
  RecommendPlaylistParams,
  RecommendPlaylistResponse,
  getWithdrawRecommendsContentsApi,
} from "@entities/withdraw-recommends/api";

export function useWithdrawContents(
  params: RecommendPlaylistParams,
  options?: Omit<
    UseQueryOptions<RecommendPlaylistResponse>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey: ["recommendPlaylists", params],
    queryFn: async () => {
      const res = await getWithdrawRecommendsContentsApi(params);
      return res.data.data;
    },
    ...options,
  });
}
