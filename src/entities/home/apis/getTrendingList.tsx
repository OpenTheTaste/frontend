import { api } from "@shared/api";
import {
  ApiResponse,
  BasePaginationParams,
  PageInfo,
  PlaylistItem,
} from "@shared/types";

export interface TrendingListParams extends BasePaginationParams {
  excludeMediaId?: number;
}

export interface TrendingListResponse {
  pageInfo: PageInfo;
  dataList: PlaylistItem[];
}

export const TrendingListApi = async (params: TrendingListParams) => {
  const res = await api.get<ApiResponse<TrendingListResponse>>(
    "/playlists/trending",
    {
      params: {
        page: params.page,
        size: params.size,
        ...(params.excludeMediaId !== undefined && {
          excludeMediaId: params.excludeMediaId,
        }),
      },
    },
  );
  return res.data.data;
};
