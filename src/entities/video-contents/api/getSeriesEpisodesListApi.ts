import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";
import {
  ApiResponse,
  BasePaginationParams,
  PageInfo,
  PlaylistItem,
} from "@shared/types";

export interface SeriesEpisodesListResponse {
  pageInfo: PageInfo;
  dataList: PlaylistItem[];
}

export interface GetSeriesEpisodesListParams extends BasePaginationParams {
  seriesMediaId: number;
}

export const getSeriesEpisodesListApi = async (
  params: GetSeriesEpisodesListParams,
) => {
  const res = await api.get<ApiResponse<SeriesEpisodesListResponse>>(
    END_POINTS.SERIES_CONTENTS(params.seriesMediaId),
    {
      params: {
        page: params.page,
        size: params.size,
      },
    },
  );
  return res.data.data;
};
