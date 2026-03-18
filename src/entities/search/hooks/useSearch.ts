import { useInfiniteQuery } from "@tanstack/react-query";
import { SearchItem, getSearchApi } from "@entities/search/api";
import { useInfiniteScroll } from "@shared/hooks";
import { BasePaginationParams } from "@shared/types";

export const useInfiniteSearchList = ({
  page,
  size,
  searchWord,
}: BasePaginationParams) => {
  const query = useInfiniteQuery({
    queryKey: ["search", { page, size, searchWord }],
    queryFn: ({ pageParam = page }) =>
      getSearchApi({ page: pageParam as number, size, searchWord }),
    initialPageParam: page,
    enabled: !!searchWord && searchWord.trim().length >= 2,
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPage } = lastPage.pageInfo;
      return currentPage + 1 < totalPage ? currentPage + 1 : undefined;
    },
  });

  const { observerRef } = useInfiniteScroll({
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    fetchNextPage: query.fetchNextPage,
  });

  const searchList: SearchItem[] =
    query.data?.pages.flatMap((page) => page.dataList) ?? [];
  return { ...query, searchList, observerRef };
};
