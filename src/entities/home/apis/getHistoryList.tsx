import { api } from "@shared/api"
import { ApiResponse, BasePaginationParams, PageInfo } from "@/shared/types"

export interface HistoryItem { 
    mediaId: number;
    title: string;
    posterUrl: string;
    thumbnailUrl: string;
    mediaType: string;
    duration: number;
    positionSec: number;
}

export interface HistoryListResponse { 
    pageInfo: PageInfo;
    dataList: HistoryItem[];
}

export interface GetHistoryListParams extends BasePaginationParams { 
    excludeMediaId?: number;
}

export const HistoryListApi = async (
    params: GetHistoryListParams,
) => { 
    const res = await api.get<ApiResponse<HistoryListResponse>>(
        '/playlists/history',
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
