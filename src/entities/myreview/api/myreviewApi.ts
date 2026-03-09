import { api } from "@shared/api";
import { ApiResponse, PageInfo } from "@shared/types";

// 내가 쓴 댓글 형태 안쪽 타입
export interface MyReview {
  commentId: number;
  content: string;
  contentsPosterUrl: string;
  writerId: number;
  writerNickname: string;
  createdDate: string;
}

// 내가 쓴 댓글 목록 조회될 때 타입
export interface MyReviewListResponse {
  pageInfo: PageInfo;
  dataList: MyReview[];
}

export const myreviewApi = {
  getMyReviews: async (page: number) =>
    await api.get<ApiResponse<MyReviewListResponse>>("/comments/me", {
      params: { page, size: 20 },
    }),
};
