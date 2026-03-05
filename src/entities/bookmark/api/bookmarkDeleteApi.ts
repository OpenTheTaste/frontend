import { api } from "@shared/api/apiClient";
import { BookmarkDeleteRequest, BookmarkDeleteResponse } from "@/shared/types/mypage/bookmark";

// data는 프 -> 백으로 보내는 삭제할 북마크 요소의 mediaId
export const bookmarkDeleteApi = {
  postBookmarkDelete: (data: BookmarkDeleteRequest) =>
    api.post<BookmarkDeleteResponse>("/bookmarks", data),
};
