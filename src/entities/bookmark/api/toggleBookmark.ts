import { api } from "@shared/api";
import { BookmarkRequest, BookmarkResponse } from "@shared/types";

// data는 프 -> 백으로 보내는 추가/삭제할 북마크 요소의 mediaId
export const toggleBookmark = async (data: BookmarkRequest) =>
  await api.post<BookmarkResponse>("/bookmarks", data);
