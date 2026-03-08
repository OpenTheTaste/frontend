import { api } from "@shared/api";
import { ApiResponse, BasePaginationParams, PageInfo } from "@shared/types";

export interface SeriesEpisodeItem {
  id: number;
  seriesMediaId: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  duration: number;
  positionSec: number;
}

export interface SeriesEpisodesListResponse {
  pageInfo: PageInfo;
  dataList: SeriesEpisodeItem[];
}

export interface GetSeriesEpisodesListParams extends BasePaginationParams {
  seriesId: number;
}

export const getSeriesEpisodesList = async (
  params: GetSeriesEpisodesListParams,
) => {
  const res = await api.get<ApiResponse<SeriesEpisodesListResponse>>(
    `/series/${params.seriesId}/contents`,
    {
      params: {
        page: params.page,
        size: params.size,
      },
    },
  );
  return res.data.data;
};
