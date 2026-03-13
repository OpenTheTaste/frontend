import { useQuery } from "@tanstack/react-query";
import { myreviewApi, MyReview } from "@entities/myreview/api";

export function useMyreviews(page: number) {
  const query = useQuery({
    queryKey: ["myreviews", page],
    queryFn: async () => {
      const res = await myreviewApi.getMyReviews(page);
      return res.data.data;
    },
  });
  const myreviews: MyReview[] = query.data?.dataList ?? [];
  const totalPage = query.data?.pageInfo.totalPage ?? 0;

  return { ...query, myreviews, totalPage };
}
