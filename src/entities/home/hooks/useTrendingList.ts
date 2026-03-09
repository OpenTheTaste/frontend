import { useQuery } from "@tanstack/react-query";
import { TrendingListApi, TrendingListParams } from "@entities/home/apis";

export const useTrendingList = (params: TrendingListParams) => {
  return useQuery({
    queryKey: ["trendingList", params],
    queryFn: () => TrendingListApi(params),
  });
};
