import { api } from "@shared/api/apiClient";
import { ApiResponse, BookmarkContentResponse, BookmarkShortFormResponse } from "@/shared/types";

export const bookmarkApi = {
  getBookmarkContents: async (page: number) =>
    await api.get<ApiResponse<BookmarkContentResponse>>("/bookmarks/me/contents", {
      params: { page, size: 10 },
    }),

  getBookmarkShortForms: async (page: number) =>
    await api.get<ApiResponse<BookmarkShortFormResponse>>("/bookmarks/me/short-form", {
      params: { page, size: 10 },
    }),
};
