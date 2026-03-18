import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  GetRecommendTagListParams,
  RecommendTagListResponse,
  getTagsTopList,
} from "@entities/home/apis";

export const useTagsList = (
  params: GetRecommendTagListParams,
  options?: {
    placeholderData?: (
      prev: RecommendTagListResponse | undefined,
    ) => RecommendTagListResponse | undefined;
  },
) => {
  return useQuery({
    queryKey: ["tagsList", params],
    queryFn: () => getTagsTopList(params),
    placeholderData: options?.placeholderData ?? keepPreviousData,
  });
};
