import { api } from "@shared/api";
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

export const getSeriesEpisodesList = async (
  params: GetSeriesEpisodesListParams,
) => {
  const res = await api.get<ApiResponse<SeriesEpisodesListResponse>>(
    `/series/${params.seriesMediaId}/contents`,
    {
      params: {
        page: params.page,
        size: params.size,
      },
    },
  );
  return res.data.data;
};
