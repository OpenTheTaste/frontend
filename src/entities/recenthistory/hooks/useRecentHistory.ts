import { useInfiniteQuery } from "@tanstack/react-query";
import { recentHistoryApi } from "@entities/recenthistory/api";
import { PlaylistItem } from "@shared/types";

export function useRecentHistory() {
  const query = useInfiniteQuery({
    queryKey: ["recentHistory"],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await recentHistoryApi.getRecentHistorys(pageParam as number);
      return res.data.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPage } = lastPage.pageInfo;
      return currentPage + 1 < totalPage ? currentPage + 1 : undefined;
    },
  });
  
  const recentHistoryList: PlaylistItem[] =
    query.data?.pages.flatMap((page) => page.dataList) ?? [];

  return { ...query, recentHistoryList };
}
