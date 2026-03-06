import { api } from "@shared/api";
import { ApiResponse, MyReviewListResponse } from "@shared/types";

export const myreviewApi = {
  getMyReviews: async (page: number) =>
    await api.get<ApiResponse<MyReviewListResponse>>("/comments/me", {
      params: { page, size: 20 },
    }),
};
