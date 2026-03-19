import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";

export const deleteMyReviewApi = async (commentId: number) =>
  await api.delete(END_POINTS.COMMENTS_DETAIL(commentId));
