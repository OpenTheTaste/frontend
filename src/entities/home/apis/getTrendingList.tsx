import { api } from "@/shared/api";
import { ApiResponse, BasePaginationParams } from "@/shared/types";
import { TrendingListResponse } from "@/shared/types/home";

export interface TrendingListParams extends BasePaginationParams {
    excludeMediaId?: number;
}

export const TrendingListApi = async (
    params: TrendingListParams,
) => {
    const res = await api.get<ApiResponse<TrendingListResponse>>(
        '/playlists/trending',
        {
            params: {
                page: params.page,
                size: params.size,
                ...(params.excludeMediaId !== undefined && { excludeMediaId: params.excludeMediaId }),
            },
        },
    );
    return res.data.data;
}