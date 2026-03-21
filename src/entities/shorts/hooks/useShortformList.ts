import { useInfiniteQuery } from "@tanstack/react-query";
import { getShortListsApi } from "@entities/shorts/api";
import { MediaType, ShortsData } from "@shared/types";

export function useShortformList() {
  const query = useInfiniteQuery({
    queryKey: ["shorts"],
    queryFn: ({ pageParam = 0 }) =>
      getShortListsApi({ page: pageParam as number, size: 10 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { currentPage } = lastPage.pageInfo;
      return lastPage.dataList.length > 0 ? currentPage + 1 : undefined;
    },
    staleTime: 0,
    gcTime: 0,
  });

  const seen = new Set<number>();
  const shortsList: ShortsData[] =
    query.data?.pages
      .flatMap((page) =>
        page.dataList.map((item) => ({
          id: item.shortFormId,
          src: item.shortMasterPlaylistUrl,
          isLiked: item.isLiked,
          isBookmarked: item.isBookmarked,
          originMediaId: item.originMediaId,
          mediaType: item.mediaType as MediaType,
          contentLink: {
            title: item.title,
            url: `/contents/${item.originMediaId}`,
            editor: item.editorName,
            date: item.uploadDate.slice(0, 10).replace(/-/g, ".") + ".",
          },
        })),
      )
      .filter((shortform) => {
        if (seen.has(shortform.id)) return false;
        seen.add(shortform.id);
        return true;
      }) ?? [];

  return { ...query, shortsList };
}
