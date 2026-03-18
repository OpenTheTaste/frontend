import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";
import {
  ApiResponse,
  BasePaginationParams,
  MediaType,
  PageInfo,
} from "@shared/types";

export interface SearchItem {
  mediaType: MediaType;
  mediaId: number;
  title: string;
  posterUrl: string;
}

export interface SearchResponse {
  pageInfo: PageInfo;
  dataList: SearchItem[];
}

export const getSearchApi = async (params: BasePaginationParams) => {
  const res = await api.get<ApiResponse<SearchResponse>>(END_POINTS.SEARCH, {
    params,
  });
  return res.data.data;
};
