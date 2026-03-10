import { api } from "@shared/api";
import { ApiResponse, MediaType, PageInfo } from "@shared/types";

// 북마크 콘텐츠 dataList 안쪽 타입
export interface BookmarkContentItem {
  mediaId: number;
  mediaType: MediaType;
  title: string;
  description: string;
  posterUrl: string;
  positionSec: number;
  duration: number;
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

export const bookmarkApi = {
  getBookmarkContents: async (page: number) =>
    await api.get<ApiResponse<BookmarkContentResponse>>(
      "/bookmarks/me/contents",
      {
        params: { page, size: 10 },
      },
    ),

  getBookmarkShortForms: async (page: number) =>
    await api.get<ApiResponse<BookmarkShortFormResponse>>(
      "/bookmarks/me/short-form",
      {
        params: { page, size: 10 },
      },
    ),
};
