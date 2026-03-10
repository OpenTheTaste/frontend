import { useInfiniteQuery } from "@tanstack/react-query";
import { getSeriesEpisodesList } from "@entities/video-contents/api";

export function useSeriesEpisodeList(
  seriesMediaId: number,
  options?: { enabled?: boolean },
) {
  const query = useInfiniteQuery({
    queryKey: ["series", "episodes", seriesMediaId],
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) =>
      getSeriesEpisodesList({ seriesMediaId, page: pageParam, size: 24 }),
    getNextPageParam: (lastPage) =>
      lastPage.dataList?.length ? lastPage.pageInfo.currentPage + 1 : null,
    enabled: (options?.enabled ?? true) && !!seriesMediaId,
  });

  const episodes = query.data?.pages.flatMap((page) => page.dataList) ?? [];

  return { ...query, episodes };
}
