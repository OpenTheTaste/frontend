import { useInfiniteQuery } from "@tanstack/react-query";
import { myreviewApi, MyReview } from "@entities/myreview/api";

export function useMyreviews() {
  const query = useInfiniteQuery({
    queryKey: ["myreviews"],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await myreviewApi.getMyReviews(pageParam as number);
      return res.data.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPage } = lastPage.pageInfo;
      return currentPage + 1 < totalPage ? currentPage + 1 : undefined;
    },
  });

  const myreviews: MyReview[] = query.data?.pages.flatMap((page) => page.dataList) ?? [];

  return {...query, myreviews}
}
