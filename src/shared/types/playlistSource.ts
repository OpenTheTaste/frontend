import { MediaType, PageInfo } from "@shared/types";

export type PlaylistSource =
  | { type: "trending" }
  | { type: "topTag"; index: 0 | 1 | 2 }
  | { type: "search"; query: string }
  | { type: "recommend" }
  | { type: "history" }
  | { type: "bookmarks" };

// 쿼리스트링에서 넘어오는 raw 타입 (string)
export interface PlaylistParams {
  playlist?: string;
  tagId?: string;
  index?: string;
  query?: string;
}

// 모든 플레이리스트 공통 item 타입
export interface PlaylistItem {
  mediaId: number;
  title: string;
  posterUrl: string;
  thumbnailUrl: string;
  mediaType: MediaType;
  duration: number | null; // null 허용 (for 시리즈 원본에는 duration이 없기 때문)
  positionSec: number;
}

export interface PlaylistResponse {
  pageInfo: PageInfo;
  dataList: PlaylistItem[];
}
