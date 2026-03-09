import { api } from "@shared/api";

// 북마크 요청 보낼 때 (추가/삭제 포함)
export interface BookmarkRequest {
  mediaId: number;
}

// 북마크 응답 받을 때 (추가/삭제 포함)
export interface BookmarkResponse {
  success: boolean;
  data: string;
}

// data는 프 -> 백으로 보내는 추가/삭제할 북마크 요소의 mediaId
export const toggleBookmark = async (data: BookmarkRequest) =>
  await api.post<BookmarkResponse>("/bookmarks", data);
