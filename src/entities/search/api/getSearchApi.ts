import { api } from "@shared/api";
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

export const searchApi = async (params: BasePaginationParams) => {
  const res = await api.get<ApiResponse<SearchResponse>>("/search", { params });
  return res.data.data;
};
