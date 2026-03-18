import { api } from "@shared/api";

export const deleteMyReviewApi = async (commentId: number) =>
  await api.delete(`/comments/${commentId}`);
