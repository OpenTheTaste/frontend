import { api } from "@shared/api";

export const postLikesApi = async (mediaId: number) => {
  await api.post("/likes", { mediaId });
};
