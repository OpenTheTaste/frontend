import { useQuery } from "@tanstack/react-query";
import { MyReview, getMyReviewsApi } from "@entities/myreview/api";

export function useMyreviews(page: number) {
  const query = useQuery({
    queryKey: ["myreviews", page],
    queryFn: async () => {
      const res = await getMyReviewsApi(page);
      return res.data.data;
    },
  });
  const myreviews: MyReview[] = query.data?.dataList ?? [];
  const totalPage = query.data?.pageInfo.totalPage ?? 0;

  return { ...query, myreviews, totalPage };
}
