import { useInfiniteQuery } from "@tanstack/react-query";
import { bookmarkApi, BookmarkShortFormItem } from "@entities/bookmark/api";

export function useBookmarkShortForms() {
  const query = useInfiniteQuery({
    queryKey: ["bookmarkShortForms"],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await bookmarkApi.getBookmarkShortForms(pageParam as number);
      return res.data.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPage } = lastPage.pageInfo;
      return currentPage + 1 < totalPage ? currentPage + 1 : undefined;
    },
  });

  const bookmarkShortForms: BookmarkShortFormItem[] =
    query.data?.pages.flatMap((page) => page.dataList) ?? [];

  return { ...query, bookmarkShortForms };
}
