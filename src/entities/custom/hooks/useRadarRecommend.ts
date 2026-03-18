import { useQuery } from "@tanstack/react-query";
import {
  GetRadarListParams,
  getRadarRecommendApi,
} from "@entities/custom/apis";

export const useRadarRecommend = (params: GetRadarListParams) => {
  return useQuery({
    queryKey: ["radar", "recommend"],
    queryFn: () => getRadarRecommendApi(params),
  });
};
