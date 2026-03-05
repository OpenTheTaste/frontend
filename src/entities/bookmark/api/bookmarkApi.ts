import api from "@shared/api/apiClient";
import { BookmarkContentResponse, BookmarkShortFormResponse } from "@/shared/types/mypage/bookmark";

export const bookmarkApi = {
  getBookmarkContents: (page: number) =>
    api.get<BookmarkContentResponse>("/bookmarks/me/contents", {
      params: { page, size: 10 },
    }),

  getBookmarkShortForms: (page: number) =>
    api.get<BookmarkShortFormResponse>("/bookmarks/me/short-form", {
      params: { page, size: 10 },
    }),
};
