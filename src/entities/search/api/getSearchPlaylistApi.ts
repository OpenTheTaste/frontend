import { api } from "@shared/api";
import {
  ApiResponse,
  BasePaginationParams,
  PageInfo,
  PlaylistItem,
} from "@shared/types";

export interface SearchPlaylistParams extends BasePaginationParams {
  excludeMediaId?: number;
}

export interface SearchPlaylistResponse {
  pageInfo: PageInfo;
  dataList: PlaylistItem[];
}

export const searchPlaylistApi = async (params: SearchPlaylistParams) => {
  const res = await api.get<ApiResponse<SearchPlaylistResponse>>(
    "/playlists/search",
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
