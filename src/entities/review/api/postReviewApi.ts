import { api } from "@shared/api";
import { ApiResponse } from "@shared/types";

// 댓글 작성 api
export interface WriteReviewRequest {
  mediaId: number;
  content: string;
  isSpoiler: boolean;
}
export interface ReviewWriter {
  memberId: number;
  nickname: string;
}
export interface WriteReviewResponse {
  commentId: number;
  mediaId: number;
  content: string;
  isSpoiler: boolean;
  createdDate: string;
  writer: ReviewWriter;
}

export const postReviewApi = async (body: WriteReviewRequest) => {
  const res = await api.post<ApiResponse<WriteReviewResponse>>(
    "/comments",
    body,
  );
  return res.data.data;
};
