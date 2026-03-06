import { api } from "@shared/api";

export const myreviewDeleteApi = {
  postMyreviewDelete: async (commentId: number) => await api.delete(`/comments/${commentId}`),
};
