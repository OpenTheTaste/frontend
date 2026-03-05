import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { bookmarkApi } from "@entities/bookmark/api/bookmarkApi";

export function useBookmarkShortForms() {
  return useInfiniteQuery({
    queryKey: ["bookmarkShortForms"],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await bookmarkApi.getBookmarkShortForms(pageParam);
      return res.data.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPage } = lastPage.pageInfo;
      return currentPage + 1 < totalPage ? currentPage + 1 : undefined;
    },
  });
}
