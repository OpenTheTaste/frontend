import { useQuery } from "@tanstack/react-query";
import { radarRecommendApi, GetRadarListParams } from "@entities/custom/apis";

export const useRadarRecommend = (params: GetRadarListParams) => { 
    return useQuery({
        queryKey: ["radar"],
        queryFn: () => radarRecommendApi(params),
    })
}