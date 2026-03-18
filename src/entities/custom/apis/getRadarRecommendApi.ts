import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";
import {
  ApiResponse,
  BasePaginationParams,
  PageInfo,
  PlaylistItem,
} from "@shared/types";

export interface RadarRecommendResponse {
  pageInfo: PageInfo;
  dataList: PlaylistItem[];
}

export interface GetRadarListParams extends BasePaginationParams {
  excludeMediaId?: number;
}

export const getRadarRecommendApi = async (params: GetRadarListParams) => {
  const res = await api.get<ApiResponse<RadarRecommendResponse>>(
    END_POINTS.RADAR_RECOMMEND,
    {
      params: {
        ...(params.excludeMediaId !== undefined && {
          excludeMediaId: params.excludeMediaId,
        }),
      },
    },
  );
  return res.data.data;
};
