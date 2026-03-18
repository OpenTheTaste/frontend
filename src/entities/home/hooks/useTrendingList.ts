import { useQuery } from "@tanstack/react-query";
import { TrendingListParams, getTrendingListApi } from "@entities/home/apis";

export const useTrendingList = (params: TrendingListParams) => {
  return useQuery({
    queryKey: ["trendingList", params],
    queryFn: () => getTrendingListApi(params),
  });
};
