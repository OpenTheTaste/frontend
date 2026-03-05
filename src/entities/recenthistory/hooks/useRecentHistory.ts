import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { recentHistoryApi } from "@/entities/recenthistory/api";

export function useRecentHistory() {
  return useInfiniteQuery({
    queryKey: ["recentHistory"],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await recentHistoryApi.getRecentHistorys(pageParam);
      return res.data.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPage } = lastPage.pageInfo;
      return currentPage + 1 < totalPage ? currentPage + 1 : undefined;
    },
  });
}
