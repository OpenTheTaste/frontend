import { useInfiniteQuery } from "@tanstack/react-query";
import {
  BookmarkContentItem,
  getBookmarkContentsApi,
} from "@entities/bookmark/api";

export function useBookmarkContents() {
  const query = useInfiniteQuery({
    queryKey: ["bookmarkContents"],
    queryFn: async ({ pageParam = 0 }) => {
      return await getBookmarkContentsApi(pageParam as number);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPage } = lastPage.pageInfo;
      return currentPage + 1 < totalPage ? currentPage + 1 : undefined;
    },
  });

  const bookmarkContents: BookmarkContentItem[] =
    query.data?.pages.flatMap((page) => page.dataList) ?? [];

  return { ...query, bookmarkContents };
}
