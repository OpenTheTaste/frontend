import { api } from "@shared/api";
import { ApiResponse, PageInfo } from "@shared/types";

// 해당 태그 모달창 아래 뜨는 콘텐츠 안쪽 타입
export interface TagPlaylistItem {
  mediaId: number;
  title: string;
  posterUrl: string;
  thumbnailUrl: string;
  mediaType: "CONTENTS" | "SERIES";
  duration: number;
  positionSec: number;
}

// 해당 태그 모달창 추천 콘텐츠 리스트 전체 타입
export interface TagPlaylistResponse {
  pageInfo: PageInfo;
  dataList: TagPlaylistItem[];
}

export const tagRecommendPlaylistApi = {
  getTagRecommendPlaylist: async (tagId: number) =>
    await api.get<ApiResponse<TagPlaylistResponse>>(`/playlists/tags/${tagId}`),
};