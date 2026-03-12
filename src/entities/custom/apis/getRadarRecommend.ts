import { api } from "@shared/api";
import {
    ApiResponse,
    BasePaginationParams,
    PageInfo,
    PlaylistItem,
 } from "@/shared/types"; 

export interface RadarRecommendResponse { 
    pageInfo: PageInfo;
    dataList: PlaylistItem[];
}

export interface GetRadarListParams extends BasePaginationParams { 
    excludeMediaId?: number;
}

export const radarRecommendApi = async (params: GetRadarListParams) => { 
    const res = await api.get<ApiResponse<RadarRecommendResponse>>(
        "/radar/recommend",
        {
            params: {
                ...(params.excludeMediaId !== undefined && {
                    excludeMediaId: params.excludeMediaId,
                }),
            },
        },
    );
    return res.data.data;
}