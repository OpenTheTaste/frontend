import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";
import {
  ApiResponse,
  BasePaginationParams,
  MediaType,
  PageInfo,
  PlaylistItem,
} from "@shared/types";

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
  posterUrl: string;
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

export const getBookmarkContentsApi = async (page: number) => {
  const res = await api.get<ApiResponse<BookmarkContentResponse>>(
    END_POINTS.BOOKMARKS_ME_CONTENTS,
    {
      params: { page, size: 10 },
    },
  );
  return res.data.data;
};

export const getBookmarkShortFormsApi = async (page: number) => {
  const res = await api.get<ApiResponse<BookmarkShortFormResponse>>(
    END_POINTS.BOOKMARKS_ME_SHORT_FORM,
    {
      params: { page, size: 10 },
    },
  );
  return res.data.data;
};

/// 북마크 플레이리스트
export interface GetBookmarkListParams extends BasePaginationParams {
  excludeMediaId?: number;
}

export interface BookmarkPlaylistResponse {
  pageInfo: PageInfo;
  dataList: PlaylistItem[];
}

export const getBookmarkPlaylistApi = async (params: GetBookmarkListParams) => {
  const res = await api.get<ApiResponse<BookmarkPlaylistResponse>>(
    END_POINTS.PLAYLISTS_BOOKMARKS,
    {
      params: {
        page: params.page,
        size: params.size,
        ...(params.excludeMediaId !== undefined && {
          excludeMediaId: params.excludeMediaId,
        }),
      },
    },
  );
  return res.data.data;
};
