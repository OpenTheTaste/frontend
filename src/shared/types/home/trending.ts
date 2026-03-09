import { PageInfo } from "@shared/types";

export interface TrendingListItem {
  mediaId: number;
  title: string;
  posterUrl: string;
  thumbnailUrl: string;
  mediaType: string;
  duration: number | null;
  positionSec: number | null;
}

export interface TrendingListResponse {
  pageInfo: PageInfo;
  dataList: TrendingListItem[];
}
