import { api } from "@shared/api";
import { ApiResponse } from "@shared/types";

export interface SeriesDetailReponse {
  mediaId: number;
  title: string;
  description: string;
  actors: string;
  thumbnailUrl: string;
  category: string;
  tagList: string[];
  tags: string[];
  isBookmarked: boolean;
  isLiked: boolean;
  resumeMediaId: number;
}

export const getSeriesDetail = async (mediaId: number) =>
  await api
    .get<ApiResponse<SeriesDetailReponse>>(`/series/${mediaId}`)
    .then((res) => {
      const data = res.data.data;
      return {
        ...data,
        tags: data.tagList,
      };
    });
