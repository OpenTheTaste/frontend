import { WriteReviewResponse } from "@entities/review/api";
import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";
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
    END_POINTS.COMMENTS_DETAIL(commentId),
    body,
  );
  return res.data.data;
};
