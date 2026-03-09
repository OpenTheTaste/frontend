import { useQuery } from "@tanstack/react-query";
import { getTagsTopList, GetRecommendTagListParams } from "@entities/home/apis";

export const useTagsList = (params: GetRecommendTagListParams) => {
    return useQuery({
        queryKey: ['tagsList', params],
        queryFn: () => getTagsTopList(params),
    });
};