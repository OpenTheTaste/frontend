import { useInfiniteQuery } from "@tanstack/react-query";
import { SearchItem, searchApi } from "@entities/search/api";
import { BasePaginationParams } from "@shared/types";
import { useInfiniteScroll } from "@/shared/hooks";

export const useInfiniteSearchList = ({
  page,
  size,
  searchWord,
}: BasePaginationParams) => {
  const query = useInfiniteQuery({
    queryKey: ["search", { page, size, searchWord }],
    queryFn: ({ pageParam = 0 }) =>
      searchApi({ page: pageParam as number, size, searchWord }),
    initialPageParam: 0,
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
