import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";
import {
  ApiResponse,
  BasePaginationParams,
  PageInfo,
  PlaylistItem,
} from "@shared/types";

export interface tagInfo {
  id: number;
  name: string;
}

export interface mediaItem {
  pageInfo: PageInfo;
  dataList: PlaylistItem[];
}

export interface RecommendTagListResponse {
  category: tagInfo;
  tag: tagInfo;
  medias: mediaItem;
}

export interface GetRecommendTagListParams extends BasePaginationParams {
  excludeMediaId?: number;
  index: number;
}

export const getTagsTopList = async (params: GetRecommendTagListParams) => {
  const res = await api.get<ApiResponse<RecommendTagListResponse>>(
    END_POINTS.PLAYLISTS_TAGS_TOP,
    {
      params: {
        page: params.page,
        size: params.size,
        index: params.index,
        ...(params.excludeMediaId !== undefined && {
          excludeMediaId: params.excludeMediaId,
        }),
      },
    },
  );
  return res.data.data;
};
