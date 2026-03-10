import { api } from "@shared/api";
import {
  ApiResponse,
  BasePaginationParams,
  PageInfo,
  PlaylistItem,
} from "@shared/types";

export interface HistoryListResponse {
  pageInfo: PageInfo;
  dataList: PlaylistItem[];
}

export interface GetHistoryListParams extends BasePaginationParams {
  excludeMediaId?: number;
}

export const HistoryListApi = async (params: GetHistoryListParams) => {
  const res = await api.get<ApiResponse<HistoryListResponse>>(
    "/playlists/history",
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
