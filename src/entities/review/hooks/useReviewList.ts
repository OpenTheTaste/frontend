import { useInfiniteQuery } from "@tanstack/react-query";
import {
  GetReviewListParams,
  ReviewListItem,
  getReviewList,
} from "@entities/review/api";

export const useInfiniteReviewList = ({
  page,
  size,
  searchWord,
  contentsId,
  includeSpoiler,
}: GetReviewListParams) => {
  const query = useInfiniteQuery({
    queryKey: [
      "review",
      "list",
      { page, size, searchWord, contentsId, includeSpoiler },
    ],
    queryFn: ({ pageParam = 0 }) =>
      getReviewList({
        page: pageParam as number,
        size,
        searchWord: searchWord || undefined,
        contentsId,
        includeSpoiler,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPage } = lastPage.pageInfo;
      return currentPage + 1 < totalPage ? currentPage + 1 : undefined;
    },
  });

  const reviewList: ReviewListItem[] =
    query.data?.pages.flatMap((page) => page.dataList) ?? [];

  return { ...query, reviewList };
};
