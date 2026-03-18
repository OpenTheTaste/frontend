import { WriteReviewResponse } from "@entities/review/api";
import { api } from "@shared/api";
import { ApiResponse } from "@shared/types";

// 댓글 수정
export interface EditReviewRequest {
  content: string;
  isSpoiler: boolean;
}

export type EditReviewResponse = WriteReviewResponse;

export const patchEditReviewApi = async (
  commentId: number,
  body: EditReviewRequest,
) => {
  const res = await api.patch<ApiResponse<EditReviewResponse>>(
    `/comments/${commentId}`,
    body,
  );
  return res.data.data;
};
