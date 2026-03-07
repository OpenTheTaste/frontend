import { PageInfo } from "@/shared/types/pagination";

// 이제 사용 X
export interface BookmarkItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

// 북마크 콘텐츠 dataList 안쪽 타입
export interface BookmarkContentItem {
  mediaId: number;
  mediaType: string;
  title: string;
  description: string;
  posterUrl: string;
  positionSec: number | null;
  duration: number | null;
}

// 북마크 숏폼 dataList 안쪽 타입
export interface BookmarkShortFormItem {
  mediaId: number;
  title: string;
  description: string;
  thumbnailUrl: string;
}

// 북마크 콘텐츠 조회 목록 전체 틀
export interface BookmarkContentResponse {
  pageInfo: PageInfo;
  dataList: BookmarkContentItem[];
}

// 북마크 숏폼 조회 목록 전체 틀
export interface BookmarkShortFormResponse {
  pageInfo: PageInfo;
  dataList: BookmarkShortFormItem[];
}

// 북마크 요청 보낼 때 (추가/삭제 포함)
export interface BookmarkRequest {
  mediaId: number;
}

// 북마크 응답 받을 때 (추가/삭제 포함)
export interface BookmarkResponse {
  success: boolean;
  data: string;
}
