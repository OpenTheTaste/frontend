import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";
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

export const getHistoryListApi = async (params: GetHistoryListParams) => {
  const res = await api.get<ApiResponse<HistoryListResponse>>(
    END_POINTS.PLAYLISTS_HISTORY,
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
