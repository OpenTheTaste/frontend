import { api } from "@shared/api";
import { BookmarkDeleteRequest, BookmarkDeleteResponse } from "@/shared/types";

// data는 프 -> 백으로 보내는 삭제할 북마크 요소의 mediaId
export const bookmarkDeleteApi = {
  postBookmarkDelete: async (data: BookmarkDeleteRequest) =>
    await api.post<BookmarkDeleteResponse>("/bookmarks", data),
};
